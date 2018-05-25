(function () {
    "use strict";

    /**
     * Created by sam on 2018-01-25.
     */

    window.addEventListener('load', function () {

        // document.getElementById("load_more").addEventListener('click', function () {
        //     var testObj = null;
        //     api.getPics(function (err, result) {
        //         if (err) console.log(err);
        //         else testObj = result.test;
        //         loadgallery(testObj);
        //     });
        //
        // });


        // var testObj = null;
        // api.getPics(function (err, result) {
        //     if (err) console.log(err);
        //     else testObj = result;
        //     loadgallery(testObj);
        // });

        api.getBlogLog(function (err, result){
            console.log("!!!!!!!!!!!!!!!!!!");
            if (err) console.log(err);
            else{
                // console.log(result.res_blogs);
                // console.log(result.res_blogs[0]);
                // console.log(result.res_blogs[0].thumbnail);
                // loadgallery(result.res_blogs);
                loadThumbnail(result.res_blogs); //^^ load 5 or 6 here.
            }
        });
    });

    function loadThumbnail(test) {
        for (var i = 0; i < test.length; i++) {
            var temp = test[i]; //result.res_blogs[0].thumbnail;
            var temp_thumbnail = temp.thumbnail;
            var temp_htmlfile = temp.htmlfile;
            var temp_description = temp.description;
            var temp_blogtitle = temp.blogtitle;
            var temp_bcid = temp.bcid;
            console.log(temp_bcid); // get the bcid here, send it in the
            // api.getBlogConten
            var x = document.createElement("IMG");
            x.setAttribute("src", `./uploads/${temp_thumbnail}`);
            x.setAttribute("width", "1000px");
            x.setAttribute("id", temp_bcid);

            var link = document.createElement("a");
            link.setAttribute("href",`../blogreder.html?id=${temp_bcid}`);
            // link.setAttribute("content",x);
            link.innerHTML = x.outerHTML;
            document.getElementById("img_box").prepend(link);
        }


    };

}());






