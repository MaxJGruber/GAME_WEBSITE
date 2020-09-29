var express = require("express");
var router = express.Router();
const Games = require("../models/Game");

// GETTING ALL GAMES

router.get("/collection", async function (req, res, next) {
  try {
    const dbResult = await Games.find();
    res.render("collection", { games: dbResult });
  } catch (error) {
    next(error);
  }
});

// GETTING ONE GAME

router.get("/collection/game/:id", async function (req, res, next) {
  try {
    const selectedGame = await Games.findById(req.params.id);
    res.render("oneGame", { selectedGame });
  } catch (error) {
    next(one);
  }
});

module.exports = router;
