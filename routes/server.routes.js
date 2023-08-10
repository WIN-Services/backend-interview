import apiv1Routes from "../api/v1/apiv1.routes.js"

const ServerRoutes = (app) => {
    app.use("/api/v1", apiv1Routes)
}

export default ServerRoutes