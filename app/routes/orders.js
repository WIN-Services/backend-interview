const controller = require('../controllers/order')
const validate = require('../validators/order.validator')
const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')

/*
 * Cities routes
 */

/*
 * Get all items route
 */
// router.get('/all', controller.getAllItems)

/*
 * Get items route
 */
router.get(
  '/',
  trimRequest.all,
  controller.getItems
)

/*
 * Create new item route
 */
router.post(
  '/',
  trimRequest.all,
  validate.createItem,
  controller.createItem
)

/*
 * Get item route
 */
router.get(
  '/:id',
  trimRequest.all,
  validate.getItem,
  controller.getItem
)

/*
 * Update item route
 */
router.put(
  '/:id',
  trimRequest.all,
  controller.updateItem
)

/*
 * Delete item route
 */
router.delete(
  '/:id',
  trimRequest.all,
  validate.deleteItem,
  controller.deleteItem
)

module.exports = router
