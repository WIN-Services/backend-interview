const { verifyTokenAndAuthenticate, verifyTokenAndAdmin,  } = require('../controllers/verifyToken')
const { save, patch, remove, getAll, getByUserId } = require('../controllers/order')

module.exports = (router) => {
    router.post('/order/save', verifyTokenAndAuthenticate, save)
    router.delete('/order/:id', verifyTokenAndAuthenticate, remove);
    router.put('/order/:id', verifyTokenAndAuthenticate, patch);
    router.get('/order/:id', verifyTokenAndAuthenticate, getByUserId);
    router.get('/order', verifyTokenAndAdmin, getAll)
}