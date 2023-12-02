const orders = require("../../model/orders.model")
const { success, error } = require("../../common/res.common")
const { messages, http_codes } = require("../../constants/text.constant")
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId
const { calculateOrderTimeDuration } = require("../../common/getTimeDIfference.common")
const getAllOrders = async (req, res) => {

    try {
        const { totalfee, limit, page, is_active, orderId } = req.query
        let { timezone } = req.headers
        if (!timezone) {
            timezone = "+05:30"
        }
        let perPage = parseInt(limit) || 10;
        let pages = typeof page != "undefined" ? page == 0 ? 1 : page || 1 : 1;
        let skip = perPage * pages - perPage;
        let filter = {}
        if (is_active) {
            filter["is_active"] = Boolean(is_active)
        }
        if (orderId) {
            filter["_id"] = new ObjectId(orderId)
        }
        if (totalfee) {
            filter["totalfee"] = Number(totalfee)
        }
        const pipeline = [
            {
                $match: filter
            },
            {
                $addFields: {
                    postedDays: "$created_At",
                    created_At: {
                        $dateToString: {
                            date: '$created_At',
                            timezone: timezone,
                            format: '%Y-%m-%d %H:%M:%S'
                        }
                    },
                }
            },
            { $sort: { created_At: -1 } }
        ]
        const countPipeline = [...pipeline]
        countPipeline.push({ $count: "count" })
        pipeline.push({ $skip: skip }, { $limit: perPage })
        let ordersList = await orders.aggregate(pipeline)
        const ordersCount = await orders.aggregate(countPipeline)
        if (ordersList.length) {
            for (let i = 0; i < ordersList.length; i++) {
                ordersList[i]["postedDays"] = calculateOrderTimeDuration(ordersList[i].postedDays)
            }
        }
        const data = {}
        data['OrdersList'] = ordersList || [];
        data['current'] = parseInt(pages) || 1;
        data['total_pages'] = Math.ceil((ordersCount[0]?.count || 0) / perPage);
        data['total_items'] = ordersCount[0]?.count || 0
        return success(http_codes.ok, messages.success, data, res)
    } catch (e) {
        console.log("error : ", e)
        return error(http_codes.internalError, messages.internalServerError, res)
    }
}
module.exports = getAllOrders