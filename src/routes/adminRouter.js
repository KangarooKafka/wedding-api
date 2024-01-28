import KoaRouter from 'koa-router';
import adminController from "../controllers/adminController.js";
import guestRouter from "./guestRouter.js";
import guestController from "../controllers/guestController.js";

// Set up router
const adminRouter = new KoaRouter();

// Base router for REST endpoints
const baseRoute = '/api/admin';

/* Routes */

// POST route to create new puzzle
adminRouter.post(baseRoute,
    adminController.addPuzzle
);

// GET route to get a single puzzle or all puzzles if no params
adminRouter.get(`${baseRoute}/:id`,
    adminController.getPuzzle
);

// GET route to search puzzles by query or get all puzzles if no queries
adminRouter.get(baseRoute,
    adminController.searchPuzzles
);

// PUT route to update a guest by ID
adminRouter.put(`${baseRoute}/:id`,
    adminController.updatePuzzle
);

// DELETE route to delete an guest
adminRouter.delete(`${baseRoute}/:id`,
    adminController.deletePuzzle
);

// Export router
export default adminRouter;