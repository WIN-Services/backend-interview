import createHttpError from "http-errors"
import { collectionNames } from "../../../configs/db.configs.js"

const createService = async (req, res, next) => {
    try {
        const { body } = req
        let response = undefined
        let id = null

        response = await collectionNames["service_records"].find({
            name: {
                $regex: `^${body.name}$`,
                $options : 'i'
            }
        }).toArray()
        console.log(response)
        if(response.length) {
            throw createHttpError.Conflict("This service is already available")
        }

        response = await collectionNames["service_records"].find({}).sort({id: -1}).toArray()

        console.log(response)

        if(!response.length) id = 1
        else id = response[0].id + 1

        body.id = id
        body.name = body.name.charAt(0).toUpperCase() + body.name.slice(1)
        response = await collectionNames["service_records"].insertOne(body)

        console.log(response)

        res.status(200).json({
            status: true,
            message: "service created successfully",
            service_id: id
        })
    } catch (err) {
        res.status(err.status || err.statusCode || 400).json({
            status: false,
            message: err.errmsg || err.message
        })
    }
}

const getServices = async (req, res, next) => {
    try {
        const { query } = req
        let response = undefined
        let filter = {}

        let offset = parseInt(query.offset)
        let limit = parseInt(query.limit)
        let id = parseInt(query.id)

        if(isNaN(offset) || isNaN(limit)) throw createHttpError.BadRequest("Invalid payload")

        if(!limit) limit = 3

        if(query.name) filter.name = {
            $regex: query.name,
            $options: "i"
        }
        if(!isNaN(id)) filter.id = id

        console.log(filter)

        response = await collectionNames["service_records"].find(filter).skip(offset).limit(limit).toArray()
        console.log(response)
        if(!response.length) {
            throw createHttpError.NotFound("No service found")
        }

        response = response.map(service => {
            delete service._id 
            return service
        })

        res.status(200).json({
            status: true,
            message: "services fetched successfully",
            data: response
        })
    } catch (err) {
        res.status(err.status || err.statusCode || 400).json({
            status: false,
            message: err.errmsg || err.message
        })
    }
}

// const updateService = async (req, res, next) => {
//     try {
//         const { body } = req
//         let response = undefined
//         let id = null

//         response = await collectionNames["service_records"].find({
//             name: {
//                 $regex: `^${body.name}$`,
//                 $options : 'i'
//             }
//         }).toArray()
//         console.log(response)
//         if(response.length) {
//             throw createHttpError.Conflict("This service is already available")
//         }

//         response = await collectionNames["service_records"].find({}).sort({id: -1}).toArray()

//         console.log(response)

//         if(!response.length) id = 1
//         else id = response[0].id + 1

//         body.id = id
//         body.name = body.name.charAt(0).toUpperCase() + body.name.slice(1)
//         response = await collectionNames["service_records"].insertOne(body)

//         console.log(response)

//         res.status(200).json({
//             status: true,
//             message: "service created successfully"
//         })
//     } catch (err) {
//         res.status(err.status || err.statusCode || 400).json({
//             status: false,
//             message: err.errmsg || err.message
//         })
//     }
// }

export {
    createService,
    getServices,
    // updateService
}