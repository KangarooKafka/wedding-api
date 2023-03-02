import {model, Schema} from "mongoose";

// Schema for guest
const guestSchema = new Schema({
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

export default model('Guest', guestSchema)