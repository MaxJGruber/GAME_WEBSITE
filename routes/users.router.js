const express = require("express");
const router = express.Router();
const UserModel = require("../models/User.model");
const genre = require("../models/genre")
const platform = require("../models/platform");
const protectUserRoute = require("../middleware/protectUserRoute");
const uploader = require("../config/cloudinary")
// console.log("Platform = ", platform)

router.get("/user/edit", protectUserRoute, async(req, res, next) => {
    try {
        // console.log(req.session.currentUser._id)
        const user = await UserModel.findById(req.session.currentUser._id);
        res.render("userUserEdit", { user , genre: genre, platform: platform });
    } catch (err) {
        next(err);
    }
});

router.post("/user/edit", uploader.single("image"),  async (req, res, next) => {
    if (req.file) {
        req.body.image = req.file.path
    }
    try {
        console.log("form content", req.body);
        const updatedUser = await UserModel.findByIdAndUpdate(
            req.session.currentUser._id,
            req.body, { new: true }
        );
        console.log("tata")
        res.redirect("/user/edit");
    } catch (err) {
        next(err);
    }
});

module.exports = router;