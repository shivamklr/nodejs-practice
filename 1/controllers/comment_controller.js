const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.addComment = async function (req, res) {
    try {
        let post = await Post.findById(req.body.post);
        //post found in Post collection
        if (post) {
            //create comment
            let comment = await Comment.create({
                content: req.body.content,
                user: req.user._id,
                post: req.body.post,
            });

            //automatically fetch the id of comment
            //and push it to comments array
            post.comments.push(comment);

            //after change in the db, we have to call this
            post.save();
            req.flash('success', 'Comment added');
            return res.redirect("back");
        }
    } catch (err) {
        req.flash('error', err);
            return res.redirect("back");
    }
};
module.exports.destroy = async function (req, res) {
    try {
        let comment = await Comment.findById(req.params.id);
        if (comment.user == req.user.id) {
            let postId = comment.post;
            comment.remove();
            let post = await Post.findByIdAndUpdate(postId, {
                $pull: { comments: req.params.id },
            });
            console.log(`Removed comment from post.comments`);
            req.flash('success', 'Comment Removed');
            return res.redirect("back");
        } else {
            req.flash('error', 'You cannot remove the comment');
            return res.redirect("back");
        }
    }catch(err){
        req.flash('error', err);
        return res.redirect("back");
    }
};
