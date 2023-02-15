import mongoose from "mongoose";
import config from "config";
import * as process from "process";

import pinoLogger from '../../logger/logger.js';
import pino from "pino";

/**
 * Connects the API to MongoDB database
 */
const dbConnect = async () => {
    // Set config and options
    const mongoConnect = 'mongodb://localhost:27017/wedding-dev';
    mongoose.set('strictQuery', false);
    const options = {
        autoIndex: true,
        family: 4
    };

    // Create logger
    //const logger = pinoLogger();
    const logger = pino;

    // Try to connect to the database
    try {
        await mongoose.connect(mongoConnect, options);

        // Ternary to only show the URI if not in PROD since at the moment the URI includes user/pass.
        process.env.NODE_ENV !== 'prod'
            ? console.log(`Connected to MongoDB at url ${mongoConnect}`)
            : console.log('Connected to MongoDB');
    } catch (e) {
        console.log(`There was an error loading MongoDB: ${e.message}`);
        process.exit(1);
    }
}

export default dbConnect;