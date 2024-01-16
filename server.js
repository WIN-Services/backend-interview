import express from "express";
import routes from './routes/api.js';
import cors from 'cors';


const app = express();

app.use(cors());

app.options('*', cors());

app.use(express.json());
app.use('/v1', routes);


app.listen(5000, () => {
    console.log('Server started at port 5000');
});

export default app;