const express = require("express");
const router = express.Router();
const UserModel = require("../models/User.model")
const protectedAdminRoute = require('../middleware/protectAdminRoute');
const uploader = require("../config/cloudinary");
const genre = require("../models/genre")
const platform = require("../models/platform")

//route to display all users to an admin
router.get('/users', protectedAdminRoute, async function(req, res, next) {
    try {
        const userlist = await UserModel.find();
        res.render('users', { users: userlist});
    } catch (error) {
        console.log(error);
        next(error);
    }

});

//route to display all users to an admin
router.get('/user/edit/:id', protectedAdminRoute, async function(req, res, next) {
    try {
        const user = await UserModel.findById(req.params.id);
        res.render('user', { user: user, genre: genre, platform: platform  });
    } catch (error) {
        console.log(error);
        next(error);
    }

});

//route to display all users to an admin
router.post('/user/edit/:id', protectedAdminRoute, uploader.single("image"), async function(req, res, next) {
    if (req.file) {
        console.log(req.file.path);
        req.body.image = req.file.path;
    }
    try {
        console.log(req.body);
        await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.redirect('/users');
    } catch (error) {

        console.log(error);
        next(error);
    }


});

//route to display all users to an admin
router.get('/user/delete/:id', protectedAdminRoute, async function(req, res, next) {
    try {
        await UserModel.findByIdAndDelete(req.params.id);
        res.redirect('/users');
    } catch (error) {
        console.log(error);
        next(error);
    }

});

module.exports = router;