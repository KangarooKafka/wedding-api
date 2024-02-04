import {model, Schema} from "mongoose";

// Schema for overall Tracker
const trackerSchema = new Schema({
    puzzle_finished: {
        type: Boolean,
        default: false,
    },
    who_solved_first: {
        type: String,
        default: "",
    },
    reward: {
        type: String,
        default: "",
    },
    solved_time: {
        type: String,
        default: "",
    }
});

export default model('Tracker', trackerSchema)