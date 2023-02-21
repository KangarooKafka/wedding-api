import Guest from "../models/guest.model.js";
import _ from 'lodash'
import {Types} from "mongoose";


/**
 * Controller for guest-based endpoints and logic
 */
class GuestController {
    /**
     * Adds a new guest
     * @param ctx The request context object containing data for the new guest.
     * @param next The next client request.
     */
    async addGuest(ctx, next) {
        try {
            // Create new guest entry
            const guest = await new Guest(ctx.request.body).save();

            // Response to client
            ctx.body = guest;
            ctx.status = 201;

            // Log results
            console.log(`Body: ${ctx.body}\nStatus: ${ctx.status}`);

            await next();
        } catch(e) {
            // Response to client
            ctx.body = {message : e.message};
            ctx.status = 500;

            // Log results
            console.log(`Body: ${e.message}\nStatus: ${ctx.status}`);

            await next();
        }
    }

    /**
     * Returns a single guest
     * @param  ctx The request context object containing the guest requested.
     * @param  next The next client request.
     */
    async getGuest(ctx, next) {
        try {
            // Get guest object
            const guest = await Guest.findById(new Types.ObjectId(ctx.params.id));

            // If guest is not found
            if (_.isNil(guest)) ctx.throw(404, 'Guest not found');

            // Response to client
            ctx.body = guest;
            ctx.status = 200;

            // Log results
            console.log(`Body: ${ctx.body}\nStatus: ${ctx.status}`);

            await next();
        } catch(e) {
            // Response to client
            ctx.body = {message : e.message};
            ctx.status = 500;

            // Log results
            console.log(`Body: ${e.message}\nStatus: ${ctx.status}`);

            await next();
        }
    }

    /**
     * Returns guests that match query or returns all if no queries given
     * @param ctx The request context object.
     * @param  next The next client request.
     */
    async searchGuests(ctx, next) {
        try {
            // Get guests
            const guests = await Guest.find(ctx.query);

            // If no guests are found
            if (_.isEmpty(guests)) ctx.throw(404, 'No guests found')

            // Response to client
            ctx.body = guests;
            ctx.status = 200;

            // Log results
            console.log(`Body: ${ctx.body}\nStatus: ${ctx.status}`);

            await next();
        } catch(e) {
            // Response to client
            ctx.body = {message : e.message};
            ctx.status = 500;

            // Log results
            console.log(`Body: ${e.message}\nStatus: ${ctx.status}`);

            await next();
        }
    }

    /**
     * Updates the info on a guest
     * @param  ctx The request context object containing the guest to update and the new info.
     * @param  next The next client request.
     */
    async updateGuest(ctx, next) {
        try {
            // Find and update guest
            const guest = await Guest.findByIdAndUpdate(new Types.ObjectId(ctx.params.id), ctx.request.body);

            // If guest not found
            if (_.isNil(guest)) ctx.throw(404, 'Guest not found')

            // Response to client
            ctx.body = {message: "Success"};
            ctx.status = 200;

            // Log results
            console.log(`Body: Success\nStatus: ${ctx.status}`);

            await next();
        } catch(e) {
            // Response to client
            ctx.body = {message : e.message};
            ctx.status = 500;

            // Log results
            console.log(`Body: ${e.message}\nStatus: ${ctx.status}`);

            await next();
        }
    }

    /**
     * Deletes an guest
     * @param  ctx The request context object.
     * @param  next The next client request.
     */
    async deleteGuest(ctx, next) {
        try {
            // Find and delete guest
            const guest = await Guest.findByIdAndDelete(new Types.ObjectId(ctx.params.id));

            // If guest not found
            if (_.isNil(guest)) ctx.throw(404, 'Guest not found')

            // Response to client
            ctx.body = {message: 'Success'};
            ctx.status = 200;

            // Log results
            console.log(`Body: Success\nStatus: ${ctx.status}`);

            await next();
        } catch(e) {
            // Response to client
            ctx.body = {message : e.message};
            ctx.status = 500;

            // Log results
            console.log(`Body: ${e.message}\nStatus: ${ctx.status}`);

            await next();
        }
    }
}

export default new GuestController();