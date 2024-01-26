const express = require('express');
const router = express.Router();

const {
  getAll,
  getByName,
  create, getById,
  update,
  deleteById,
} = require('../controllers/services.controller.js');

const { validateService, validateIfExist } = require("../middlewares/service");

router.get('/', getAll);

router.post('/', validateService, validateIfExist, create);

router.get('/get_name', getByName);

router.get('/:id', getById);

router.patch('/:id/:name', update);

router.delete('/:id', deleteById);

module.exports = router;
