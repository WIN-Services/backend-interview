const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const func = require("../utils/functions");

const getOrders = async (req, res) => {
    let orders = await prisma.orders.findMany({
        select: {
            id: true,
            totalfees: true,
            datetime: true,
            services: {
                select: {
                    service_id: true
                }
            }
        }
    })
    let response = orders.map(order => {
        return responseMaker(order)
    })
    return res.json(response);
}

const getOrderById = async (req, res) => {
    let order = await prisma.orders.findUnique({
        where: {
            order_id: req.params.id
        },
        select: {
            order_id: true,
            totalfees: true,
            datetime: true,
            services: {
                select: {
                    service_id: true
                }
            }
        }
    })
    return res.json(responseMaker(order));
}


const createOrders = async (body, res) => {
    try {
        const hasOrders = await func.hasExistingOrderWithin3Hours();
        if (hasOrders) {
            return res.status(400).json({ error: 'Cannot create order within 3 hours of an existing order.' });
        }
        let order = await prisma.orders.create({
            data: {
                totalfees: body.totalfees,
                services: {
                    create: body.services.map((sid) => { return { service_id: sid.id } })
                }
            },
            select: {
                totalfees: true,
                datetime: true,
                services: {
                    select: {
                        service_id: true
                    }
                }
            }
        })
        return res.json(responseMaker(order));
    } catch (error) {
        return res.status(500).json({err: error.message, stack: error.stack})
    }
}


const updateOrders = async ({id,...body}, res) => {

    try {
        const updatedOrder = await prisma.orders.update({
            where: {
              id: id,
            },
            data: {
              totalfees: body.totalfees
            },
            select: {
                totalfees: true,
                datetime: true,
                services: {
                    select: {
                        service_id: true
                    }
                }
            }
          });
        return res.json(responseMaker(updatedOrder));
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({err: "Server gone wild"})
    }
}

const deleteOrders = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await prisma.orders.delete({
            where: {
                id: id
            }
        })
        if (!result) {
            res.status(400).json({
                message: "Order does not exists."
            })
        }
        return res.json(result);
    } catch (err) {
        throw res.status(500).send({ err: err.message, stack: err.stack });
    }
}

function responseMaker(order) {
    return {
        id: order.id,
        totalfees: order.totalfees,
        datetime: order.datetime,
        services: order.services
    };
}

module.exports = {
    getOrders,
    createOrders,
    getOrderById,
    updateOrders,
    deleteOrders
}


