
import { check } from "express-validator"

const validate = (method: string) => {
  switch (method) {
    case 'service': {
      return [
        check('serviceName').not().isEmpty().withMessage('serviceName field is required')
      ]
    }
    case 'offer': {
      return [
        check('serviceId').not().isEmpty().withMessage('serviceId field is required'),
        check('totalfee').not().isEmpty().withMessage('totalfee field is required')
      ]
    }
  }
}

export default validate