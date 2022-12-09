const CryptoJS = require('crypto-js')
const User = require('../models/User')

const patch = async (payload) => {
    const { password, username, id } = payload;

    try {
        const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString();

        const doc = await User.findByIdAndUpdate(id, {
            username,
            password: encryptedPassword
        }, { new: true })

        return { doc }
    }
    catch (error) {
        throw ('transaction failed')
    }
}

const remove = async (payload) => {
    const { id } = payload;

    try {
        await User.findByIdAndDelete(id);

        return { doc: 'User has been successfully delete' }
    }
    catch (error) {
        throw ('transaction failed')
    }
}

const getById = async (payload) => {
    const { id } = payload;

    try {
        const res = await User.findById(id);

        const { _doc: { password, ...doc } } = res

        return { doc }
    }
    catch (error) {
        throw ('transaction failed')
    }
}

const get = async (payload) => {
    try {
        const { limit, offset } = payload;

        const users = await User.find({ limit, offset });

        const doc = users.map((user) => {
            const { _doc: { password, ...result } } = user;

            return { ...result };
        })

        return { doc }
    }
    catch (error) {
        throw ('transaction failed')
    }
}

const getStats = async (payload) => {
    try {
        const date = new Date();

        const lastYear = new Date(date.setFullYear(date.getFullYear) - 1);

        const doc = await User.aggregate([
            { $match: { "createdAt": { $gte: lastYear } } },
            {  
                $project: {
                    month: {$month: "$createdAt"}
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: {$sum: 1},
                }
            }
        ]
        );
        
        return { doc }
    }
    catch (error) {
        throw ('transaction failed')
    }
}

module.exports = {
    patch,
    remove,
    getById,
    get,
    getStats
}