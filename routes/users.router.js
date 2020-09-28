const express = require("express");
const router = express.Router();
const UserModel = require("../models/User.model");

<<<<<<< HEAD
router.get("/user/edit", async(req, res, next) => {
    try {
        res.render("manage_games");
    } catch (err) {
        next(err);
    }
=======
router.get("/user/edit", async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.session.currentUser.id);
    res.render("user", { user });
  } catch (err) {
    next(err);
  }
>>>>>>> 3d717b645dbb8adfebc4b8179cb07f562c558efc
});

router.post("/user/edit", async (req, res, next) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.session.currentUser.id,
      req.body,
      { new: true }
    );
    res.redirect("/user/edit");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
