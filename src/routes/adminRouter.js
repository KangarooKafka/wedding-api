import KoaRouter from 'koa-router';
import adminController from "../controllers/adminController";

// Set up router
const adminRouter = new KoaRouter();

// Base router for REST endpoints
const baseRoute = '/admin';

/* Routes */

// GET route for health check
adminRouter.get(baseRoute,
    adminController.healthCheck
);

// Export router
export default adminRouter;