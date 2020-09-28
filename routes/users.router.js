const express = require("express");
const router = express.Router();
const UserModel = require("../models/User.model")

router.get("/user/:id/edit", async(req, res, next) => {
    try {
        res.render("manage_games");
    } catch (err) {
        next(err);
    }
});

router.post("/user/:id/edit", async(req, res, next) => {
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            req.params.id,
            req.body
        );
        res.redirect("/");
    } catch (err) {
        next(err);
    }
});

module.exports = router;