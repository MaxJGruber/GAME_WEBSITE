const express = require("express");
const router = express.Router();
const UserModel = require("../models/User.model")

router.get("/my-collection", async (req, res, next) => {
    try {
        const dbres = await (await UserModel.findByIdAndUpdate(req.session.currentUser._id)).populate("owned finished wishlist")
        if (req.session.currentUser) {
            res.render("myCollection", {
              isLoggedIn: req.session.currentUser,
              isAdmin: req.session.currentUser.role === "admin",
              user: dbres
            });
            // console.log("This >>", req);
          } else {
            res.render("index", { user: dbres });
          }
    } catch(err) {
        next(err)
    }
})
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
// router.get("/user/collection", async (req, res, next) => {
//     try {

//     } catch(err) {
//         next(err)
//     }
// })



module.exports = router;