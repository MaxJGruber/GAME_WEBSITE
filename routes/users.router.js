const express = require('express');
const router = express.Router();
const UserModel = require("../models/User.model")
const bcrypt = require("bcrypt")

const salt = 10

/* GET users listing. */
router.get('/signup', (req, res, next) => {
  try {
    res.render('signup');
  } catch(err) {
    next(err)
  }
});

router.post("/signup", async (req, res, next) => {
  try {

    const newUser = req.body;
    const foundPseudo = await UserModel.findOne({pseudo: newUser.pseudo})
    const foundEmail = await UserModel.findOne({email: newUser.email})
    if (foundPseudo) {
      res.render("signup", {error: "This Pseudo already exists"})
    } else if (foundEmail) {
      res.render("signup", {error: "This E-mail already exists"})
    } else {
      const hashedPassword = bcrypt.hashSync(newUser.password, salt);
      newUser.password = hashedPassword;
      const dbres = await UserModel.create(newUser)
      res.redirect("/");

    }
  } catch(err) {
    next(err)
  }
})


module.exports = router;
