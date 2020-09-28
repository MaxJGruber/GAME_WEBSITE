function protectedAdminRoute(req, res, next) {
    if (req.session.currentUser && req.session.currentUser.role === "admin") {
        next();
    } else {
        // req.flash("error", "Sorry you do not have access to that page");
        res.redirect("/");
    }
}

module.exports = protectedAdminRoute;