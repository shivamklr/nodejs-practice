const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.addComment = function (req, res) {
    Post.findById(req.body.post, function(err, post){
        if(err){
            console.log(`Error while finding post :${err}`);
        }
        //post found in Post collection
        if(post){
            //create comment
            Comment.create({
                content : req.body.content,
                user : req.user._id,
                post : req.body.post
            }, function(err, comment){
                if(err){
                    console.log(`Error while creating comment:${err}`);
                    return;
                }

                //automatically fetch the id of comment
                //and push it to comments array
                post.comments.push(comment);

                //after change in the db, we have to call this
                post.save();
                return res.redirect('/');
            });
        }
    })
};
module.exports.destroy = function(req, res){
    Comment.findById(req.params.id, function(err, comment){

        if(comment.user == req.user.id){
            
            let postId = comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}}, function(err, post){
                if(err){
                    console.log(`${err}`);
                    return;
                }
                console.log(`Removed comment from post.comments`);
                return res.redirect('back');
            });
            
        }
        else{
            return res.redirect('back');
        }
    });
}
