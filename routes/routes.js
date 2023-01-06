const express = require('express');
const app = express();
const orderRoute = express.Router();

let Orders = require('../model/order');

//Add Operations
orderRoute.route('/add').post((req, res, next) => {
    Orders.create(req.body, (data, error) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

//Get Operations
orderRoute.route('/get').get((req, res) => {
    Orders.find(req.body, (data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

//Update Operations
orderRoute.route('/update/:id').put((req, res, next) => {
    Orders.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

//Delete Operations
orderRoute.route('/delete/:id').delete((req, res, next) => {
    Orders.findByIdAndDelete(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.statusCode({ msg: Data });
        }
    });
});

module.exports = orderRoute;