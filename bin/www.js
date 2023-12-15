import app from '../server.js';
import 'dotenv/config'

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

export default server;