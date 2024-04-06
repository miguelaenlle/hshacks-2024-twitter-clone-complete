const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const tweetRoutes = require('./routes/tweet-routes');

mongoose.connect("mongodb+srv://admin:admin@cluster0.nouoc73.mongodb.net/reddit?retryWrites=true&w=majority", {
    auth: {
        username: "admin",
        password: "admin"
    },
    useUnifiedTopology: true,
    retryWrites: false
}).then(() => {
    const app = express();
    app.use(cors())
    app.use(express.json());

    app.use("/tweets", tweetRoutes);

    app.listen(4000, () => {
        console.log(`Server is running on port 4000`);
    })
}).catch((error) => {
    console.error(error);
})
