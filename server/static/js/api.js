var api = (function(){
    var module = {};
    
    /*  ******* Data types *******
        image objects must have at least the following attributes:
            - (String) _id 
            - (String) title
            - (String) author
            - (Date) date
    
        comment objects must have the following attributes
            - (String) _id
            - (String) imageId
            - (String) author
            - (String) content
            - (Date) date

     ****************************** */

    function send(method, url, data, callback){
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (xhr.status !== 200) return callback("[" + xhr.status + "]" + xhr.responseText, null);
            return callback(null, JSON.parse(xhr.responseText));
        };
        xhr.open(method, url, true);
        if (!data) xhr.send();
        else{
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data));
        }
    }

    module.postImage = function(img_file, callback){
        send("POST", "/api/postImage/", img_file, callback);
    }

    module.getPics = function(callback){
        send("GET", "/api/getPics/", null,  callback);
    }


    module.getBlogContent = function(bcid, callback){
        send("GET", "/api/blogContent/" + bcid + "/", null,  callback);
    }

    module.postBlog = function(data ,callback){
        send("POST", "/api/postBlog/", data,  callback);
    }

    module.getBlogLog = function(callback){
        send("GET", "/api/getBlogLog/", null,  callback);
    }

    module.getCurrentUser = function(callback){
        send("GET", "/api/getCurrentUser/", null,  callback);
    }

    module.signin = function (username, password, callback){
        send("POST", "/signin/", {req_username: username, req_pwd: password}, callback);
    }

    return module;
})();