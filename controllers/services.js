const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getOrders = async (req,res) => {
    let orders = await prisma.services.findMany({})
    return res.json(orders);
 }



module.exports = {
    getOrders
}