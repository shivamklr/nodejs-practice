const Post = require("../models/post");
const Comment = require("../models/comment");
module.exports.addPost = async function (req, res) {
    try {
        await Post.create({
            content: req.body.content,
            user: req.user._id,
        });
        req.flash('success','Post Published !');
        return res.redirect("back");
    } catch (err) {
        req.flash('error', err);
        return res.redirect("back");
    }
};
//remove a post from db
module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id) {
            post.remove();
            // after deleting post we need to delete the comments of the post
            await Comment.deleteMany({ post: req.params.id });
            req.flash('success','Post and linked comments deleted');
            return res.redirect("back");
        } else {
            req.flash('error','Post cannot be Deleted');   
            return res.redirect("back");
        }
    } catch (err) {
        req.flash('error',err);
        return res.redirect('back');
    }
};
