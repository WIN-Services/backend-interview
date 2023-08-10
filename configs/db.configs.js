import { MongoClient, ServerApiVersion } from "mongodb"
import dotenv from "dotenv"

dotenv.config()

const DB_URI = process.env.DB_URI
const DB = process.env.DB

const ServerOptions = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}

const client = new MongoClient(DB_URI, ServerOptions)

const collectionNames = {}

async function establishDBConnection() {
    try {
        await client.connect()

        const db = client.db(DB)

        let collections = await db.collections()

        for(let i = 0; i < collections.length; i++){
            let colName = collections[i].s.namespace.collection

            collectionNames[colName] = db.collection(colName)
            // console.log(db.collection(colName))
        }

        console.log("Database connected successfully")
    } catch (err) {
        process.on("SIGINT", async () => {
            await client.close()
            process.exit(0)
        })
    }
}

async function closeDBConnection() {
    try {
        await client.close()
    } catch (err) {
        console.log(err)
    }
}

export {
    establishDBConnection, 
    collectionNames,
    closeDBConnection
}