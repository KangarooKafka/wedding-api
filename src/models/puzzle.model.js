import {model, Schema} from "mongoose";

// Schema for puzzle
const guestSchema = new Schema({
    puzzles: {
        type: [{
            label: {
                type: String,
            },
            answer: {
                type: String,
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
        }]
    },

    username: {
        type: [String],
    },
    p1FirstName: {
        type: String,
    },
    p1LastName: {
        type: String,
    },
    p1Coming: {
        type: String,
    },
    p2FirstName: {
        type: String,
        default: ""
    },
    p2LastName: {
        type: String,
        default: ""
    },
    p2Coming: {
        type: String,
    },
    children: {
        type: String,
        default: ""
    },
    chAttending: {
        type: String,
        default: ""
    },
    rsvped: {
        type: String,
        default: "false",
    },
    stylePref: {
        type: String,
        default: ""
    },
    p1Email: {
        type: String,
    },
    p2Email: {
        type: String,
    },
    villaInt: {
        type: String,
    },
    roommates: {
        type: String,
    },
    foodRestricts: {
        type: String,
    },
    notes: {
        type: String,
    },
});

export default model('Puzzle', guestSchema)