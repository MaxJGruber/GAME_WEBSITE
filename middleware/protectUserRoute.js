module.exports = function protectUserRoute(req, res, next) {
  if (req.session.currentUser) {
    res.locals.currentUser = req.session.currentUser;
    res.locals.isLoggedIn = true;
    res.locals.isAdmin = req.session.currentUser.role === "admin";
  } else {
    res.locals.currentUser = undefined;
    res.locals.isLoggedIn = false;
    res.locals.isAdmin = false;
  }
  next();
};
