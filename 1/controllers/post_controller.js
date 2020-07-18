const Post = require("../models/post");
const Comment = require("../models/comment");
module.exports.addPost = async function (req, res) {
    try {
        await Post.create({
            content: req.body.content,
            user: req.user._id,
        });
        return res.redirect("back");
    } catch (err) {
        console.log(`Error ${err}`);
        return;
    }
};
//remove a post from db
module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);
        if (!post) {
            console.log("Something went wrong");
            return res.redirect("back");
        }
        if (post.user == req.user.id) {
            post.remove();
            // after deleting post we need to delete the comments of the post
            await Comment.deleteMany({ post: req.params.id });
            return res.redirect("back");
        } else return res.redirect("back");
    } catch (err) {
        console.log(`Error ${err}`);
    }
};
