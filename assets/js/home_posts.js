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
                    req.flash('success', 'Post publised!');
                    deletePost($(' .delete-post-button', newPost));
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
                        <a class="delete-post-button" href="/posts/destroy/${ post._id }">x</a>
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

    //method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
            type:'get',
            url:$(deleteLink).prop('href'),
            success: function(data){
                $(`#post-${data.data.post_id}`).remove()
            },
            error: function(error){
                console.log(error.responseText)
            }
        })

        })  
        
    } 

    createPost();
    // $('.delete-post-button').each(function() {
    //     deletePost(this);
    //   });
}