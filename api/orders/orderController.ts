import { Request, Response } from "express";
import { ErrorConstants, ServiceError } from "../../utils/errorHandler";
import mySQL from "../../utils/mySQL";


export const getOrder = async (req: Request, res: Response) => {
    try {
        const orderId = req.params.orderId;
        if (!orderId) throw new ServiceError(
            ErrorConstants.INVALID_REQUEST_PAYLOAD,
            `orderId is mandatory`
        );
        const orderData: any = await mySQL.GetData(`select * from orders users where id = ${orderId}`);
        if (!orderData[0]) throw new ServiceError(
            ErrorConstants.DATA_NOT_FOUND,
            `Invalid OrderId`
        );

        res.json({ success: true, data: orderData[0] })
    } catch (error: any) {
        res.status(error.code || 500).send({ success: false, msg: error.info || error.message })
    }

}

export const getOrders = async (req: Request, res: Response) => {
    try {
        const offset = req.query.offset || 0;
        const limit = req.query.limit || 100;

        const orderData: any = await mySQL.GetData(`select * from orders limit ${limit} offset ${offset}`);
        if (orderData.length == 0) throw new Error('No orders Found')

        res.json({ success: true, data: orderData, count: orderData.length })
    } catch (error: any) {
        res.status(error.code || 500).send({ success: false, msg: error.info || error.message })
    }

}


export const deleteOrder = async (req: Request, res: Response) => {
    try {
        const orderId = req.params.orderId;
        if (!orderId) throw new ServiceError(
            ErrorConstants.INVALID_REQUEST_PAYLOAD,
            `orderId is mandatory`
        );
        const orderData: any = await mySQL.InsertOrUpdate(`delete from orders where id = ${orderId}`, []);
        if (orderData != 1) throw new ServiceError(
            ErrorConstants.DATA_NOT_FOUND,
            `Invalid OrderId`
        );
        res.json({ success: true, data: `OrderId ${orderId} deleted successfully` })
    } catch (error: any) {
        res.status(error.code || 500).send({ success: false, msg: error.info || error.message })
    }
}


export const createOrder = async (req: Request, res: Response) => {
    try {
        const orderId = new Date().valueOf();
        const productId = req.body.productId
        const quantity = req.body.quantity
        const buyerId = req.body.buyerId
        const amount = calcAmounnt(productId)
        await mySQL.InsertOrUpdate(`insert into orders (id,productId,buyerId,quantity,amount,orderState) values(?,?,?,?,?,?)`, [orderId, productId, buyerId, quantity, amount, 'ORDER_CREATED']);
        res.json({ success: true, data: `Order created successfully with orderid ${orderId}` })
    } catch (error: any) {
        res.status(error.code || 500).send({ success: false, msg: error.info || error.message })
    }
}

export const updateOrder = async (req: Request, res: Response) => {
    try {
        const orderId = req.params.orderId;
        let updateStatus = await mySQL.InsertOrUpdate(`update orders set orderState = 'DELIVERED' where id = ${orderId}`, []);
        if (updateStatus != 1) throw new Error('Invalid orderId')
        res.json({ success: true, data: `Order updated successfully for orderid ${orderId}` })
    } catch (error: any) {
        res.status(error.code || 500).send({ success: false, msg: error.info || error.message })
    }
}

//Get from product table 
function calcAmounnt(productId: string) {
    return Math.floor(Math.random() * 6) + 1
}