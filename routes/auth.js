const {register, login} = require('../controllers/auth')
 
module.exports = (router) => {
    router.post('/auth/register', register)
    router.post('/auth/login', login)
}