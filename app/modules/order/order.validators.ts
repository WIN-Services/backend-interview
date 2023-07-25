import { body } from 'express-validator';
import { validate } from '../../utility/validate';

export const createOrderValidator = [
  body('totalFee')
    .notEmpty()
    .withMessage('totalFee is required!')
    .isNumeric()
    .withMessage('totalFee should be number!'),
  body('services')
    .notEmpty()
    .withMessage('services is required!')
    .isArray()
    .withMessage('services should be array!'),
  validate,
];

export const updateOrderValidator = [
  body('id')
    .notEmpty()
    .withMessage('id is required!')
    .isUUID()
    .withMessage('id must be uuid string!'),
  ...createOrderValidator,
];
