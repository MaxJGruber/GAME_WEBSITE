const express = require("express");
const router = express.Router();
const UserModel = require("../models/User.model");

router.get("/user/edit", async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.session.currentUser.id);
    res.render("user", { user });
  } catch (err) {
    next(err);
  }
});

router.post("/user/edit", async (req, res, next) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.session.currentUser.id,
      req.body
    );
    res.redirect("/user/edit");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
