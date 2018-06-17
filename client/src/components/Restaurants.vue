<template>
  <div>

    <loading-screen v-if="isLoading"></loading-screen>
    <!--<Spinner name="ball-scale-ripple" color="#f77d7b"/>-->
    <stack :column-min-width="320" :gutter-width="8" :gutter-height="8" monitor-images-loaded>
      <stack-item v-for="(post, i) in posts" :key="i" style="transition: left 300ms, top 300ms">
        <router-link :to="{ name: 'BlogContent', params: {blogId: post.bcid} }">

          <figure class="snip1572">
            <img :src="`http://localhost:3000/api/resizeThumbnail/` + post.thumbnail" />

            <!--<img :src="`http://sammy-food-blog.herokuapp.com/api/getImage/` + post.thumbnail" />-->
            <figcaption>
              <h3>{{ post.blogtitle }}</h3>
            </figcaption>
          </figure>
        </router-link>
      </stack-item>
    </stack>
  </div>
</template>

<script>
import { Stack, StackItem } from 'vue-stack-grid'
import api from '@/services/api'
import Spinner from 'vue-spinkit'

// Vue.component('Spinner', Spinner)

export default {
  name: 'Restaurants',
  components: { Stack, StackItem, Spinner },
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
.snip1572 {
  font-family: 'Raleway', Arial, sans-serif;
  position: relative;
  display: inline-block;
  overflow: hidden;
  margin: 8px;
  min-width: 230px;
  max-width: 315px;
  width: 100%;
  color: #000000;
  text-align: left;
  font-size: 16px;
  /*background: #ffffff;*/
  background: #700877;
  background: -moz-linear-gradient(90deg, #700877 0%, #ff2759 100%, #ff2759 100%);
  background: -webkit-linear-gradient(90deg, #700877 0%, #ff2759 100%, #ff2759 100%);
  background: linear-gradient(90deg, #700877 0%, #ff2759 100%, #ff2759 100%);
}

.snip1572 *,
.snip1572:before,
.snip1572:after {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all 0.4s ease;
  transition: all 0.4s ease;
}

.snip1572 img {
  max-width: 100%;
  backface-visibility: hidden;
  vertical-align: top;
}

.snip1572:before,
.snip1572:after {
  content: '';
  background-color: #fff;
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  opacity: 0;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.snip1572:before {
  width: 300px;
  height: 2px;
}

.snip1572:after {
  height: 300px;
  width: 2px;
}

.snip1572 figcaption {
  text-decoration-color: white;
  position: absolute;
  left: 0;
  bottom: 0;
}

.snip1572 h3 {
  color: #fff;
  font-weight: 400;
  padding: 8px 15px;
  margin: 0;
  opacity: 0;
  -webkit-transform: translateY(100%);
  transform: translateY(100%);
}

.snip1572 a {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
}

.snip1572:hover img,
.snip1572.hover img {
  zoom: 1;
  filter: alpha(opacity=25);
  -webkit-opacity: 0.25;
  opacity: 0.25;
}

.snip1572:hover:before,
.snip1572.hover:before,
.snip1572:hover:after,
.snip1572.hover:after {
  opacity: 1;
}

.snip1572:hover:before,
.snip1572.hover:before {
  width: 50px;
}

.snip1572:hover:after,
.snip1572.hover:after {
  height: 50px;
}

.snip1572:hover h3,
.snip1572.hover h3 {
  -webkit-transform: translateY(0%);
  transform: translateY(0%);
  opacity: 1;
}

</style>
