const express = require("express");
const router = express.Router();
const UserModel = require("../models/User.model");
const Games = require("../models/Game");

router.get("/my-collection", async function (req, res, next) {
  try {
    const dbres = await UserModel.findById(req.session.currentUser._id);
    const dbpop = await dbres
      .populate("wishlist owned finished")
      .execPopulate();
    // console.log("********", dbpop);
    if (req.session.currentUser) {
      res.render("myCollection", {
        isLoggedIn: req.session.currentUser,
        isAdmin: req.session.currentUser.role === "admin",
        user: dbres,
      });
      // console.log("This >>", req);
    } else {
      res.render("index", { user: dbres });
    }
  } catch (err) {
    next(err);
  }
});


router.get("/my-collection/add-to-collection", async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.session.currentUser._id);
    let ownedList = user.owned;
    ownedList.push(req.query.data);
    // console.log("liiiiist pushed",ownedList);
    user.owned = ownedList;
    // console.log(user);
    const dbres = await UserModel.findByIdAndUpdate(
      req.session.currentUser._id,
      user
    );
  } catch (err) {
    next(err);
  }
});

router.get("/my-collection/add-to-finish", async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.session.currentUser._id)
    let finishedList = user.finished;
    finishedList.push(req.query.data)
    // console.log("liiiiist pushed",ownedList);
    user.finished = finishedList
    // console.log(user);
    const dbres = await UserModel.findByIdAndUpdate(req.session.currentUser._id, user);

  } catch(err) {
      next(err)
  }
})

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
