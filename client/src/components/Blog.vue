<template>
  <div class="hello">
    <!--<div v-for="index in 1000">-->
    <!--<h1>{{ msg }} {{index}}</h1>-->
    <!--</div>-->
    <div id="post_box">
      <li v-for='(post, index) in posts.reverse()' :key='index'>
      <!--<li v-for="post in posts">-->
        <router-link :to="{ name: 'BlogContent', params: {blogId: post.bcid} }"><img :src="`http://localhost:3000/api/getImage/` + post.thumbnail" /></router-link>
        {{ post.title }}
        {{ post.bcid }}
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
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
  /*#post_box {*/
    /*margin-right: 50px;*/
    /*margin-top: 50px;*/
    /*margin-left: 50px;*/
    /*!*width: 90%;*!*/
  /*}*/
  /*@media screen and (max-width: 768px) {*/
    /*#post_box {*/
      /*margin-right: 5px;*/
      /*margin-top: 5px;*/
      /*margin-left: 5px;*/
    /*}*/
  /*}*/
</style>
