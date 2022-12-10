const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');

router.get('/:id',orderController.get);
//to retrive all order lists
router.get('/all',orderController.getAll);

router.post('/create' , orderController.create);

router.delete('/delete/:id',orderController.delete);

router.put('/update/:id',orderController.update);

module.exports = router;