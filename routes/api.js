import express from 'express';
import { deleteOrders, getAllOrders, getOrderById, submitData, updateOrder } from '../functions/order.js';
import { createServiceOrders, deleteServiceOrders, getAllServices, getServiceOrderById } from '../functions/servies.js';

const Router = express.Router();
Router.route('/getallorders').get(getAllOrders);
Router.route('/getdatabyid/:id').get(getOrderById);
Router.route('/deletebyid').delete(deleteOrders);
Router.route('/submitdata').post(submitData);
Router.route('/updatedata').put(updateOrder);

Router.route('/getallservices').get(getAllServices);
Router.route('/getservicebyid/:id').get(getServiceOrderById);
Router.route('/deleteserviceid').delete(deleteServiceOrders);
Router.route('/submitservice').post(createServiceOrders);

export default Router;