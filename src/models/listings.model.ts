import { Schema, model } from "mongoose";

const schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    price: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

export const Listing = model("Listing", schema);
