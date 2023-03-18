require('dotenv').config()

const express = require('express');
const { IgApiClient } = require('instagram-private-api');
const app = express();
const port = 4000;

// Create an instance of the Instagram Private API client
const ig = new IgApiClient();

// Set up a route to fetch the user's Friends lists
app.get('/friends', async (req, res) => {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");

        ig.state.generateDevice(process.env.USERNAME);
        const loggedInUser = await ig.account.login(process.env.USERNAME, process.env.PASSWORD);
        await ig.account.currentUser();

        // Fetch the user's friends lists
        const friendsFeed = ig.feed.accountFollowing(loggedInUser.pk);
        const friends = await friendsFeed.items();

        res.json(friends);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
