module.exports = function protectUserRoute(req, res, next) {
    if (req.session.currentUser) next();
    else res.redirect("/signin");
};