const User = require("../models/user");
const passport = require("passport");

module.exports.profile = function (req, res) {
    User.findById(req.params.id, function(err, user){
        return res.render("user_profile", {
            title: "User Profile",
            profile_user:user,
        });
    });
};

// update user info
module.exports.update = function(req, res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            return res.redirect('back');
        });
    }
    else{
        return res.status(401).send('Unauthorized');
    }
}

// render the sign up page
module.exports.signUp = function (req, res) {
    //no need to sign in if the user if already signed in
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
    return res.render("user_sign_up", {
        title: "Codeial | Sign Up",
    });
};

// render the sign in page
module.exports.signIn = function (req, res) {
    //no need to sign in if the user if already signed in
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
    return res.render("user_sign_in", {
        title: "Codeial | Sign In",
    });
};

// get the sign up data
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect("back");
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log("error in finding user in signing up");
            return;
        }

        if (!user) {//user does not exist ,creating a new user
            User.create(req.body, function (err, user) {
                if (err) {
                    console.log("error in creating user while signing up");
                    return;
                }

                return res.redirect("/users/sign-in");
            });
        } else {
            console.log(`User ${req.body.email} already exists`);
            return res.redirect("back");
        }
    });
};

//sign out action or destroy session
module.exports.signOut = function(req, res){
    req.logout();
    req.flash('success', 'You are logged out!');
    return res.redirect('/');
}
// sign in and create a session for the user
module.exports.createSession = function (req, res) {
    req.flash('success', 'Logged In Successfully');
    return res.redirect("/");
};
