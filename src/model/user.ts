import { Schema, model } from "npm:mongoose";

const User = new Schema({
    name: String,
    chatId: Number,
    phone: String,
    admin: {
        type: Boolean,
        default: false,
    },
    action: String,
    createdAt: Date,
    status: {
        type: Boolean,
        default: true,
    },
});

export const user = model("User", User);
