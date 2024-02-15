
const { MongoClient, ServerApiVersion} = require("mongodb");
const uri = "mongodb+srv://Keshav_123:keshavjha1@cluster0.botjc.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function insertDocument(body, db, collections) {
    try {
        await client.connect();
        const collection = client.db(db).collection(collections);
        const maxIdDocument = await collection.find().sort({ id: -1 }).limit(1).toArray();
        let maxId = maxIdDocument.length > 0 ? maxIdDocument[0].id : 0;
        maxId++;
        body = {...body, id: maxId};
        const result = await collection.insertOne(body);
        console.log("Document inserted:", result.insertedId);
        return result;
    } catch (error) {
        console.error("Error inserting document:", error);
        throw error;
    }
}


async function fetchPreDocumentByKey(key, db, collections) {
    try {
        await client.connect();
        const collection = client.db(db).collection(collections);
        const maxIdDocument = await collection.find().sort({ id: -1 }).limit(1).toArray();
        return maxIdDocument;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


async function findDocumentByKey(key, value, db, collections) {
    try {
        await client.connect();
        const collection = client.db(db).collection(collections);
        const query = { [key]: value }; 
        const document = await collection.findOne(query);
        if (document) {
            return document;
        } else {
            console.log("Document not found.");
            return null;
        }
    } catch (error) {
        console.error("Error finding document:", error);
        throw error;
    }
}



async function updateDocument(value,key,uniqueid,db,collections) {
    try {
        await client.connect();
        const collection = client.db(db).collection(collections);  
        const filter = { id: uniqueid };
        const update = {
            $set: {
                [key]: value,
            },
        };
        const result = await collection.updateOne(filter, update);
        if (result.modifiedCount === 1) {
            console.log("Document updated successfully.");
        } else {
            console.log("No document found to update.");
        }
    } catch (error) {
        console.error("Error updating document:", error);
    } finally {
        await client.close();
    }
}


async function findAllDocuments(db, collection) {
    try {
        await client.connect();
        const database = client.db(db);
        const collections = database.collection(collection);
        const documents = await collections.find({}).toArray();
        console.log(documents);
        return documents;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        await client.close();
    }
}


async function deleteDocument(db, collection, key, value) {
    try {
        await client.connect();
        const database = client.db(db);
        const collections = database.collection(collection);
        const response = await collections.deleteOne({ [key]: value });
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}




module.exports = {
    insertDocument,
    findDocumentByKey,
    updateDocument,
    findAllDocuments,
    deleteDocument,
    fetchPreDocumentByKey
};