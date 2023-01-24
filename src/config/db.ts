import mongoose, { ConnectionOptions } from 'mongoose';
import { DatabaseError } from '../utils/errorHandler';
import { logger } from '../utils/main.logger';
import * as dotenv from 'dotenv';
dotenv.config();

const { DB_URI } = process.env;

const options: ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

export const connectDB = (dbURI = DB_URI!) => {
    return mongoose
        .connect(dbURI!, options)
        .then(() => logger.info(`Connected to ${dbURI} 💃`))
        .catch((e: Error) => {
            throw new DatabaseError(e.message);
        });
};

export const disconnectDB = () => {
    return mongoose.connection
        .close()
        .then(() => logger.info(`Disconnected 💃`))
        .catch((e: Error) => {
            throw new DatabaseError(e.message);
        });
};
