const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
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
            "PC",

            "PlayStation 5",
            "PlayStation 4",
            "PlayStation 3",
            "PlayStation 2",
            "PlayStation",
            "PSP",
            "PS Vita",

            "Xbox One",
            "Xbox Series S/X",
            "Xbox 360",
            "Xbox",

            "iOS",

            "Android",

            "macOS",
            "Classic Macintosh",
            "Apple II",

            "Linux",

            "Nintendo Switch",
            "Nintendo 3DS",
            "Nintendo DS",
            "Nintendo DSi",
            "Wii U",
            "Wii",
            "GameCube",
            "Nintendo 64",
            "Game Boy Advance",
            "Game Boy Color",
            "Game Boy",
            "SNES",
            "NES",

            "Atari 7800",
            "Atari 5200",
            "Atari 2600",
            "Atari Flashback",
            "Atari 8-bit",
            "Atari ST",
            "Atari Lynx",
            "Atari XEGS",
            "Jaguar",

            "Commodore / Amiga",

            "Genesis",
            "SEGA Saturn",
            "SEGA CD",
            "SEGA 32X",
            "SEGA Master System",
            "Dreamcast",
            "Game Gear",

            "3DO",
            "Neo Geo",

            "Web",
            "Steam",
            "Mobile"
        ],
    },
    screenshots: [String],
    videos: String
});

const Game = mongoose.model("Games", gameSchema);

module.exports = Game;