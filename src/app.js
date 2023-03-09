import koa from 'koa';
import * as KoaRouter from 'koa-router';
import * as KoaPinoLogger from 'koa-pino-logger'
import * as KoaCors from '@koa/cors'
//import koaBody from 'koa-body';
import config from 'config';
import * as dotenv from 'dotenv';

import { createRequire } from "module";
const require = createRequire(import.meta.url);

// Set up environment variables
dotenv.config();

// Database
import dbConnect from './dbConnect/dbConnect.js';

// Routes
import guestRouter from "./routes/guestRouter.js";
import adminRouter from "./routes/adminRouter.js";

// Logger
import pinoLogger from "../logger/logger.js";
import * as process from "process";
import pino from "pino";

/* SERVER SETUP */
const port = 4000;
const host = 'localhost';

// Better logging than console.log
//const logger = pinoLogger();
const logger = pino;
const koaPinoLogger = require('koa-pino-logger');


const { koaBody } = require('koa-body')

// Require the koa-router
const Router = require('koa-router');

// Require CORS
const cors = require('@koa/cors');

// Launch Server
const app = new koa();
const router = Router();

app.use(cors());
app.use(koaPinoLogger());
app.use(koaBody({multipart: true}));
app.use(router.routes())
    .use(guestRouter.routes())
    .use(adminRouter.routes())

/* PORT LISTENING */
if (process.env.NODE_ENV !== 'test') {
    // Connect to DB
    dbConnect();

    app.listen(port, host, () => {
        console.log(`Server listening at http://${host}:${port}`);
    });
}

export default app;

