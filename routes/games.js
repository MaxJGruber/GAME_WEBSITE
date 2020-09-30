var express = require("express");
var router = express.Router();
const Games = require("../models/Game");
const axios = require("axios");
const genre = require("../models/genre");
const platform = require("../models/platform");

// GETTING ALL GAMES

router.get("/filter", async function(req, res, next) {
    try {
        console.log("******************************", req.query);
        let stringquery = req.query;
        //stringquery.split("'");
        console.log(stringquery.query);
        const dbResult = await Games.find(stringquery.query);
        res.send(dbResult);
        //res.send("toto");
    } catch (error) {
        console.log(error)
        next(error);
    }
});

router.get("/games/collection", async function(req, res, next) {
    try {
        const dbResult = await Games.find().limit(10);

        if (req.session.currentUser) {
            res.render("collection", {
                games: dbResult,
                genre,
                platform,
                isLoggedIn: req.session.currentUser,
                isAdmin: req.session.currentUser.role === "admin",
                javascripts: ["searchbar", "filterBar", "infinitescroll"]
            });
        } else {
            res.render("collection", {
                games: dbResult,
                genre,
                platform,
                javascripts: ["searchbar"],
            });
        }
    } catch (error) {
        next(error);
    }
});

// GETTING ONE GAME

router.get("/games/collection/game/:id", async function(req, res, next) {
    try {
        const selectedGame = await Games.findById(req.params.id);
        const axiosResult = await axios.get(
            `https://api.rawg.io/api/games/${selectedGame.rawgid}`
        );
        if (req.session.currentUser) {
            res.render("oneGame", {
                selectedGame,
                description: axiosResult.data.description,
                isLoggedIn: req.session.currentUser,
                isAdmin: req.session.currentUser.role === "admin",
            });

        } else {
            res.render("oneGame", {
                selectedGame,
                description: axiosResult.data.description,
            });
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;