(function () {
    "use strict";
    console.log("this is running!!!!!!!!!!!");

    window.addEventListener('load', function () {
        // when page onload, get the user from backend
        // if user exist, load the gallery
        // construct the api call to get the user
        // if user not exist, load the log in form
        // i need a log in form here

        //

        api.getCurrentUser(function (err, result) {
            if (!result.user) {
                load_login();
            }
            else {
                preload_editor();
                load_editor();
            }
        });

    });


}());


function load_login() {
    var elmt = document.createElement('div');
    elmt.innerHTML = `
           <span onclick="document.getElementById('id01').style.display='none'" class="close"
          title="Close Modal">&times;</span>
        <div class="container">
        <h1>Log In</h1>
        <p>Please log in to post new blog</p>
        <hr>
        <label for="email"><b>Email</b></label>
        <input type="text" placeholder="Enter Email" name="email" id="signin_username" required>

        <label for="pwd"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="pwd" id="signin_pwd" required>

        <label>
            <input type="checkbox" checked="checked" name="remember" style="margin-bottom:15px"> Remember me
        </label>
        <div class="clearfix">
            <button type="submit" class="signupbtn" id="sign_in">Log In</button>
        </div>
        
        <div style="color: red" id="login_status"></div> 
    </div>
        `;
    elmt.querySelector("#sign_in").addEventListener('click', function () {
        console.log(document.getElementById("signin_username").value);
        console.log(document.getElementById("signin_pwd").value);
        var signin_username = document.getElementById("signin_username").value;
        var signin_pwd = document.getElementById("signin_pwd").value;
        api.signin(signin_username, signin_pwd, function (err, res){
            if (err) {
                console.log(err);
                elmt.querySelector("#login_status").innerHTML = err;
            }
            else {
                console.log(res);
                document.getElementById("login_form").innerHTML = "";
                preload_editor();
                load_editor();

            }
        })
    });
    document.querySelector("#login_form").prepend(elmt);
}


function preload_editor() {
    var elmt = document.createElement('div');
    elmt.innerHTML = `
        <h1>Edit my blog</h1>
        <div style="width: 30%">
        <input type="text" id="blog_title" placeholder="Enter Blog Title"> </br>
        <input type="text" id="blog_subtitle" placeholder="Enter blog subtitle">
        </div>
        <div style="width: 70%">
        <div id="editor">
        <p>Hello World!</p>
        <p>Some initial <strong>bold</strong> text</p>
        <p><br></p>
        </div>
        <!--<form action="/api/postImage/" method="POST" enctype="multipart/form-data">-->
        <input type="file" name="thumbnail" id="thumbnail" accept="image/*">
        <button style="width: 180px" type="submit" class="btn btn-primary" id="upload_thumbnail">Upload Thumbnail</button>
        <div id="upload_thumbnail_status"></div>
        </br>
        <button style="width: 180px" type="button" class="btn btn-primary" id="quill_content">Post Blog</button>
        <div id="upload_blog_status"></div>
        </div>
        `;

    document.querySelector("#login_form").prepend(elmt);
}


function load_editor() {
    <!-- Initialize Quill editor -->
    var toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],             // custom button values
        // remove formatting button
        ['link', 'image'],
        [{'list': 'ordered'}, {'list': 'bullet'}],

        [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
        [{'header': [1, 2, 3, 4, 5, 6, false]}],

        [{'color': []}],          // dropdown with defaults from theme
        [{'font': []}]
    ];

    var quill = new Quill('#editor', {
        modules: {
            toolbar: toolbarOptions
        },
        placeholder: 'Compose an epic...',
        theme: 'snow'  // or 'bubble'
    });

    quill.getModule('toolbar').addHandler('image', () => {
        selectLocalImage();
    });

    document.getElementById("quill_content").addEventListener('click', function () {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!");
        var blog_title = document.getElementById("blog_title").value;
        var thumbnail = document.getElementById("upload_thumbnail_status").innerHTML;

        if (blog_title == "") {
            alert("Please input title!");
        }
        if (thumbnail == "") {
            alert("Please choose thumbnail first!!");
        }
        else {
            var blog_content = quill.container.firstChild.innerHTML;
            var subtitle = document.getElementById("blog_subtitle").value;
            api.postBlog({
                req_blog_title: blog_title,
                req_thumbnail: thumbnail,
                req_blog_content: blog_content,
                req_subtitle: subtitle
            }, function (err, res) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(res);
                    document.getElementById("upload_blog_status").innerHTML = res.message;

                }
            });
        }
    });

    document.getElementById("upload_thumbnail").addEventListener('click', function () {
        var thumbnail = document.getElementById("thumbnail").files[0];
        if (!thumbnail) {
            alert("Please choose an image first.");
        }
        if (/^image\//.test(thumbnail.type)) {
            var formData = new FormData();
            formData.append('thumbnail', thumbnail, thumbnail.name);
            fetch('/api/postImage/', {method: 'post', body: formData})
                .then(res => res.json())
                .then(res => {
                    document.getElementById("upload_thumbnail_status").innerHTML = res.uploaded_image;
                })

        } else {
            // console.warn('');
            alert("Upload image failed, please try again.")
        }
    });

    function selectLocalImage() {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.click();
        input.onchange = () => {
            const img_file = input.files[0];
            if (/^image\//.test(img_file.type)) {
                var formData = new FormData();
                formData.append('thumbnail', img_file, img_file.name);
                fetch('/api/postImage/', {method: 'post', body: formData})
                    .then(res => res.json())
                    .then(res => {
                        var res_img_name = res.uploaded_image;
                        console.log(res_img_name);
                        const range = quill.getSelection();
                        // console.log(__dirname);

                        quill.insertEmbed(range.index, 'image', `./uploads/${res_img_name}`);

                    })

            } else {
                // console.warn('');
                alert("You could only upload images.")
            }
        };
    }


}




















