const express = require('express');
const router = express.Router();

const serviceController = require('../controller/servicesController');

router.post('/create',serviceController.create);
router.get('/all',serviceController.getAll);
router.get('/:id',serviceController.get);
router.put('/update/:id',serviceController.update);
router.delete('/delete/:id',serviceController.delete);

module.exports = router;