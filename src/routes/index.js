const service_router = require("./services.routes")
const orders_router = require("./orders.routes")

const routes = ({ app }) => {

    app.use('/api', service_router)
    app.use('/api', orders_router)

}
module.exports = routes