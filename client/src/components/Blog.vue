<template>
  <div>

    <!--<div style="margin: 50px" id="post_box">-->
      <!--&lt;!&ndash;<li v-for='(post, index) in posts.reverse()' :key='index'>&ndash;&gt;-->
      <!--<li v-for="(post, i) in posts" :key="i">-->

        <!--<router-link :to="{ name: 'BlogContent', params: {blogId: post.bcid} }">-->
          <!--<img :src="`http://sammy-food-blog.herokuapp.com/api/getImage800/` + post.thumbnail" />-->
        <!--</router-link>-->
        <!--&lt;!&ndash;<router-link :to="{ name: 'BlogContent', params: {blogId: post.bcid} }"><img :src="`http://localhost:3000/api/getImage/` + post.thumbnail" /></router-link>&ndash;&gt;-->
        <!--<br />-->

        <!--<router-link :to="{ name: 'BlogContent', params: {blogId: post.bcid} }">-->
          <!--<div style="font-size: 30px; font-weight: bold">{{ post.blogtitle }}</div>-->
        <!--</router-link>-->

      <!--</li>-->
    <!--</div>-->

    <div style="margin: 50px" id="post_box" class="grid-container">
      <li class="grid-item" v-for="(post, i) in posts" :key="i">
        <router-link :to="{ name: 'BlogContent', params: {blogId: post.bcid} }">
          <img :src="`http://sammy-food-blog.herokuapp.com/api/getImage800/` + post.thumbnail" />
        </router-link>
        <br />
        <router-link :to="{ name: 'BlogContent', params: {blogId: post.bcid} }">
          <div style="font-size: 30px; font-weight: bold">{{ post.blogtitle }}</div>
        </router-link>
        <div style="font-size: 15px; color: #ababab; float: right;">xxx minutes ago by Sam
          <div class="dropup">
            <button class="dropbtn">↗</button>
            <div class="dropup-content">
              <a href="https://www.facebook.com/samnny.won"><i class="fa fa-facebook"></i></a>
              <a href="https://www.facebook.com/samnny.won"><i class="fa fa-twitter"></i></a>
              <a href="https://www.facebook.com/samnny.won"><i class="fa fa-wechat"></i></a>
              <a href="https://www.facebook.com/samnny.won"><i class="fa fa-weibo"></i></a>
            </div>
          </div>
        </div>
      </li>
    </div>

    <!--<nav class="level is-mobile">-->
      <!--<div class="level-item has-text-centered">-->
        <!--<div>-->
          <!--<p class="heading">Tweets</p>-->
          <!--<p class="title">3,456</p>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="level-item has-text-centered">-->
        <!--<div>-->
          <!--<p class="heading">Following</p>-->
          <!--<p class="title">123</p>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="level-item has-text-centered">-->
        <!--<div>-->
          <!--<p class="heading">Followers</p>-->
          <!--<p class="title">456K</p>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="level-item has-text-centered">-->
        <!--<div>-->
          <!--<p class="heading">Likes</p>-->
          <!--<p class="title">789</p>-->
        <!--</div>-->
      <!--</div>-->
    <!--</nav>-->
  </div>
</template>

<script>
import api from '@/services/api'

export default {
  name: 'blog',
  data () {
    return {
      imageBaseUrl: '/static/uploads/',
      posts: []
    }
  },
  created: function () {
    this.getStuff()
  },
  methods: {
    async getStuff () {
      await api().get('/api/getBlogLog/')
        .then((response) => {
          this.posts = response.data.res_blogs
          this.posts.reverse()
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .dropbtn {
    padding: 8px;
    font-size: 16px;
    border: none;
    color: #ababab;

  }
  .dropup {
    position: relative;
    display: inline-block;
  }

  .dropup-content {
    display: none;
    position: absolute;
    background-color: #414347;
    bottom: 32px;
    z-index: 1;
  }

  .dropup-content a:hover {
    /*background-color: #ccc;*/
    color: white
  }

  .dropup:hover .dropup-content {
    display: block;
  }

  .dropup:hover .dropbtn {
    color: #ffffff;
    background-color: #414347;
  }

  .grid-container {
    display: grid;
    grid-template-columns: auto;
  }
  .grid-item {
    font-size: 30px;
    text-align: center;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    padding: 10px;
  }
  .fa {
    padding-top: 2px;
    font-size: 15px;
    text-align: center;
    text-decoration: none;
    margin: 5px 5px;
    color: #ababab;
  }
  .fa-facebook:hover {
    color: white;
  }
  .fa-twitter:hover {
    color: white;
  }

  .fa-weibo:hover {
    color: white;
  }

  .fa-wechat:hover {
    color: white;
  }
</style>
