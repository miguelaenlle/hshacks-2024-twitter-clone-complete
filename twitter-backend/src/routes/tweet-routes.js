const express = require('express');
const Tweet = require('../models/tweet');

const router = express.Router();

router.post(
    "/",
    async (request, response) => {
        const {
            sender,
            content,
            imageUrl,
            senderPFP
        } = request.body;

        const tweet = new Tweet({
            sender,
            content,
            imageUrl,
            senderPFP,
            date: new Date()
        });

        await tweet.save();

        response.status(200).json({
            tweet
        });
    }
)

router.get(
    "/:id",
    async (request, response) => {
        const tweet = await Tweet.findById(request.params.id);

        response.status(200).json({
            tweet
        });
    }
)

router.get(
    "/",
    async (request, response) => {
        const tweets = await Tweet.find().sort({ date: -1 });
        response.status(200).json({
            tweets
        });
    }
)

router.put(
    '/:id',
    async (request, response) => {
        const {
            sender,
            content,
            imageUrl,
            senderPFP
        } = request.body;

        const tweet = await
            Tweet.findByIdAndUpdate(
                request.params.id,
                {
                    sender,
                    content,
                    imageUrl,
                    senderPFP
                }
            );

        response.status(200).json({
            tweet
        });
    }
)

router.delete(
    "/:id",
    async (request, response) => {
        const tweet = await Tweet.findByIdAndDelete(request.params.id);

        response.status(200).json({
            tweet
        });
    }
)

module.exports = router;