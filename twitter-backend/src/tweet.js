const mongoose = require("mongoose");

const Tweet = mongoose.Schema({
    sender: String,
    content: String
})

module.exports = mongoose.model("tweets", Tweet);