var express = require("express");
var router = express.Router();
const Games = require("../models/Game");
const axios = require("axios");

router.get("/search/game", async function (req, res, next) {
  console.log("redirect");
  try {
    console.log(req.query);
    const dbGame = await Games.find(req.query);
    console.log(dbGame[0]._id);
    // res.render("index");
    // res.redirect(`/games/collection/game/${dbGame[0]._id}`);

    res.send(dbGame[0]._id);
    console.log("titi");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
