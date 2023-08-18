const { validationResult } = require('express-validator');
const HttpError = require('../models/httpError');
const { Order, OrderService, Service, sequelize, User } = require('../models/index');
const { Op } = require("sequelize");
const { numberArraysHaveSameElements } = require('../utilites/arrayUtils');

const getAllOrders = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid Inputs, Please check again!!', 422));
    }

    try {
        const allOrders = await Order.findAll({
            include: [
                {
                    model: User,
                    as: "userDetails",
                    attributes: {
                        exclude: ["password", "createdAt", "updatedAt"]
                    }
                },
                {
                    model: Service,
                    through: { attributes: [] },
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    },
                }
            ],
            attributes: {
                exclude: ["deletedAt", "userId"]
            }
        });
        return res.status(200).json({ orders: allOrders })
    } catch (e) {
        return next(new HttpError("Something went wrong! while getting all user's orders", 500));
    }
}

const getOrderById = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid Inputs, Please check again!!', 422));
    }

    const id = req.params.id;

    try {
        const userOrder = await Order.findByPk(id, {
            attributes: {
                exclude: ["deletedAt"]
            },
            include: [
                {
                    model: User,
                    as: "userDetails",
                    attributes: {
                        exclude: ["password", "createdAt", "updatedAt"]
                    }
                }, {
                    model: Service,
                    through: { attributes: [] },
                    attributes: {
                        exclude: ["deletedAt", "createdAt", "updatedAt"]
                    }
                }
            ]
        });

        if (!userOrder) {
            throw new HttpError("Order Not Found", 404);
        }

        return res.status(200).json({ order: userOrder })
    } catch (e) {
        return next(new HttpError(e.errorMessage || "Something Went Wrong! - while fetching the post by id.", e.code || 500));
    }
}

const createNewOrder = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid Inputs, Please check again!!', 422));
    }

    const { services: serviceCodes } = req.body;
    const userId = req.userData.userId;

    try {

        if (!(await isValidToInteractWithOrders(userId)))
            throw new HttpError("Invalid Request! Can't interact too frequenctly with orders.", 409);

        const { haveInvalidService, servicesList } = await validateServiceCodes(serviceCodes);

        if (haveInvalidService) {
            throw new HttpError("Invalid Input, Input contain invalid service codes!", 422);
        }

        const totalAmount = servicesList[0].totalAmount;

        const newOrder = Order.build({
            totalAmount: totalAmount,
            totalServices: servicesList.length,
            dateTime: new Date(),
            userId
        })
        await newOrder.save();

        const orderServiceDetails = servicesList.map(service => {
            return { orderId: newOrder.id, serviceId: service.id }
        })

        await OrderService.bulkCreate(orderServiceDetails);

        return res.status(201).json({ order: newOrder, orderServices: orderServiceDetails, services: servicesList });
    } catch (e) {
        return next(new HttpError(e.errorMessage || "Something Went Wrong! Couldn't create new post.", e.code || 500));
    }
}

const updateOrderById = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid Inputs, Please check again!!', 422));
    }

    const id = req.params.id;
    const { services: serviceCodes } = req.body;
    const userId = req.userData.userId;

    try {
        // Validate the serviceCodes input and 3 hr time limit to interact with orders.
        if (!(await isValidToInteractWithOrders(userId)))
            throw new HttpError("Invalid Request! Can't interact too frequenctly with orders.", 409);
        
        const { haveInvalidService, servicesList } = await validateServiceCodes(serviceCodes);
        if(haveInvalidService){
            throw new HttpError("Invalid Input, Input contain invalid service codes!", 422);
        }

        // Find the order to update
        const existingOrder = await Order.findByPk(id, {
            attributes: {
                exclude: ["deletedAt"]
            },
            include: {
                model: Service,
                through: { attributes: [] },
                attributes: ["id", "serviceCode"]
            }
        });

        if (!existingOrder) {
            throw new HttpError("Order Not Found", 404);
        }

        if (existingOrder.userId != userId) {
            throw new HttpError("You are not authorized to update this order.", 401);
        }

        // Compare if there will be any change before and after update in DB. If no changes then return with 304 Not Modified
        const existingOrderServices = existingOrder.services.map(service => service.serviceCode);
        if(numberArraysHaveSameElements(existingOrderServices, serviceCodes)){
            throw new HttpError("No change in services. Nothing to update", 304);
        }
        

        // Updating Orders and Saving to the databse.
        existingOrder.totalAmount = servicesList[0].totalAmount;
        existingOrder.totalServices = servicesList.length;
        
        const newOrderServiceDetails = servicesList.map(service => {
            return { orderId: existingOrder.id, serviceId: service.id }
        })
        
        // todo: this can definitely be optimized to write only on specific rows.

        // Using promise all to trigger all the requests at once because these are independent DB updates.
        await Promise.all([
            await existingOrder.save(),
            await OrderService.destroy({
                where: {
                    orderId: existingOrder.id,
                },
                force: true
            }),
            await OrderService.bulkCreate(newOrderServiceDetails)
        ])

        return res.status(200).json({ order: existingOrder });
    } catch (e) {
        return next(new HttpError(e.errorMessage || "Something Went Wrong! while updating the post", e.code || 500));
    }
}

const deleteOrderById = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid Inputs, Please check again!!', 422));
    }

    const id = req.params.id;
    const userId = req.userData.userId;
    try {
        // Trying to delete the Order with the given id and userCredentials ( userId )
        const noOfDeletedOrders = await Order.destroy(
            {
                where: {
                    id: id,
                    userId: userId
                }
            }
        );
        if (!noOfDeletedOrders) {
            throw new HttpError("Order not found or You are not authorized to delete this order", 400);
        }

        await OrderService.destroy(
            {
                where: {
                    orderId: id
                }
            }
        )

        return res.status(200).json({ deletedOrder: noOfDeletedOrders });
    } catch (e) {
        return next(new HttpError(e.errorMessage || "Something Went Wrong! while deleting the post", e.code || 500));
    }
}

// Created these reuseable functions
const isValidToInteractWithOrders = async (id) => {
    const orders = await Order.findAll(
        {
            where: {
                userId: id
            },
            order: [['updatedAt', 'DESC']]
        }
    )

    if (orders && orders.length > 0) {
        let lastInteractedDateTime = new Date(orders[0].updatedAt).getTime();
        let currentDateTime = new Date().getTime();
        if (currentDateTime - lastInteractedDateTime < 1 * 60 * 1000) // todo : Should get this value as a constant.
            return false;

    }

    return true;
}

const validateServiceCodes = async (servicesCodes) => {
    const servicesList = await Service.findAll({
        where: {
            serviceCode: {
                [Op.in]: servicesCodes
            }
        },
        attributes: {
            include: [
                [sequelize.literal('(SELECT SUM(cost) FROM "services" WHERE "serviceCode" IN (:servicesCodes))'), 'totalAmount'],
            ],
            exclude: ["deletedAt"]
        },
        group: ["id"],
        replacements: { servicesCodes },
        raw: true
    })

    let haveInvalidService = false;

    if (!servicesList || servicesList.length == 0 || servicesCodes.length == servicesList.length) {
        haveInvalidService = true;
    }

    let existingServicesCodesList = servicesList.map(service => service.serviceCode);

    haveInvalidService = !!servicesCodes.find(service => !existingServicesCodesList.includes(service));

    return {
        haveInvalidService,
        servicesList
    }
}

exports.getAllOrders = getAllOrders;
exports.getOrderById = getOrderById;
exports.createNewOrder = createNewOrder;
exports.updateOrderById = updateOrderById;
exports.deleteOrderById = deleteOrderById;