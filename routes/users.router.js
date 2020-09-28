const express = require("express");
const router = express.Router();
const UserModel = require("../models/User.model")
const bcrypt = require("bcrypt");
const protectedAdminRoute = require('../middleware/protectAdminRoute');

//route to display all users to an admin
router.get('/users', protectedAdminRoute, async function(req, res, next) {
    const userlist = await UserModel.find();
    res.render('users', { users: userlist });
});

router.get("/user/:id/edit", async (req, res, next) => {
  try {
    res.render("manage_games");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
