var express = require("express");
var router = express.Router();
const UserModel = require("../models/User.model");
const bcrypt = require("bcrypt");
const session = require("express-session");
const protectUserRoute = require("../middleware/protectUserRoute");

const salt = 10;
/* GET home page. */

// Render the hbs file for the homepage
router.get("/", function(req, res, next) {
    if (req.session.currentUser) {
        res.render("index", {
            isLoggedIn: req.session.currentUser,
            isAdmin: req.session.currentUser.role === "admin",
        });
        // console.log("This >>", req);
    } else {
        res.render("index");
    }
});

// render the hbs file for signing up to the website
router.get("/signup", (req, res, next) => {
    try {
        res.render("signup");
    } catch (err) {
        next(err);
    }
});

// create User information for the database, from the form signup.hbs
router.post("/signup", async(req, res, next) => {
    try {
        const newUser = req.body;
        const foundPseudo = await UserModel.findOne({ pseudo: newUser.pseudo });
        const foundEmail = await UserModel.findOne({ email: newUser.email });
        if (foundPseudo) {
            res.render("signup", { error: "This Pseudo already exists" });
        } else if (foundEmail) {
            res.render("signup", { error: "This E-mail already exists" });
        } else {
            const hashedPassword = bcrypt.hashSync(newUser.password, salt);
            newUser.password = hashedPassword;
            const dbres = await UserModel.create(newUser);
            res.redirect("/signin");
        }
    } catch (err) {
        next(err);
    }
});

// render the hbs file for signing in to the website
router.get("/signin", async(req, res, next) => {
    try {
        res.render("signin.hbs");
    } catch (err) {
        next(err);
    }
});

// fetch database and document to make sur the user who wants to connect exists
router.post("/signin", async(req, res, next) => {
    try {
        const { email, password } = req.body;
        const foundUser = await UserModel.findOne({ email: email });

        if (!foundUser) {
            res.render("signin", { error: "Invalid Credentials" });
        } else {
            const isSamePassword = bcrypt.compareSync(password, foundUser.password);
            if (!isSamePassword) {
                res.render("signin", { error: "Invalid Credentials" });
            } else {
                const userDocument = {...foundUser };
                const userObject = foundUser.toObject();
                userObject._id = foundUser._id;
                delete userObject.password;
                req.session.currentUser = userObject;
                res.locals.currentUser = req.session.currentUser;
                res.locals.isLoggedIn = true;
                res.locals.isAdmin = req.session.currentUser.role == "admin";
                res.redirect("/");
            }
        }
    } catch(err) {
      next(err)
    }
});

router.get("/signout", async(req, res, next) => {
    req.session.destroy(function(err) {
        res.redirect("/signin");
    });
});

router.get("/about", async(req, res, next) => {
    res.redirect("/");
});

module.exports = router;