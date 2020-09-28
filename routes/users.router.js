const express = require('express');
const router = express.Router();
const userModel = require("../models/User.model")

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
    const dbres = await userModel.create(newUser)
    res.redirect("/");
  } catch(err) {
    next(err)
  }
})


module.exports = router;
