import dotenv from 'dotenv'

dotenv.config()

const SERVER_PORT = process.env.PORT || 4040
const SERVER_HOSTNAME = process.env.HOST || 'localhost'
const uri = process.env.DB_URI?.toString()

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
}


const db = {
  uri,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    autoIndex: false,
    retryWrites: false,
  },
}

const config = {
  server: SERVER,
  db,
  node_env: process.env.NODE_EN,
}

export default config
