const mongoose = require("mongoose");


// Create Schema
const MissionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
        },
        type: {
            type: String
        },
        data: {
            type: String
        }
    },
    { strict: false }
);

module.exports = Mission = mongoose.model("missions", MissionSchema);