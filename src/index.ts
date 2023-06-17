import { init } from "./server";
import CONFIG from "./config"

async function initializeServer() {
    const app = await init();
    const server = app.listen(CONFIG.HTTP_PORT, () => {
        console.log(`Service initiated. Running on port ${CONFIG.HTTP_PORT}`);
    });

    server.on("error", (err: Error) => {
        console.error(err);
        process.exit(1);
    });
}

initializeServer();

