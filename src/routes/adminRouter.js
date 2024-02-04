import KoaRouter from 'koa-router';
import adminController from "../controllers/adminController.js";
import guestRouter from "./guestRouter.js";
import guestController from "../controllers/guestController.js";

// Set up router
const adminRouter = new KoaRouter();

// Base router for REST endpoints
const baseRoute = '/api/admin';

/* Routes */

// POST route to create new tracker
adminRouter.post(`${baseRoute}/status`,
    adminController.addTracker
);

// POST route to create new tracker
adminRouter.post(`${baseRoute}/status/delete-and-add`,
    adminController.exclusiveAddTracker
);

// POST route to create new puzzle
adminRouter.post(baseRoute,
    adminController.addPuzzle
);

// GET route to get a single puzzle or all puzzles if no params
adminRouter.get(`${baseRoute}/:id`,
    adminController.getPuzzle
);

// PUT route to check if an submission set is correct
adminRouter.put(`${baseRoute}/check/:id`,
    adminController.checkAnswers
);

// GET route to search tracker by query or get all puzzles if no queries
adminRouter.get(`${baseRoute}/status/all`,
    adminController.searchTracker
);

// GET route to search puzzles by query or get all puzzles if no queries
adminRouter.get(baseRoute,
    adminController.searchPuzzles
);

// PUT route to update a puzzle by ID
adminRouter.put(`${baseRoute}/:id`,
    adminController.updatePuzzle
);

// PUT route to update a tracker by ID
adminRouter.put(`${baseRoute}/status/:id`,
    adminController.updateTracker
);

// DELETE route to delete an puzzle
adminRouter.delete(`${baseRoute}/:id`,
    adminController.deletePuzzle
);

// DELETE route to delete an tracker
adminRouter.delete(`${baseRoute}/status/:id`,
    adminController.deleteTracker
);

// Export router
export default adminRouter;