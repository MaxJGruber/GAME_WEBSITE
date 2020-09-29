var express = require("express");
var router = express.Router();
const Games = require("../models/Game");
const axios = require("axios");

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

// ZOOM ON ONE SCREENSHOT

router.get("/collection/screenshot/:id", async function (req, res, next) {
  try {
    const selectedScreenshot = await Games.findById(req.params.id);
    res.render("screenshot-wide-screen", {
      selectedScreenshot,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
