<template>
  <div class="content is-centered">
    <div class="parallax">
      <div class="parallax-curtain" align="left">
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .parallax {
    /*background-image: url("http://sammy-food-blog.herokuapp.com/api/getImage800/a2f2a907648fc84ad688b2e48eeda2431527235221671.jpeg");*/
    background-image: url("http://localhost:3000/api/getImage800/a2f2a907648fc84ad688b2e48eeda2431527235221671.jpeg");
    height: 100%;
    /* Create the parallax scrolling effect */
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    /*following just for demo purposes to add height and top padding*/
    height:300vh;
    padding-top:100vh;

  }
  .parallax-curtain{
    height:140vh;
    background:rgba(0,0,0,0.7);
    color: white;
    font-family: Helvetica;
    font-size: 120px;
    font-weight: bold;
  }
</style>
