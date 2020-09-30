const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
<<<<<<< HEAD
    rawgid: Number,
    title: String,
    img: {
        type: String,
        default: "https://www.ipsgroup.fr/wp-content/uploads/2013/12/default_image_01.png",
    },
    ratings: { type: Number, min: 0, max: 100 },
    genres: {
        type: [String],
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
    plateform: {
        type: [String],
        enum: [
            "PlayStation 5",
            "PlayStation 4",
            "PlayStation 3",
            "PlayStation 2",
            "PlayStation",
            "Xbox One",
            "Xbox Series S/X",
            "Xbox 360",
            "Xbox",
            "PC",
            "Steam",
            "Mobile",
            "PSP",
            "PS Vita",
            "Nintendo DS",
            "Nintendo WII",
            "Nintendo Switch",
            "macOS",
            "Linux",
            "Android",
            "iOS",
            "Web",
            "Wii U",
            "Nintendo 3DS"
        ],
    },
    screenshots: [String],
    videos: String
=======
  rawgid: Number,
  title: String,
  img: {
    type: String,
    default:
      "https://www.ipsgroup.fr/wp-content/uploads/2013/12/default_image_01.png",
  },
  ratings: { type: Number, min: 0, max: 100 },
  genres: {
    type: [String],
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
  plateform: {
    type: [String],
    enum: [
      "PlayStation 5",
      "PlayStation 4",
      "PlayStation 3",
      "PlayStation 2",
      "PlayStation",
      "Xbox One",
      "Xbox Series S/X",
      "Xbox 360",
      "Xbox",
      "PC",
      "Steam",
      "Mobile",
      "PSP",
      "PS Vita",
      "Nintendo DS",
      "Nintendo WII",
      "Nintendo Switch",
      "macOS",
      "Linux",
      "Android",
      "iOS",
    ],
  },
  screenshots: [String],
  videos: String,
>>>>>>> 4dd7fbc59191169cbe3fea1cff5ae22f6bbfa98d
});

const Game = mongoose.model("Games", gameSchema);

module.exports = Game;
