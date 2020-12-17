//Dependencies
const mongoose = require("mongoose");

//Create schema
const articleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        full: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
);

module.exports = mongoose.model("articles", articleSchema);
