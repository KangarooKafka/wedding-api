import KoaRouter from "koa-router";
import guestController from "../controllers/guestController";

// Set up router
const guestRouter = new KoaRouter();

// Base route for Guest REST endpoints
const baseRoute = '/guest';

/* Routes */

// POST route to create new guest
guestRouter.post('add-guest',
    baseRoute,
    guestController.addGuest
);

// GET route to get a single guest
guestRouter.get(`${baseRoute}/:id`,
    guestController.getGuest
);

// GET route to search guests by query or get all guests if no queries
guestRouter.get(baseRoute,
    guestController.searchGuests
);

// PUT route to update a guest by ID
guestRouter.put('update-guest',
    `${baseRoute}/:id`,
    guestController.updateGuest
);

// DELETE route to delete an guest
guestRouter.delete('delete-guest',
    `${baseRoute}/:id`,
    guestController.deleteGuest
);

// Export router
export default guestRouter;