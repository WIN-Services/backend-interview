import createHttpError from "http-errors"
import moment from 'moment-timezone'; 
import { collectionNames } from "../../../configs/db.configs.js"

const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

const createOrder = async (req, res, next) => {
    try {
        const { body } = req
        let response = undefined

        let { user_id, services } = body

        response = await collectionNames["users"].findOne({id: user_id})
        if(!response) throw createHttpError.NotFound("No user found")

        let requestedServicesId = [...new Set(services.map(service => service.id)).keys()]

        // console.log(requestedServicesId)
        response = await collectionNames["service_records"].find({
            id: { $in: requestedServicesId }
        }).toArray()
        if(!response.length) {
            throw createHttpError.NotFound("No such services found")
        }

        let serviceRecords = {}
        let validServices = []
        response.forEach(service => {
            validServices.push(service.id)
            serviceRecords[service.id] = service
        })
        let invalidServiceIds = requestedServicesId.filter(id => !validServices.includes(id))
        if(invalidServiceIds.length) throw createHttpError.BadRequest("Request for invalid services")

        response = await collectionNames["orders"].find({
            user_id: user_id,
            "services.id": {
                $in: validServices
            }
        }).toArray()

        const currentDatetime = moment();
        const threeHoursAgo = currentDatetime.clone().subtract(3, 'hours');
        console.log(threeHoursAgo)
        response = response.filter(order => {
            const parsedGivenTime = moment.tz(order.datetime, tz); // Replace with the appropriate time zone
            return !parsedGivenTime.isBefore(threeHoursAgo);
        })

        console.log("filtered: ", response)

        let availableOrderForServices = []
        response?.forEach(order => {
            order.services.forEach(service => availableOrderForServices.push(service.id))
        })

        services = []
        let totalFee = 0
        let ordersCreated = []
        let ordersNotCreated = []
        validServices.forEach(id => {
            if(!availableOrderForServices.includes(id)) {
                services.push({ id })
                totalFee += serviceRecords[id].fee
                ordersCreated.push({
                    id, name: serviceRecords[id].name
                })
            } else {
                ordersNotCreated.push({
                    id, 
                    name: serviceRecords[id].name
                })
            }
        })

        let id = null
        if(services.length) {
            response = await collectionNames["orders"].find({}).sort({id: -1}).toArray()
    
            if(!response.length) id = 1
            else id = response[0].id + 1

            const inputMoment = moment.tz(new Date().toISOString(), tz);
            const formattedDate = inputMoment.format('YYYY-MM-DDTHH:mm:ss');
    
            let document = {
                id,
                user_id,
                datetime: new Date(formattedDate),
                services,
                totalFee
            }
            response = await collectionNames["orders"].insertOne(document)
    
            console.log(response)
        }

        res.status(200).json({
            status: true,
            message: "Orders created for services which were not being ordered within last 3 hours.\n Orders not created for services for which already pre-existing order was avilable.",
            data: [
                {
                    order_id: id,
                    ordersCreated,
                    ordersNotCreated
                }
            ]
        })
    } catch (err) {
        console.log(err)
        res.status(err.status || err.statusCode || 400).json({
            status: false,
            message: err.errmsg || err.message
        })
    }
}

const getOrders = async (req, res, next) => {
    try {
        const { query } = req
        let { user_id } = req.params
        let response = undefined
        let filter = {}

        let offset = parseInt(query.offset)
        let limit = parseInt(query.limit)
        let order_id = parseInt(query.id)
        let service_id = parseInt(query.service_id)
        user_id = parseInt(user_id)

        if(isNaN(offset) || isNaN(limit) || isNaN(user_id)) throw createHttpError.BadRequest("Invalid payload")

        if(!limit) limit = 3

        filter.user_id = user_id
        if(!isNaN(order_id)) filter.id = order_id
        if(!isNaN(service_id)) filter["services.id"] = { $in: [service_id]}

        console.log(filter)

        response = await collectionNames["orders"].find(filter).skip(offset).limit(limit).toArray()
        if(!response.length) {
            throw createHttpError.NotFound("No orders found")
        }

        response = response.map(order => {
            delete order._id 
            const inputMoment = moment.tz(order.datetime, tz);
            const formattedDate = inputMoment.format('YYYY-MM-DD HH:mm:ss');
            order.datetime = formattedDate
            return order
        })

        res.status(200).json({
            status: true,
            message: "orders fetched successfully",
            data: response
        })
    } catch (err) {
        res.status(err.status || err.statusCode || 400).json({
            status: false,
            message: err.errmsg || err.message
        })
    }
}

