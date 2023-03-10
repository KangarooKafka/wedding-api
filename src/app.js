import koa from 'koa';
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

/* SERVER SETUP */
const port = 4000;
const host = 'localhost';

// Require koa-body
const { koaBody } = require('koa-body')

// Require the koa-router
const Router = require('koa-router');

// Require CORS
const cors = require('@koa/cors');

// Launch Server
const app = new koa();
const router = Router();

app.use(cors());
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

