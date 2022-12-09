const { verifyTokenAndAuthenticate, verifyTokenAndAdmin } = require('../controllers/verifyToken')
const { patch, remove, getById, get, getStats } = require('../controllers/user')

module.exports = (router) => {
    router.put("/user/:id", verifyTokenAndAuthenticate, patch)
    router.delete('/user/:id', verifyTokenAndAuthenticate, remove)
    router.get('/user/get-by-id/:id', verifyTokenAndAuthenticate, getById);
    router.get('/user/get', verifyTokenAndAdmin, get);
    router.get('/user/stats', verifyTokenAndAdmin, getStats);
}