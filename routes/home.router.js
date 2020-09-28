var express = require('express');
var router = express.Router();
const UserModel = require("../models/User.model")
const bcrypt = require("bcrypt")

const salt = 10
/* GET home page. */

// Render the hbs file for the homepage
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// render the hbs file for signing up to the website
router.get('/signup', (req, res, next) => {
  try {
    res.render('signup');
  } catch(err) {
    next(err)
  }
});

// create User information for the database, from the form signup.hbs
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
});

// render the hbs file for signing in to the website
router.get("/signin", async (req, res, next) => {
  try {
    res.render("signin.hbs")
  } catch(err) {
    next(err)
  }
});

// fetch database and document to make sur the user who wants to connect exists
router.post("/signin", async (req, res, next) => {
  try {
    const {email, password } = req.body;
    const foundUser = await UserModel.findOne({email: email})

    if (!foundUser) {
      res.redirect("signin", {error: "Invalid Credentials"})
    } else {
      const isSamePassword = bcrypt.compareSync(password, foundUser.password )
      if (!isSamePassword) {
        res.redirect("signin", {error: "Invalid Credentials"})
      } else {
        const userDocument = {...foundUser};
        const userObject = foundUser.toObject();
        delete userObject.password;
        req.session.currentUser = userObject
        res.redirect("/")
      }
    }
  } catch(err) {
    next(err)
  }
})



module.exports = router;