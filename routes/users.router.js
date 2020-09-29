const express = require("express");
const router = express.Router();
const UserModel = require("../models/User.model");
const genre = require("../models/genre")
const platform = require("../models/platform")
// console.log("Platform = ", platform)

router.get("/user/edit", async(req, res, next) => {
    try {
        // console.log(req.session.currentUser._id)
        const user = await UserModel.findById(req.session.currentUser._id);
        res.render("user", { user , genre: genre, platform: platform });
    } catch (err) {
        next(err);
    }
});

router.post("/user/edit", async(req, res, next) => {
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            req.session.currentUser.id,
            req.body, { new: true }
        );
        console.log("tata")
        res.redirect("/user/edit");
    } catch (err) {
        next(err);
    }
});

module.exports = router;