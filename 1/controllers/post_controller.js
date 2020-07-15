const Post = require("../models/post");
const Comment = require('../models/comment');
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
//remove a post from db
module.exports.destroy = function(req, res){
    Post.findById(req.params.id, function(err, post) {
        // .id means converting the object id into string
        if(!post){
            console.log('Something went wrong');
            return res.redirect('back');
        }
        if(post.user == req.user.id){
            post.remove();
            // after deleting post we need to delete the comments of the post 
            Comment.deleteMany({post: req.params.id}, function(err){
                console.log(`${err}`);
                return res.redirect('back');
            });
        }
        else return res.redirect('back');
    });
}
