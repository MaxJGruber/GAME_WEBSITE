const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  rawgid: Number,
  title: String,
  image: String,
  metacritic: Number,
  genre: {
    type: String,
    enum: [
      "action",
      "horror",
      "rpg",
      "adventure",
      "shooter",
      "sports",
      "education",
      "family",
      "fps",
    ],
  },
  platform: {
    type: String,
    enum: [
      "",
      "horror",
      "rpg",
      "adventure",
      "shooter",
      "sports",
      "education",
      "family",
      "fps",
    ],
  },
});

const Game = mongoose.model("Games", gameSchema);

module.exports = Game;