const updateOrder = async (req, res, next) => {
    try {
        let response = undefined

        let { user_id, order_id } = req.params
        let { services } = req.body

        user_id = parseInt(user_id)
        order_id = parseInt(order_id)

        if(isNaN(user_id) || isNaN(order_id)) throw createHttpError.BadRequest("Invalid payload")

        response = await collectionNames["users"].findOne({id: user_id})
        if(!response) throw createHttpError.NotFound("No user found")

        let order = await collectionNames["orders"].findOne({id: order_id})
        if(!order) throw createHttpError.NotFound("No such order found")

        const currentDatetime = moment();
        const threeHoursAgo = currentDatetime.clone().subtract(3, 'hours');
        console.log(threeHoursAgo)
        const parsedGivenTime = moment.tz(order.datetime, tz); // Replace with the appropriate time zone
        if(!parsedGivenTime.isBefore(threeHoursAgo)) throw createHttpError.BadRequest("This order can be modified after 3 hours from the time it was placed.")

        let requestedServicesId = [...new Set(services.map(service => service.id)).keys()]

        // console.log(requestedServicesId)
        response = await collectionNames["service_records"].find({
            id: { $in: requestedServicesId }
        }).toArray()
        if(!response.length) {
            throw createHttpError.NotFound("No such services found")
        }

        let serviceRecords = {}
        let validServices = []
        response.forEach(service => {
            validServices.push(service.id)
            serviceRecords[service.id] = service
        })
        let invalidServiceIds = requestedServicesId.filter(id => !validServices.includes(id))
        if(invalidServiceIds.length) throw createHttpError.BadRequest("Request for invalid services")

        services = []
        let totalFee = 0
        validServices.forEach(id => {
            services.push({ id })
            totalFee += serviceRecords[id].fee
        })

        const inputMoment = moment.tz(new Date().toISOString(), tz);
        const formattedDate = inputMoment.format('YYYY-MM-DDTHH:mm:ss');

        let document = {
            datetime: new Date(formattedDate),
            services,
            totalFee
        }
        response = await collectionNames["orders"].updateOne({ user_id, id: order_id }, { $set: document })

        console.log(response)

        res.status(200).json({
            status: true,
            message: "order was updated successfully",
            data: []
        })
    } catch (err) {
        res.status(err.status || err.statusCode || 400).json({
            status: false,
            message: err.errmsg || err.message
        })
    }
}

const deleteOrder = async (req, res, next) => {
    try {
        let response = undefined

        let { user_id, order_id } = req.params

        user_id = parseInt(user_id)
        order_id = parseInt(order_id)

        if(isNaN(user_id) || isNaN(order_id)) throw createHttpError.BadRequest("Invalid payload")

        response = await collectionNames["users"].findOne({id: user_id})
        if(!response) throw createHttpError.NotFound("No user found")

        let order = await collectionNames["orders"].findOne({id: order_id})
        if(!order) throw createHttpError.NotFound("No such order found")

        response = await collectionNames["orders"].deleteOne({ user_id, id: order_id })

        console.log(response)

        res.status(200).json({
            status: true,
            message: "order was deleted successfully",
            data: []
        })
    } catch (err) {
        res.status(err.status || err.statusCode || 400).json({
            status: false,
            message: err.errmsg || err.message
        })
    }
}

export {
    createOrder,
    getOrders,
    updateOrder,
    deleteOrder
}