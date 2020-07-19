{
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type:'post',
                url:'/posts/create',
                data:newPostForm.serialize(),
                success: function(data){
                    console.log(`Form data ${data}`);
                },
                error: function(err){
                    console.log(err.responseText);
                }
            })
        });
    }
    
    createPost();
}