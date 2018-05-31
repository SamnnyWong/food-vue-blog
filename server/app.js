const path = require('path');
const crypto = require('crypto');
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const cookie = require('cookie');
var mime = require('mime-types');
const http = require('http');
const resize = require('./resize');

var username = "1";
var pwd = "1";

var mongoose = require('mongoose');
var molaburl = "mongodb://poppy:pop@ds117540.mlab.com:17540/blog";
var mongourl = "mongodb://localhost:27017/blog";

var BlogLogSchema = mongoose.Schema({
    blogtitle: String,
    thumbnail: String,
    subtitle: String,
    bcid: String
});

var BlogContentSchema = mongoose.Schema({
    _id: String,
    blogtitle: String,
    blogcontent: String,
});

mongoose.connect(molaburl);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function (callback) {
    console.log("Connection Succeeded");
});

// below is db
var BlogLog = mongoose.model("blog_log", BlogLogSchema);
var BlogContent = mongoose.model("blog_content", BlogContentSchema);


app.use(express.static('static'));
app.use('/scripts', express.static(path.join(__dirname, 'node_modules')));



app.use(function (req, res, next){
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});



app.use(bodyParser.json());
app.use(function (req, res, next) {
    console.log("HTTP request", req.method, req.url, req.body);
    next();
});

var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '/static/uploads/'))
        // cb(null, "localhost:" + process.env.PORT + '/static/uploads/')
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
        });
    }
});
var upload = multer({storage: storage});

function guid() {
    return 'xxxxxxxx-xxxx-4xxx-ysxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

app.get('/api/getImage800/:imageId/', (req, res) => {

    // const widthString = req.query.width;
    // const heightString = req.query.height;
    // const format = req.query.format;
    // let width, height;
    // if (widthString) {
    //     width = parseInt(widthString);
    // }
    // if (heightString) {
    //     height = parseInt(heightString);
    // }

    console.log(req.params.imageId);
    const width = 800;
    const format = 'png';
    res.type(`image/${format || 'png'}`);
    resize(path.join(__dirname,'/static/uploads/', req.params.imageId), format, width).pipe(res);
});


// http://localhost:8000?format=png&width=200&height=200
app.get('/api/resizeThumbnail/:imageId/', (req, res) => {

    // const widthString = req.query.width;
    // const heightString = req.query.height;
    // const format = req.query.format;
    // let width, height;
    // if (widthString) {
    //     width = parseInt(widthString);
    // }
    // if (heightString) {
    //     height = parseInt(heightString);
    // }

    console.log(req.params.imageId);
    const width = 400;
    const format = 'png';
    res.type(`image/${format || 'png'}`);
    resize(path.join(__dirname,'/static/uploads/', req.params.imageId), format, width).pipe(res);
});

app.get('/api/getPics/', function (req, res, next) {
    var test = [1];
    return res.json(test);
});

app.get('/api/getImage/:imageId/', function (req, res) {
    console.log(req.params.imageId);
    res.sendFile(path.join(__dirname,'/static/uploads/', req.params.imageId));
});

app.get('/api/getIcon/:imageId/', function (req, res) {
    console.log(req.params.imageId);
    res.sendFile(path.join(__dirname,'/static/media/', req.params.imageId));
});

// res.send({hello: __dirname}); ///Users/sam/Documents/heroku/vue-blog/server
app.get('/api/getBlogLog/', function (req, res, next) {
    BlogLog.find({}, function (error, blogs) {
        if (error) {
            console.error(error);
        }
        res.send({
            res_blogs: blogs //access by result.res_blogs
        })
    })
});

app.get('/api/blogContent/', function (req, res, next) {
    BlogContent.find({_id: req.query.bcid}, function (error, blog_content) {
        if (error) {
            console.error(error);
        }
        res.send({
            res_blog_content: blog_content //access by result.res_blog_content
        })
    })
});

app.post('/api/postBlog/', function (req, res, next) {
    var blog_title = req.body.req_blog_title;
    var thumbnail = req.body.req_thumbnail;
    var blog_content = req.body.req_blog_content;
    var subtitle = req.body.req_subtitle;

    var content_guid = guid();

    var new_blog_log = new BlogLog({
        blogtitle: blog_title,
        thumbnail: thumbnail, // this is the uploaded file name
        subtitle: subtitle,
        bcid: content_guid
    })

    var new_blog_content = new BlogContent({
        _id: content_guid,
        blogtitle: blog_title,
        blogcontent: blog_content,
    });

    new_blog_content.save(function (error) {
        console.log(new_blog_content);
        if (error) {
            console.log(error)
        }
    });
    new_blog_log.save(function (error) {
        console.log(new_blog_log);
        if (error) {
            console.log(error)
        }
    });
    res.send({
        success: true,
        message: 'New blog content saved successfully!'
    })
});


//###########################################################
// below is for quill use only
var receiveThumbnail = upload.single('thumbnail');
app.post('/api/postImage/', function (req, res, next) {

    receiveThumbnail(req, res, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            // var body = _.pick(req.body, ["name", "thumbnail"]);
            var uploaded_img = req.file.filename;
            res.send({"uploaded_image": uploaded_img});
        }
    })
})

//###########################################################
app.get('/api/thumbnail/', function (req, res, next) {
    // take in an image guid (generated by multer on upload), then return the image from the path: uploads/guid
    var guid = "2d7ea98a490c52f3979f123f72b1b528.jpg";
    // BlogLog.find({}, 'title description', function (error, result) {
    //     if (error) { console.error(error); }
    //     res.send({
    //         Blog: result
    //     })
    // })
    // __dirname: /Users/sam/Documents/cscc09/CSCC09/assignments/03/webgallery
    console.log(__dirname);
    // res.sendFile("2d7ea98a490c52f3979f123f72b1b528", {"root": path.join(__dirname, 'static/uploads')});
    res.render('image', {path: path.join(__dirname, 'static/uploads/2d7ea98a490c52f3979f123f72b1b528')});

// var upload = multer({ dest: path.join(__dirname, 'uploads')});

    // res.sendFile('./uploads/2d7ea98a490c52f3979f123f72b1b528', options, function (err) {
    //     if (err) {
    //         next(err);
    //     } else {
    //         console.log('Sent:', fileName);
    //
    //     }
    // });

});

app.get('/api/getCurrentUser/', function (req, res, next) {
    var sam = "sam in logged in!!!!!!";
    var nah = "sam is not logged in!!!!!!!!!";
    res.send({user: null});
});

app.post('/signin/', function (req, res, next) {
    //
    // var username = req.body.req_username;
    // var password = req.body.req_pwd;
    if (username == req.body.req_username && pwd == req.body.req_pwd) {
        return res.json("Sam is here!!!!!");
    }
    else {
        return res.status(401).end("access denied");
    }
});

const PORT = 3000;
http.createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});

