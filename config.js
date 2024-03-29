import dotenv from 'dotenv'
dotenv.config({ path: process.env.ENVIRONMENT ? `.env.${process.env.ENVIRONMENT}` : '.env' });

export default {
    db: {
        host: process.env.NODE_MONGO_HOST || 'localhost',
        port: process.env.NODE_MONGO_PORT || 27017,
        dbName: process.env.NODE_MONGO_DB || 'Gimnasio'
    }
}