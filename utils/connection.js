const dotenv = require('dotenv');
dotenv.config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;
const {DB_FAILED_TO_CONNECT} = require("../constants/error_constants")
async function connectToDB(collectionName = "orders"){
	let client;
	try{
		console.log(username,password)
		const uri = `mongodb+srv://${username}:${password}@cluster0.ick8hrk.mongodb.net/?retryWrites=true&w=majority`;
		client = new MongoClient(uri, {
			serverApi: {
				version: ServerApiVersion.v1,
				strict: true,
				deprecationErrors: true,
			}
		});
		const myDB = client.db(database);
		const myColl = myDB.collection(collectionName);
		return myColl;
	}
	catch(err){
		await client.close();
		throw new Error(DB_FAILED_TO_CONNECT)
	}

}

module.exports = { connectToDB }