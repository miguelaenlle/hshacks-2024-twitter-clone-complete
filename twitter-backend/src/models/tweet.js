const mongoose = require("mongoose");

const Tweet = mongoose.Schema({
    sender: {
        type: String
    },
    senderPFP: {
        type: String
    },
    content: {
        type: String
    },
    imageUrl: String,
    date: {
        type: Date
    }
})

module.exports = mongoose.model("tweets", Tweet);