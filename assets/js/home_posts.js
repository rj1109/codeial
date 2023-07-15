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
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    console.log(data);
                },
                error: function(error){
                    console.log(error);
                }
            })
            
        })
    }

    //method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
                    <p>
                        <a class="delete-post-button" href="/posts/destroy/${ post.id }">x</a>
                        ${post.content}
                        <br>
                        <small>
                        ${ post.user.name }
                        </small>
                    </p>
                    
                    <div class="post-comments">
                            <form action="/comments/create"  method="post" >
                                <input type="text" name="content" placeholder="Type Here to comment" required>
                                <input type="hidden" name="post" value="${ post._id }">
                                <input type="submit" value="Add Comment">
                            </form>
                
                        <div class="post-comments-list">
                            <ul id="post-comments-${ post._id}">
                            </ul>
                        </div>
                    </div>
                </li>`)
    }

    createPost();
}