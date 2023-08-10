import createHttpError from "http-errors"
import { collectionNames } from "../../../configs/db.configs.js"

const createUser = async (req, res, next) => {
    try {
        const { body } = req
        let response = undefined
        let id = null

        response = await collectionNames["users"].find({}).sort({id: -1}).toArray()

        console.log(response)

        if(!response.length) id = 1
        else id = response[0].id + 1

        body.id = id
        response = await collectionNames["users"].insertOne(body)

        console.log(response)

        res.status(200).json({
            status: true,
            message: "User created successfully",
            user_id: id
        })
    } catch (err) {
        res.status(400).json({
            status: false,
            message: err.errmsg || err.message
        })
    }
}

export {
    createUser
}