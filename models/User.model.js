const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  pseudo: String,
  email: { type: String, unique: true },
  password: String,
  age: Number,
  favConsole: {type: String, enum: [
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
  ]},
  favGenre: {type: String, enum: ["Action", "Indie", "Adventure","RPG", "Strategy", "Shooter", "Casual", "Simulation", "Puzzle", "Arcade", "Platformer", "Racing", "Sports", "Massively Multiplayer", "Family", "Fighting", "Board Games", "Educational", "Card"]}, // A completer
  role: { type: String, enum: ["admin", "user"], default: "user" },
  image: {type: String, default: "https://www.kindpng.com/picc/m/105-1055561_gaming-logo-avatar-png-transparent-png.png"},
  wishlist: Array[Number], // [Schema.Types.ObjectID, ref: "Games"]
  owned: Array[Number], // [Schema.Types.ObjectID, ref: "Games"]
  finished: Array[Number], // [Schema.Types.ObjectID, ref: "Games"]
});

const User = mongoose.model("User", userSchema);

module.exports = User;