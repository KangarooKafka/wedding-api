import {model, Schema} from "mongoose";

// Schema for puzzle
const guestSchema = new Schema({
    label: {
        type: String,
    },
    answer: {
        type: [String],
    },
    solved: {
        type: Boolean,
        default: false,
    },
    first_solved_by: {
        type: String,
        default: "",
    },
    first_solved_date: {
        type: String,
        default: "",
    },
    everyone_who_solved: {
        type: [String],
        default: [],
    }
});

export default model('Puzzle', guestSchema)