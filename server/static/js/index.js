(function () {
    "use strict";

    /**
     * Created by sam on 2018-01-25.
     */

    window.addEventListener('load', function () {

        document.getElementById("prev_button").addEventListener('click', function () {


            var currentId = api.getCurrentID();
            var imageObj = api.getPrevImageObj(currentId);
            if (!imageObj){
                alert("this is the 1st image")
            }
            else{
                var image_comment = api.get_image_comments(imageObj.id);
                api.setCurrentID(imageObj.id);
                set_ui(imageObj);
                reset_comment();
                for (var cid in image_comment) {
                    var commentObj = image_comment[cid];
                    postComments(commentObj.author, commentObj.content, commentObj.createDate, commentObj.cid)
                }

            }
        });

        document.getElementById("next_button").addEventListener('click', function () {
            var currentId = api.getCurrentID();
            var imageObj = api.getNextImageObj(currentId);
            if (!imageObj){
                alert("this is the last image")
            }
            else{
                var image_comment = api.get_image_comments(imageObj.id);
                api.setCurrentID(imageObj.id);
                set_ui(imageObj);
                reset_comment();
                for (var cid in image_comment) {
                    var commentObj = image_comment[cid];
                    postComments(commentObj.author, commentObj.content, commentObj.createDate, commentObj.cid)
                }

            }
        });


        //+ post image and + post comment, seperate from onClickListner

        document.getElementById("btn_submit_comment").addEventListener('click', function () {
            var comment_author = document.getElementById("comment_author").innerHTML;
            var comment_content = document.getElementById("comment_content").innerHTML;
            var currentId = api.getCurrentID();
            if (currentId == ""){
                alert("Please add image before posting your comment.");
            }
            else{
                var commentObj = api.addComment(currentId, comment_author, comment_content);
                postComments(commentObj.author, commentObj.content, commentObj.createDate, commentObj.cid);
            }
            reset_submit_comment();
        });




    });


    function postComments(commentAuthor, commentContent, commentCreateDate, comment_id){
        var elmt = document.createElement('div');
        elmt.className = "message";
        elmt.innerHTML =
            `<div class = "container">
                    <div class="comment_container">
                        <div class="comment">
                            <div class="comment_item author">${commentAuthor}</div>
                            <div class="comment_item content">${commentContent}</div>
                            <div class="comment_item date">${commentCreateDate}</div>
                        </div>
                    </div>
                </div>`;
        document.getElementById("comments").prepend(elmt);



    };



}());






