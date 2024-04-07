const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const Tweet = require("./tweet");

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

    app.post(
        "/tweets",
        async (request, response) => {
            const {
                sender,
                content
            } = request.body;

            const tweet = new Tweet({
                sender,
                content
            });

            await tweet.save();

            response.status(200).json({
                tweet
            });
        }
    )

    app.get(
        "/tweets/:id",
        async (request, response) => {
            const tweet = await Tweet.findById(request.params.id);

            response.status(200).json({
                tweet
            });
        }
    )

    app.get(
        "/tweets",
        async (request, response) => {
            const tweets = await Tweet.find().sort({ date: -1 });
            response.status(200).json({
                tweets
            });
        }
    )

    app.put(
        '/tweets/:id',
        async (request, response) => {
            const {
                sender,
                content
            } = request.body;

            const tweet = await
                Tweet.findByIdAndUpdate(
                    request.params.id,
                    {
                        sender,
                        content
                    }
                );

            response.status(200).json({
                tweet
            });
        }
    )

    app.delete(
        "/tweets/:id",
        async (request, response) => {
            const tweet = await Tweet.findByIdAndDelete(request.params.id);

            response.status(200).json({
                tweet
            });
        }
    )

    app.listen(4000, () => {
        console.log(`Server is running on port 4000`);
    })

}).catch((error) => {
    console.error(error);
})
