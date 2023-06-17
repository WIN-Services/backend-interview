import { json, urlencoded } from "express";
import { Application, Router } from "express-serve-static-core";
import { OrderRoutes } from "./order.route";

export default class Routes {
    public static init(app: Application, router: Router) {
        router.use(urlencoded({ extended: false, limit: 10000000 }));
        router.use(json({ limit: "1000mb" }));
        // We can add CORS, Helmet and other middlewares
        new OrderRoutes().init(router);
        app.use("/", router);

        app.get('/', (req, res) => {
            res.send('Order management works');
        })
    }
}
