const express = require('express');
const {
  createService,
  getService,
  updateService,
  deleteService,
  getAllServices,
} = require('../controllers/serviceController');

const router = express.Router();

router.post('/services', createService);
router.get('/services/:id', getService);
router.put('/services/:id', updateService);
router.delete
