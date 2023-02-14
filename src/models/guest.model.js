import {model, Schema} from "mongoose";

// Schema for guest
const guestSchema = new Schema({
    password: {
        type: String,
    },
    p1FirstName: {
        type: String,
    },
    p1LastName: {
        type: String,
    },
    p2FirstName: {
        type: String,
    },
    p2LastName: {
        type: String,
    },
    children: {
        type: String,
    },
    stylePref: {
        type: String,
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