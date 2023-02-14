import mongoose from "mongoose";
import config from "config";
import * as process from "process";

import pinoLogger from '../../logger/logger';

/**
 * Connects the API to MongoDB database
 */
const dbConnect = async () => {
    // Set config and options
    const mongoConnect = config.get('mongo');
    mongoose.set('strictQuery', false);
    const options = {
        autoIndex: true,
        family: 4
    };

    // Create logger
    const logger = pinoLogger();

    // Try to connect to the database
    try {
        await mongoose.connect(mongoConnect.uri, options);

        // Ternary to only show the URI if not in PROD since at the moment the URI includes user/pass.
        process.env.NODE_ENV !== 'prod'
            ? logger.info(`Connected to MongoDB at url ${mongoConnect.uri}`)
            : logger.info('Connected to MongoDB');
    } catch (e) {
        logger.fatal(`There was an error loading MongoDB: ${e.message}`);
        process.exit(1);
    }
}

export default dbConnect();