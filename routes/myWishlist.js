const express = require("express");
const router = express.Router();
const UserModel = require("../models/User.model");
const Games = require("../models/Game");
router.get(`/my-collection/add-to-wishlist`, async function (req, res, next) {
  const user = await UserModel.findById(req.session.currentUser._id);
  const game = await Games.findById(req.query.data);
  user.wishlist.push(game._id);
  const result = await UserModel.findByIdAndUpdate(
    req.session.currentUser._id,
    user,
    { new: true }
  );
  res.send(result);
});
module.exports = router;
