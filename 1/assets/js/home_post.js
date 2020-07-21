{
    // method to submit the form data for new post using AJAX
    let createPost = function () {
        let newPostForm = $("#new-post-form");
        newPostForm.submit(function (e) {
            e.preventDefault();
            $.ajax({
                type: "post",
                url: "/posts/create",
                data: newPostForm.serialize(),
                success: function (data) {
                    let newPost = newPostDom(data.data.post);
                    $("#posts-container>ul").prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                },
                error: function (err) {
                    console.log(err.responseText);
                },
            });
        });
    };
    
    //method to create a post in DOM
    let newPostDom = function (post) {
        return $(`<li id="post-${post._id}">

        
            <small><a class ="delete-post-button" href="/posts/destroy/${post._id}">X</a></small>

            <!-- post text -->
            ${post.content}
            <br>
            <!-- author of post -->
            <small>${post.user.name} </small>
        
            <!-- comment section for the post -->
            <div class="post-comments">
                
                    <form action="/comments/create" method="post">
                        <input name='content' type="text" placeholder="Type comment here" required/>
                        <input type="hidden" name="post" value='${post._id}'/>
                        <input type="submit" value="Add comment">
                    </form>
                
                <div class="post-comments-list">
                    <ul id="post-comments-${post.id}">
                            
                    </ul>
                </div>
            </div>
        </li>`);
    };
    //method to delete post from DOM
    let deletePost = function(deleteLink){
        ${deleteLink}.click(function(e)){
            e.preventDefault();
            
            $.ajax({
                type:'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $('#post-${data.data.post_id}').remove();
                },error: function(error){
                    console.log(error.responseText);
                    
                },
        });
        }
    }
    createPost();
}
