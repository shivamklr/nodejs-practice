const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");
passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
        },
        function (email, password, done) {// ye dikkat callback mn bhi ayi thi, arguments ka order and name
            
            User.findOne({ email: email }, function (err, user) {
                if (err) {
                    console.log(`err`);
                    return done(err);
                }
                if (!user || user.password != password) {
                    console.log("Invalid Username/Password");
                    return done(null, false);
                }
                return done(null, user);
            });
        }
    )
);

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

//deserializing the user from the key
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log(`err`);
            return done(err);
        }
        return done(null, user);
    });
});//5

//check if user is authenticate
passport.checkAuthentication = function (req, res, next) {
    //if user is signed in
    if (req.isAuthenticated()) {
        return next();
    }
    //if user is not signed in

    return res.redirect("/users/sign-in");
};
passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
        //req.user contains the current signed in user from the session 
        //cookie and we are just sending this to the locals for the views.
    }
    next();
};

module.exports = passport;
