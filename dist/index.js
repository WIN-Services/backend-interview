var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const bodyParser = require("body-parser");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const connectDb = async () => {
    await mongoose_1.default.connect('mongodb://127.0.0.1:27017/win', { autoIndex: true, useUnifiedTopology: true });
};
connectDb().catch(error => {
    console.error(error);
});
app.use(bodyParser.json({ type: '*/json' }));
const routes_1 = require("./routes/");
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.use('/api/v1/orders', routes_1.ordersRouter);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
