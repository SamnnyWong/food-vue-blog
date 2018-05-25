(function () {
    "use strict";

    /**
     * Created by sam on 2018-01-25.
     */

    window.addEventListener('load', function () {

        //+ post image and + post comment, seperate from onClickListner
        //
        // document.getElementById("target").addEventListener('click', function () {
        //     var comment_author = document.getElementById("comment_author").innerHTML;
        //     var comment_content = document.getElementById("comment_content").innerHTML;
        //     var currentId = api.getCurrentID();
        //     if (currentId == ""){
        //         alert("Please add image before posting your comment.");
        //     }
        //     else{
        //         var commentObj = api.addComment(currentId, comment_author, comment_content);
        //         postComments(commentObj.author, commentObj.content, commentObj.createDate, commentObj.cid);
        //     }
        //     reset_submit_comment();
        // });

        var urlParams = null;
        (window.onpopstate = function () {
            var match,
                pl     = /\+/g,  // Regex for replacing addition symbol with a space
                search = /([^&=]+)=?([^&]*)/g,
                decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
                query  = window.location.search.substring(1);

            urlParams = {};
            while (match = search.exec(query))
                urlParams[decode(match[1])] = decode(match[2]);
        })();
        console.log(urlParams.id);

        api.getBlogContent(urlParams.id, function (err, result){
            if (err) console.log(err);
            else{
                var res_blog_content = result.res_blog_content;
                // console.log(res_blog_content[0]);
                // console.log(res_blog_content[0].blogtitle);
                // console.log(res_blog_content[0].blogcontent);
                var blog = res_blog_content[0];
                // var last_index = res_obj.length-1;
                // var blogcontent = res_obj[last_index].blogcontent;
                // var blogtitle = res_obj[last_index].blogtitle;
                document.getElementById("target_title").innerHTML = blog.blogtitle;
                document.getElementById("target").innerHTML = blog.blogcontent;
            }
        });


    });




    //outter functinon here

}());






