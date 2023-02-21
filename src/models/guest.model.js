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
        type: Boolean,
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
        type: Boolean,
    },
    children: {
        type: String,
        default: ""
    },
    rsvped: {
        type: Boolean,
        default: false,
    },
    stylePref: {
        type: String,
        default: ""
    },
    email: {
        type: String,
    },
    villaInt: {
        type: Boolean,
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