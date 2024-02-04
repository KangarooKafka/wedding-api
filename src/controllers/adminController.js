import Puzzle from "../models/puzzle.model.js";
import Guest from "../models/guest.model.js";
import Tracker from "../models/tracker.model.js";
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
            ctx.status = 501;

            // Log results
            console.log(`Body: ${e.message}\nStatus: ${ctx.status}`);

            await next();
        }
    }

    /**
     * Adds a new tracker and adds it to each guest
     * @param ctx The request context object containing data for the new puzzle.
     * @param next The next client request.
     */
    async addTracker(ctx, next) {
        try {
            // Create new tracker entry
            const tracker = await new Tracker(ctx.request.body).save();

            // Response to client
            ctx.body = tracker;
            ctx.status = 201;

            // Log results
            console.log(`Body: ${ctx.body}\nStatus: ${ctx.status}`);

            await next();
        } catch(e) {
            // Response to client
            ctx.body = {message : e.message};
            ctx.status = 502;

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
            ctx.status = 503;

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
            ctx.status = 504;

            // Log results
            console.log(`Body: ${e.message}\nStatus: ${ctx.status}`);

            await next();
        }
    }

    /**
     * Returns tracker
     * @param ctx The request context object.
     * @param  next The next client request.
     */
    async searchTracker(ctx, next) {
        try {
            // Get tracker
            const tracker = await Tracker.find(ctx.query);

            // If no guests are found
            if (_.isEmpty(tracker)) ctx.throw(404, 'No trackers found')

            // Response to client
            ctx.body = tracker[0];
            ctx.status = 200;

            // Log results
            console.log(`Body: ${ctx.body}\nStatus: ${ctx.status}`);

            await next();
        } catch(e) {
            // Response to client
            ctx.body = {message : e.message};
            ctx.status = 505;

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
            ctx.status = 506;

            // Log results
            console.log(`Body: ${e.message}\nStatus: ${ctx.status}`);

            await next();
        }
    }

    /**
     * Updates the info on a tracker
     * @param  ctx The request context object containing the puzzle to update and the new info.
     * @param  next The next client request.
     */
    async updateTracker(ctx, next) {
        try {
            // Find tracker
            const tracker = await Tracker.findById(ctx.params.id, ctx.request.body);

            // If tracker not found
            if (_.isNil(tracker)) ctx.throw(404, 'Tracker not found')

            if (tracker.puzzle_finished) {
                // Response to client

                ctx.body = {tracker};
            } else {
                // Find and update tracker
                const updatedTracker = await Tracker.findByIdAndUpdate(ctx.params.id, ctx.request.body);

                // If tracker not found
                if (_.isNil(updatedTracker)) ctx.throw(404, 'Tracker not found')

                ctx.body = {updatedTracker};
            }

            ctx.status = 200;

            // Log results
            console.log(`Body: Success\nStatus: ${ctx.status}`);

            await next();
        } catch(e) {
            // Response to client
            ctx.body = {message : e.message};
            ctx.status = 507;

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
            ctx.status = 508;

            // Log results
            console.log(`Body: ${e.message}\nStatus: ${ctx.status}`);

            await next();
        }
    }

    /**
     * Deletes a tracker
     * @param  ctx The request context object.
     * @param  next The next client request.
     */
    async deleteTracker(ctx, next) {
        try {
            // Find and delete puzzle
            const tracker = await Tracker.findByIdAndDelete(new Types.ObjectId(ctx.params.id));

            // If guest not found
            if (_.isNil(tracker)) ctx.throw(404, 'Tracker not found')

            // Response to client
            ctx.body = {message: 'Success'};
            ctx.status = 200;

            // Log results
            console.log(`Body: Success\nStatus: ${ctx.status}`);

            await next();
        } catch(e) {
            // Response to client
            ctx.body = {message : e.message};
            ctx.status = 509;

            // Log results
            console.log(`Body: ${e.message}\nStatus: ${ctx.status}`);

            await next();
        }
    }

    /**
     * Checks if a submitted set of answers is correct
     * @param ctx The request context object containing data for the new puzzle.
     * @param next The next client request.
     */
    async checkAnswers(ctx, next) {
        try {
            // Get the user answers
            const submission = ctx.request.body;
            let correct = 0;
            let answer_correct = false;

            // Get guest object
            const guest = await Guest.findById(new Types.ObjectId(ctx.params.id));

            // For each puzzle that the guest has submitted an answer for
            for(let i = 0; i < ctx.request.body.puzzle_answers.length; i++){

                // Get the puzzle id and puzzle for this entry
                const puzzle_id = submission.puzzle_answers[i]._id;
                const puzzle = await Puzzle.findById(puzzle_id);

                // Check if answer is correct
                answer_correct = puzzle.answer.includes(ctx.request.body.puzzle_answers[i].entry);

                // Set the guests puzzle entry to their current entry
                for (let j = 0; j < guest.puzzle_answers.length; j++){
                    if (guest.puzzle_answers[j].puzzle_id.toString() === puzzle_id){
                        guest.puzzle_answers[j].entry = ctx.request.body.puzzle_answers[i].entry;
                        if (answer_correct) {
                            guest.puzzle_answers[j].correct = true;
                        } else {
                            guest.puzzle_answers[j].correct = false;
                        }
                    }
                }

                // Check if the user entry is correct
                if(answer_correct){

                    // Add to total correct
                    correct = correct + 1;

                    // Check if the puzzle has ever been solved yet
                    if (!puzzle.solved){
                        puzzle.solved = true;
                        puzzle.first_solved_date = Date.now();
                        if (guest.p2FirstName.length > 0){
                            puzzle.first_solved_by = `${guest.p1FirstName} and ${guest.p2FirstName}`;
                            puzzle.everyone_who_solved.push(`${guest.p1FirstName} and ${guest.p2FirstName}`);
                        } else {
                            puzzle.first_solved_by = `${guest.p1FirstName}`;
                            puzzle.everyone_who_solved.push(`${guest.p1FirstName}`);
                        }

                    }

                    if (!puzzle.everyone_who_solved.includes(`${guest.p1FirstName} and ${guest.p2FirstName}`) &&
                        !puzzle.everyone_who_solved.includes(`${guest.p1FirstName}`)) {
                        if (guest.p2FirstName.length > 0){
                            puzzle.everyone_who_solved.push(`${guest.p1FirstName} and ${guest.p2FirstName}`);
                        } else {
                            puzzle.everyone_who_solved.push(`${guest.p1FirstName}`);
                        }
                    }
                }
                puzzle.save();
            }

            guest.save();


            // Response to client
            ctx.body = {"correct" : correct};
            ctx.status = 201;

            // Log results
            console.log(`Body: ${ctx.body}\nStatus: ${ctx.status}`);

            await next();
        } catch(e) {
            // Response to client
            ctx.body = {message : e.message};
            ctx.status = 510;

            // Log results
            console.log(`Body: ${e.message}\nStatus: ${ctx.status}`);

            await next();
        }
    }
}

export default new AdminController();