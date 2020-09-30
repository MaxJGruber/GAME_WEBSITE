const express = require("express");
const router = express.Router();
const UserModel = require("../models/User.model");
const Games = require("../models/Game");

router.get("/my-collection", async function (req, res, next) {
  try {
    const dbres = await UserModel.findById(req.session.currentUser._id);
    let dbpop = await dbres.populate("wishlist owned").execPopulate();
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

// router.get("/user/collection", async (req, res, next) => {
//     try {

//     } catch(err) {
//         next(err)
//     }
// })
// router.get("/user/collection", async (req, res, next) => {
//     try {

//     } catch(err) {
//         next(err)
//     }
// })

module.exports = router;
