# vue-blog
- to run client: npm start then go to localhost:8080
- to run server: nodemon app.js
- 添加blog的话去localhost:8080/addblog，按postblog之前检查好title subtitle 和thumbnail upload了没，少了一个都会炸
- 要连接本地mongo的话 把server/app.js 里面 mongoose.connect(molaburl) 的 molaburl 改成 mongourl就ok了, 跑之前别忘记开mongod.