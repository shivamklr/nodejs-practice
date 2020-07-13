const Post = require("../models/post");
module.exports.addPost = function (req, res) {
    Post.create(
        {
            content: req.body.content,
            user: req.user._id,
        },
        function (err, post) {
            if (err) {
                console.log(`While saving post to the db error:${err}`);
                return;
            }
            return res.redirect("back");
        }
    );
}
