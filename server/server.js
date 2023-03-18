require('dotenv').config()

const express = require('express');
const apicache = require("apicache");
const morgan = require('morgan');
const redis = require('redis');
const { IgApiClient } = require('instagram-private-api');
const app = express();
const port = 4000;
const cache = apicache.options({ redisClient: redis.createClient() }).middleware

// use the morgan middleware to log incoming requests
app.use(morgan(':date[iso] :method :url :status :res[content-length] - :response-time ms'));
app.use(cache('2 hours'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// Create an instance of the Instagram Private API client
const ig = new IgApiClient();
let loggedInUser;

(async () => {
    try {
        ig.state.generateDevice(process.env.USERNAME);
        loggedInUser = await ig.account.login(process.env.USERNAME, process.env.PASSWORD);
        await ig.account.currentUser();
        console.log("Instagram Logged in")
    } catch (error) {
        console.error(error);
    }
})();

// Middleware to set headers and handle errors
const handleRequest = (req, res, callback) => {
    try {
        callback(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Set up a route to fetch the user's Friends lists
app.get('/friends', async (req, res) => {
    handleRequest(req, res, async () => {
        // Fetch the user's friends lists
        const friendsFeed = ig.feed.accountFollowing(loggedInUser.pk);
        let friends = await friendsFeed.items();

        // filter the friends based on the search query
        if (req.query.searchTerm) {
            friends = friends.filter(friend => {
                const { username, full_name } = friend;
                return username.includes(req.query.searchTerm) || full_name.includes(req.query.searchTerm);
            });
        }

        res.json(friends);
    });
});

// Endpoint to set close friends
app.post('/close-friends', async (req, res) => {
    handleRequest(req, res, async () => {
        // Set close friends
        console.log(req.query.closeFriendsList);
        await ig.friendship.setCloseFriends(loggedInUser.pk, req.body.closeFriendsList);

        res.sendStatus(200);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
