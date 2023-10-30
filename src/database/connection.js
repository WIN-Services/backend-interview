import mongoose from 'mongoose';

class MongoDBConnection {
    constructor() {
        this.db = null;
    }

    connect() {
        mongoose.connect(process.env.DB_KEY, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        this.db = mongoose.connection;
        this.db.once('open', () => console.log('Connected to MongoDB'));
        this.db.on('error', () => console.error('MongoDB connection error'));
    }

    getConnection() {
        if (this.db) return this.db;
        else {
            this.db = this.connect();
            return this.db;
        }
    }
}

export default MongoDBConnection;