import Puzzle from "../models/puzzle.model.js";
import Guest from "../models/guest.model.js";
import {Types} from "mongoose";
import _ from "lodash";

/**
 * Controller for admin endpoints and logic
 */
class AdminController {
    /**
     * Confirms if the server is running
     * @param ctx The router context
     * @param next The next client request.
     * @returns {Promise<void>}
     */
    async healthCheck(ctx, next) {
        try {
            // Set response
            ctx.body = { serverResp: 'running' };
            ctx.status = 200;

            // Log response
            console.log(`Body: Server running\nStatus: ${ctx.status}`);

            await next();
        } catch (e) {
            // Set response
            ctx.body = {message : e.message};
            ctx.status = 500;

            // Log response
            console.log(`Body: ${e.message}\nStatus: ${ctx.status}`);

            await next();
        }
    }

    /**
     * Adds a new puzzle and adds it to each guest
     * @param ctx The request context object containing data for the new puzzle.
     * @param next The next client request.
     */
    async addPuzzle(ctx, next) {
        try {
            // Create new puzzle entry
            const puzzle = await new Puzzle(ctx.request.body).save();

            // Add the new puzzle to all the guests
            const res = await Guest.updateMany({},{$push: {
                puzzle_answers: {
                    label: puzzle.label,
                    puzzle_id: puzzle.id,
                }
            }});

            // Response to client
            ctx.body = puzzle;
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
     * Returns a single puzzle by id
     * @param  ctx The request context object containing the puzzle requested.
     * @param  next The next client request.
     */
    async getPuzzle(ctx, next) {
        try {
            // Get puzzle object
            const puzzle = await Puzzle.findById(new Types.ObjectId(ctx.params.id));

            // If puzzle is not found
            if (_.isNil(puzzle)) ctx.throw(404, 'Puzzle not found');

            // Response to client
            ctx.body = puzzle;
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
     * Returns puzzles that match query or returns all if no queries given
     * @param ctx The request context object.
     * @param  next The next client request.
     */
    async searchPuzzles(ctx, next) {
        try {
            // Get puzzles
            const puzzles = await Puzzle.find(ctx.query);

            // If no guests are found
            if (_.isEmpty(puzzles)) ctx.throw(404, 'No puzzles found')

            // Response to client
            ctx.body = puzzles;
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
     * Updates the info on a puzzle
     * @param  ctx The request context object containing the puzzle to update and the new info.
     * @param  next The next client request.
     */
    async updatePuzzle(ctx, next) {
        try {
            // Find and update puzzle
            const puzzle = await Puzzle.findByIdAndUpdate(new Types.ObjectId(ctx.params.id), ctx.request.body);

            // If puzzle not found
            if (_.isNil(puzzle)) ctx.throw(404, 'Puzzle not found')

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
     * Deletes a puzzle
     * @param  ctx The request context object.
     * @param  next The next client request.
     */
    async deletePuzzle(ctx, next) {
        try {
            // Find and delete puzzle
            const puzzle = await Puzzle.findByIdAndDelete(new Types.ObjectId(ctx.params.id));

            // If guest not found
            if (_.isNil(puzzle)) ctx.throw(404, 'Puzzle not found')

            // Remove the new puzzle to all the guests
            const res = await Guest.updateMany({},
                {$pull: { puzzle_answers: { puzzle_id: Types.ObjectId(ctx.params.id)}
                    }});

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

export default new AdminController();