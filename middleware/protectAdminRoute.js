function protectedAdminRoute(req, res, next) {
    if (req.session.currentUser && req.session.currentUser.role === "admin") {
        res.locals.currentUser = req.session.currentUser;
        res.locals.isLoggedIn = true;
        res.locals.isAdmin = req.session.currentUser.role === "admin";
        next();
    } else {
        res.locals.currentUser = undefined;
        res.locals.isLoggedIn = false;
        res.locals.isAdmin = false;
        req.flash("error", "Sorry you do not have access to that page");
        res.redirect("/");
    }
}

module.exports = protectedAdminRoute;