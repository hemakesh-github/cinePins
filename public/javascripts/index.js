const cmtForm = document.querySelector('.cmt-form')
if (cmtForm != null){
    cmtForm.addEventListener('submit', function(evt) {
        let comment = document.querySelector(".comment-btn");
        evt.preventDefault();
        let post_id = comment.attributes.value.value;
        let formData = new FormData(this);
        console.log(formData.get("comment"));
        fetch("/addComment",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                comment: formData.get("comment"),
                postId: post_id
            })
        }).then((res) => {
            if (res.status === 401){
                alert("Please login to comment");
            }
            else{
                window.location.reload(); 
            }
            
        }).catch((err) => {
            console.log(err);
        })
    })  
}

const postLikeBtn = document.querySelector(".post-like-btn");
if (postLikeBtn != null){
    postLikeBtn.addEventListener('click', function() {
        console.log("post")
        fetch("/likePost", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                postId: postLikeBtn.attributes.value.value
            })
        }).then((res) => {
            console.log(res.status)
            if (res.status === 401){
                alert("Please login to like");
            }
            else{
                window.location.reload(); 
            }
        }).catch((err) => {
            console.log(err);
        })
    })
}



const cmtLikeBtns = document.querySelectorAll(".like-cmt-btn");
if (cmtLikeBtns != null){
    cmtLikeBtns.forEach(cmtLikeBtn => {
        cmtLikeBtn.addEventListener('click', function() {
            console.log("hello")
            
            fetch("/likeComment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    commentId: cmtLikeBtn.attributes.value.value
                })
            }).then((res) => {
                if (res.status === 401){
                    alert("Please login to like");
                }
                else{
                    window.location.reload(); 
                }
            }).catch((err) => {
                console.log(err);
            })
        
        })
    });
}


const cmtDislikeBtns = document.querySelectorAll(".dislike-cmt-btn");
if (cmtDislikeBtns != null){
    cmtDislikeBtns.forEach(cmtDisLikeBtn => {
        console.log(cmtDisLikeBtn.attributes.value.value);
        cmtDisLikeBtn.addEventListener('click', function() {
            fetch("/dislikeComment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    commentId: cmtDisLikeBtn.attributes.value.value
                })
            }).then((res) => {
                console.log(res.status)
                if (res.status === 401){
                    alert("Please login to like");
                }
                else{
                    window.location.reload(); 
                }
            }).catch((err) => {
                console.log(err);
            })
        })
    });
}



const postDisLikeBtn = document.querySelector(".post-dislike-btn");
if (postDisLikeBtn != null){
    postDisLikeBtn.addEventListener('click', function() {
        fetch("/dislikePost", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                postId: postDisLikeBtn.attributes.value.value
            })
        }).then((res) => {
            if (res.status === 401){
                alert("Please login to like");
            }
            else{
                window.location.reload(); 
            }
        }).catch((err) => {
            console.log(err);
        })
    });
}
console.log("jfadslk")