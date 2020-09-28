var express = require("express");
var router = express.Router();
const Games = require("../models/Game");

// GETTING ALL GAMES

router.get("/collection", async function(req, res, next) {
    try {
        const dbResult = await Games.find();
        res.render("collection", { games: dbResult });
    } catch (error) {
        next(error);
    }
});

module.exports = router;