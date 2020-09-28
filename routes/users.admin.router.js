const express = require("express");
const router = express.Router();
const UserModel = require("../models/User.model")
const protectedAdminRoute = require('../middleware/protectAdminRoute');

//route to display all users to an admin
router.get('/users', protectedAdminRoute, async function(req, res, next) {
    const userlist = await UserModel.find();
    res.render('users', { users: userlist });
});

//route to display all users to an admin
router.get('/users/:id', protectedAdminRoute, async function(req, res, next) {
    const user = await UserModel.findById(req.params.id);
    res.render('user', { user: user });
});

//route to display all users to an admin
router.post('/users/:id', protectedAdminRoute, async function(req, res, next) {
    await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.redirect('/users');
});

//route to display all users to an admin
router.delete('/users/:id', protectedAdminRoute, async function(req, res, next) {
    await UserModel.findByIdAndDelete(req.params.id);
    res.redirect('/users');
});