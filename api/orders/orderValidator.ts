import { check, validationResult } from "express-validator"
import { Response, Request, NextFunction } from "express"

export const validateCreateOrder = [
    check('buyerId').isLength({ min: 5, max: 5 }).withMessage('valid buyerId is mandatory'),
    check('productId').isLength({ min: 5, max: 5 }).withMessage('valid productId is mandatory'),
    check('quantity').isNumeric().withMessage('Invalid quantity'),
]

export const createOrderValidation = (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req).array()
    if (!result.length) return next()
    return res.status(400).json({ success: false, message: result })
}