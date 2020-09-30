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
        let andQuery = [];

        if (req.query.title) {
            let query = {};
            const reg = new RegExp(`.*${req.query.title}.*`, "i");
            query.title = { $regex: reg };
            andQuery.push(query);
        }
        if (req.query.platform) {
            let query = {};
            query.plateform = { $in: req.query.platform }
            andQuery.push(query);
        }
        if (req.query.genres) {
            let query = {};
            query.genres = { $in: req.query.genres }
            andQuery.push(query);
        }
        //let finalquery = andQuery.length > 1 ? { $and: andQuery } : andQuery[0];
        let finalquery = {};
        if (andQuery.length > 1) {
            finalquery.$and = andQuery;
        } else {
            finalquery = andQuery[0] ? andQuery[0] : {};
        }

        console.log("finalquery: ", finalquery);


        // { 
        //    $and :[ platform: [""],
        //     title: ]
        // }


        const dbResult = await Games.find(finalquery);
        res.send(dbResult);
        //res.send("toto");
    } catch (error) {
        console.log(error)
        next(error);
    }
});

router.get("/games/load/:page", async function(req, res, next) {
    try {
        console.log("******************************", req.params.page);
        const dbResult = await Games.find().limit(10).skip(10 * (req.params.page - 1));
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
                javascripts: ["searchbar", "filterBar", "infinitescroll", "myCollection"]
            });
        } else {
            res.render("collection", {
                games: dbResult,
                genre,
                platform,
                javascripts: ["searchbar", "filterBar", "infinitescroll", "myCollection"],
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
                javascripts: ["myCollection"]
            });

        } else {
            res.render("oneGame", {
                selectedGame,
                description: axiosResult.data.description,
                javascripts: ["myCollection"]
            });
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;