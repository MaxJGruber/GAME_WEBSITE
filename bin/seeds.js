require("dotenv").config();
const Games = require("../models/Game");
const mongoose = require("mongoose");
const axios = require('axios');



async function initGames() {
    const gameslist = await axios.get(`https://api.rawg.io/api/games?page_size=40`);
    const gamesresult = gameslist.data.results;
    const results = [];

    gamesresult.forEach(item => {
        //console.log(item.plateforms.map(item => item.platform.name));
        //console.log("toto", item.platforms.map(item => item.platform.name));
        //console.log(item);
        if (item.clip === null) {
            results.push({
                rawgid: item.id,
                title: item.name,
                img: item.background_image,
                ratings: item.metacritic,
                genres: item.genres.map(item => item.name), //keep only the name key of the array item.genre
                plateform: item.platforms.map(item => item.platform.name),
                screenshots: item.short_screenshots.map(item => item.image),
            });
        } else {
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
        }
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
                console.log("done");
            } catch (error) {
                console.log(error);
            }
        })
        .catch((error) => {
            console.log(error);
        });
}





async function loadGames(page) {
    const gameslist = await axios.get(`https://api.rawg.io/api/games?page=${page}&page_size=40`);
    const gamesresult = gameslist.data.results;
    const results = [];

    gamesresult.forEach(item => {
        //console.log(item.plateforms.map(item => item.platform.name));
        //console.log("toto", item.platforms.map(item => item.platform.name));
        //console.log(item);
        if (item.clip === null) {
            results.push({
                rawgid: item.id,
                title: item.name,
                img: item.background_image,
                ratings: item.metacritic,
                genres: item.genres.map(item => item.name), //keep only the name key of the array item.genre
                plateform: item.platforms.map(item => item.platform.name),
                screenshots: item.short_screenshots.map(item => item.image),
            });
        } else {
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
        }
    });

    mongoose
        .connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(async() => {
            try {
                //await Games.collection.drop();
                const dbResult = await Games.create(results)
                console.log("done");
            } catch (error) {
                console.log(error);
            }
        })
        .catch((error) => {
            console.log(error);
        });
}


//page=${page}&

initGames();

let page = 2;
setInterval(() => {
    console.log("adding page: ", page)
    loadGames(page);
    page++;
}, 1000);