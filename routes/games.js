var express = require("express");
var router = express.Router();
const Games = require("../models/Game");
const axios = require("axios");
const genre = require("../models/genre");
const platform = require("../models/platform");

// GETTING ALL GAMES

router.get("/collection", async function(req, res, next) {
    try {
        const dbResult = await Games.find();
        res.render("collection", { games: dbResult, genre, platform });
    } catch (error) {
        next(error);
    }
});

// GETTING ONE GAME

router.get("/collection/game/:id", async function(req, res, next) {
    try {
        const selectedGame = await Games.findById(req.params.id);
        const axiosResult = await axios.get(
            `https://api.rawg.io/api/games/${selectedGame.rawgid}`
        );
        console.log(axiosResult.data.description);
        res.render("oneGame", {
            selectedGame,
            description: axiosResult.data.description,
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;