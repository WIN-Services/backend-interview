import 'dotenv/config';
import app from './app.js';
import { createServer } from 'http';
import { createMongoDBConnection } from './DB-connection/mongo.js'

const port = process.env.PORT || '9000';

async function startServer() {

  //Connecting to DB
  await createMongoDBConnection();
  //creating a server      
  const server = createServer(app);

  server.listen(port);
  server.on('error', serverErrorHandler);
  server.on('listening', () => {
    console.log(`Server is listing on: ${port}`);
  });
}

function serverErrorHandler(error) {
  console.error(error);
  process.exit(1);
}

startServer();
