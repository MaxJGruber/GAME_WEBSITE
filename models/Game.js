const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  rawgid: Number,
  title: String,
  image: {
    type: String,
    default:
      "https://www.ipsgroup.fr/wp-content/uploads/2013/12/default_image_01.png",
  },
  metacritic: { type: Number, min: 0, max: 100 },
  genre: {
    type: Array[String],
    enum: [
      "Action",
      "Indie",
      "Adventure",
      "RPG",
      "Strategy",
      "Shooter",
      "Casual",
      "Simulation",
      "Puzzle",
      "Arcade",
      "Platformer",
      "Racing",
      "Sports",
      "Massively Multiplayer",
      "Family",
      "Fighting",
      "Board Games",
      "Educational",
      "Card",
    ],
  },
  platform: {
    type: String,
    enum: [
      "PlayStation 4",
      "PlayStation 5",
      "PlayStation 3",
      "PlayStation 2",
      "PlayStation",
      "Xbox One",
      "Xbox Series X",
      "Xbox 360",
      "PC",
      "Steam",
      "Mobile",
      "PSP",
      "PS Vita",
      "Nintendo DS",
      "Nintendo WII",
      "Nintendo SWITCH",
    ],
  },
});

const Game = mongoose.model("Games", gameSchema);

module.exports = Game;
