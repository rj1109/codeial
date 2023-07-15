{
    //method to submit form data for new post using ajax
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                url:'/posts/create',
                method:'post',
                data:newPostForm.serialize(), // convert form data into json object where content will be key and value is data
                success:function(data){
                    console.log(data);
                },
                error: function(error){
                    console.log(error);
                }
            })
            
        })
    }

    //method to create a post in DOM

    createPost();
}