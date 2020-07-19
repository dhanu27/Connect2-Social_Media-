{
    console.log("Hello");
    let Notification=function(text,type){
        new Noty({
            theme: 'relax',
            text: text,
            type: type,
            layout: 'topRight',
            timeout: 1500
            
        }).show(); 
    }
    let create_post=function(){
        let newPostForm =$('#post-form');
        newPostForm.submit(function(e){
              e.preventDefault();
              $.ajax({
                  type:"post",
                  url:'/posts/create-post',
                  data:newPostForm.serialize(),
                  success:function(data){
                      console.log(data);
                     let newPost=newPostDOM(data.data.post);
                     $("#post-list-container").prepend(newPost);
                     Notification(data.message,"success");
                     deletePost($(".deletePost-bttn",newPost));
                  },error:function(err){
                     console.log("error",err);
                     Notification(err,"error");
                  }
              })
        });
        
        // method to create a post in a dom
        let newPostDOM=function(post){
            return $(`<div class="post-container" id="post-${post._id}">
                        <div class="post-detail"> 
                        ${post.user.name}
                           
                            <a class="deletePost-bttn" href="/posts/destroy/${post._id}">X</a>
                        </div> 
                        <div class="post-content"> 
                        ${post.content}
                        </div>
                            <div class="post-options">   
                            <form action="/comment/create-comment" method="POST" class="comment-form">
                            <input type="text"  placeholder="Add Comment"name="content">
                            <input type="hidden" name="postId" value="${post._id}">
                            <button type="submit" >Add Comment</button>
                            </form> 
                            </div>  
                    </div> `);
        }

      let deletePost =function(deletelink){
         $(deletelink).click(function(e){
             e.preventDefault();
             $.ajax({
                 type:"get",
                 url:$(deletelink).prop('href'),
                 success:function(data){
                     $(`#post-${data.data.post_id}`).remove();
                     Notification(data.message,"success");
                 },error:function(error){
                     console.log(error);
                     Notification(error,"success");
                 }
             });
         });
      }
       let bttn= $(" .deletePost-bttn");
             for(let j=0; j<bttn.length; j++){
                 deletePost(bttn[j]);
              }
       let commentbttn=$(".comment-form");
       for(let i=0; i<commentbttn.length; i++){
        $(commentbttn[i]).submit(function(event){
                    event.preventDefault();
                    $.ajax({
                        type:"post",
                        url:'/comment/create-comment',
                        data:$(commentbttn[i]).serialize(),
                        success:function(data){
                            let newComment=newcommentDOM(data.data.comment);
                            $(`#comment-list-container-${data.data.comment.post}`).prepend(newComment);
                            Notification(data.message,"success");
                            deleteComment($(".comment-delete-bttn",newComment));
                        },error:function(err){
                        console.log("error",err);
                        Notification(err,"error");
                        }
                    })
            });
       }
       
       let newcommentDOM =function(comment){
           console.log(comment);
              return $(`<div class="comment-container" id="comment-${comment._id}">
              <div class="detail">${comment.user.name}
               <div><a class="comment-delete-bttn"  href="/comment/destroy/${comment._id}">X</a></div>  
              </div>
               <div class="content">${comment.content}</div>
             </div>`);   
       }



       let deleteComment =function(deletelink){
       $(deletelink).click(function(e){
           e.preventDefault();
        //    console.log("Link",$(deletelink).prop('href'));
           $.ajax({
               type:"get",
               url:$(deletelink).prop('href'),
               success:function(data){
                   console.log(data);
                   $(`#comment-${data.data.comment_id}`).remove();
                   Notification(data.message,"success");
               },error:function(error){
                   Notification(error,"error");
               }
           });
       });
    }
            let CommentDeletebttn= $(".comment-delete-bttn");
            console.log(CommentDeletebttn);
           for(let j=0; j<CommentDeletebttn.length; j++){
              deleteComment(CommentDeletebttn[j]);
            }
   }
   create_post(); 
}
