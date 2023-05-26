const router = require('express').Router()
const {createServiceRecord, findServiceRecord, findAllServiceRecord,updateServiceRecord, deleteServiceRecord}  = require('./../controllers/serviceRecordControllers');

router.route('/service').get(findAllServiceRecord).post(createServiceRecord);
router.route('/service/:id').get(findServiceRecord).delete(deleteServiceRecord).put(updateServiceRecord);

module.exports =  router

