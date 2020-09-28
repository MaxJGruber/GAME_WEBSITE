const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const UserModel = require("../models/User.model")
const bcrypt = require("bcrypt");
const protectedAdminRoute = require('../middleware/protectAdminRoute');

//route to display all users to an admin
router.get('/users', protectedAdminRoute, async function(req, res, next) {
    const userlist = await UserModel.find();
    res.render('users', { users: userlist });
});
=======
const UserModel = require("../models/User.model");
const bcrypt = require("bcrypt");
>>>>>>> 128a3dc169a0029330d1169a3a3dc9ebe02b357e

router.get("/user/:id/edit", async (req, res, next) => {
  try {
    res.render("manage_games");
  } catch (err) {
    next(err);
  }
});

<<<<<<< HEAD
module.exports = router;
=======
router.post("/user/:id/edit", async (req, res, next) => {
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
>>>>>>> 128a3dc169a0029330d1169a3a3dc9ebe02b357e
