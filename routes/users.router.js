const express = require("express");
const router = express.Router();
const UserModel = require("../models/User.model");
const bcrypt = require("bcrypt");


router.get("/user/:id/edit", async (req, res, next) => {
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
