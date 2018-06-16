<template>
  <div class="content is-centered">
    <h1>Contact</h1>

    <div class="wrapper">

      <div class="parent">
        <h1 class="child">Transforming <br/> the latest experience</h1>

        <h1 class="child">The latest experience</h1>

        <!--<h1 class="child">Transforming</h1><h1 class="child">the lastest experience</h1>-->
      </div>
    </div>

    <h1>The Bruh</h1>
    <!--<router-link :to="{ name: 'BlogContent', params: {blogId: post.bcid} }">-->
      <!--<img :src="`http://sammy-food-blog.herokuapp.com/api/getImage800/` + post.thumbnail" />-->
    <!--</router-link>-->

  </div>
</template>

<script>
export default {

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .wrapper {
    display: flex;
    justify-content: center;
    text-align: left;
  }
  .parent {
    width: 550px;
    height: 343px;
    background-image: url(http://sammy-food-blog.herokuapp.com/api/getIcon/buddha.jpg);
    background-size: contain;
    background-repeat: no-repeat;
  }

  .child {
    display: table;
    position: relative;
    top: 40%;
    right: 35%;
    background-color: white;
  }
  .child:hover {
    background-color: black;
    color: white;
  }

</style>
