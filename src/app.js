import koa from 'koa';
import * as KoaRouter from 'koa-router';
import koaBody from 'koa-body';
import config from 'config';
import * as dotenv from 'dotenv';

// Set up environment variables
dotenv.config();

// Database
import dbConnect from './db/dbConnect';

// Routes
import guestRouter from "./routes/guestRouter";
import adminRouter from "./routes/adminRouter";

// Logger
import pinoLogger from "../logger/logger";
import * as process from "process";

/* SERVER SETUP */
const port = config.get('port');
const host = config.get('host');

// Better logging than console.log
const logger = pinoLogger();
const koaPinoLogger = require('koa-pino-logger');

// Require the koa-router
const Router = require('koa-router');

// Require CORS
const cors = require('@koa/cors');

// Launch Server
const app = new koa();
const router = new Router();

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
        logger.info(`Server listening at https://${host}:${port}`);
    });
}

export default app;

