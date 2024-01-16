import express from 'express';
import { deleteOrders, getAllOrders, getOrderById, submitData, updateOrder } from '../functions/order.js';

const Router = express.Router();
Router.route('/getallorders').get(getAllOrders);
Router.route('/getdatabyid/:id').get(getOrderById);
Router.route('/deletebyid').delete(deleteOrders);
Router.route('/submitdata').post(submitData);
Router.route('/updatedata').put(updateOrder);

export default Router;