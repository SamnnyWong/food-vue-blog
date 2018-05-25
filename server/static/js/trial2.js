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


        var testObj = null;
        api.getPics(function (err, result) {
            if (err) console.log(err);
            else testObj = result.test;
            loadgallery(testObj);
        });


        // When the user scrolls the page, execute myFunction
        window.onscroll = function () {
            myFunction()
        };

        // Get the navbar
        var navbar = document.getElementById("navbar");

        // Get the offset position of the navbar
        var sticky = navbar.offsetTop;

        // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
        function myFunction() {
            if (window.pageYOffset >= sticky) {
                navbar.classList.add("sticky")
            } else {
                navbar.classList.remove("sticky");
            }
        }

    });

    function loadgallery(test) {
        var elmt = document.createElement('div');
        var res = "";
        for (var i = 0; i < test.length; i++) {
            // console.log(test[i]);
            var temp = test[i];
            res = res + `
                 <a  href="../blog/sansotei.html"><img width="1100px" src="./media/sansotei/RAMEN.JPG"></img></a></br>
                 <img width="1100px" src="./media/sansotei/WING.JPG""></img></br>
                 <img width="1100px" src="./media/sansotei/DSC00595.JPG""></img>`;
            elmt.innerHTML =
                `<div>${temp}</div>`;


        }
        elmt.innerHTML = res;
        document.getElementById("img_box").prepend(elmt);
    };

}());






