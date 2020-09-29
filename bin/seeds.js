require("dotenv").config();
const Games = require("../models/Game");
const mongoose = require("mongoose");
const axios = require('axios');

async function loadGames() {
    const gameslist = await axios.get("https://api.rawg.io/api/games");
    const gamesresult = gameslist.data.results;
    const results = [];

    gamesresult.forEach(item => {
        //console.log(item.plateforms.map(item => item.platform.name));
        //console.log("toto", item.platforms.map(item => item.platform.name));
        results.push({
            rawgid: item.id,
            title: item.name,
            img: item.background_image,
            ratings: item.metacritic,
            genres: item.genres.map(item => item.name), //keep only the name key of the array item.genre
            plateform: item.platforms.map(item => item.platform.name),
            screenshots: item.short_screenshots.map(item => item.image),
            videos: item.clip.clip
        });
    });

    mongoose
        .connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(async() => {
            try {
                await Games.collection.drop();
                const dbResult = await Games.create(results)
                console.log(dbResult);
            } catch (error) {
                console.log(error);
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

loadGames();