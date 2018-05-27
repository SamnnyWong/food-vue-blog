<template>
  <div id="app">
    <div class="columns">
      <div class="column is-narrow is-desktop" style="min-width: 380px;">
        <!-- dekstop menu -->
        <div id="fixed_menu">
          <aside class="menu">
            <ul class="menu-list">
              <router-link to="/"><li><a style="font-size: 50px" class="title">Sam's Food Blog</a></li></router-link>
              <!-- hide desktop menu when mobile -->
              <div class="is-hidden-mobile">
                <router-link to="/restaurants"><li><a class="subtitle">Food Blog Archive</a></li></router-link>
                <router-link to="/dev-blog"><li><a class="subtitle">Dev Blog Archive</a></li></router-link>
                <router-link to="/about-me"><li><a class="subtitle">About Me</a></li></router-link>
                <router-link to="/contact"><li><a class="subtitle">Contact</a></li></router-link>
              </div>
            </ul>
          </aside>
          <!-- mobile collapsable menu -->
          <a role="button" class="navbar-burger is-hidden-tablet center"
             aria-label="menu"
             data-target="navMenu"
             @click="isBurgerExpanded=!isBurgerExpanded"
             v-bind:class="{ 'is-active': isBurgerExpanded }">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
          <div class="navbar-menu is-hidden-tablet" id="navMenu" v-bind:class="{ 'is-active': isBurgerExpanded }" @click="isBurgerExpanded=!isBurgerExpanded">
            <div class="navbar-end">
              <div class="navbar-item">
                <router-link to="/restaurants"><a class="subtitle">Restaurants</a></router-link>
              </div>
              <div class="navbar-item">
                <router-link to="/dev-blog"><a class="subtitle">Dev Blog</a></router-link>
              </div>
              <div class="navbar-item">
                <router-link to="/about-me"><a class="subtitle">About Me</a></router-link>
              </div>
              <div class="navbar-item">
                <router-link to="/contact"><a class="subtitle">Contact</a></router-link>
              </div>
            </div>
          </div>
          <br />
          <img src='http://sammy-food-blog.herokuapp.com/api/getIcon/icon.jpg' alt='Avatar' width="20%" style="border-radius: 50%">
          <br />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
          <div class="grid-container">
            <a href="https://www.facebook.com/samnny.won"><i class="fa fa-facebook grid-item"></i></a>
            <a href="https://www.linkedin.com/in/sam-wong-757560141/"> <i class="fa fa-linkedin grid-item"></i></a>
            <a href="https://www.youtube.com/channel/UCQJvlb1fvnYJbAkYhLdugyg" ><i class="fa fa-youtube grid-item"></i></a>
            <a href="https://www.instagram.com/samnnny/" ><i class="fa fa-instagram grid-item"></i></a>
          </div>
        </div>
      </div>
      <!-- column for content -->
      <div class="column">
        <div><router-view/></div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      isBurgerExpanded: false
    }
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
  }
  #fixed_menu {
    position: fixed;
    /*margin-top: 30px;*/
    width: 380px;
  }
  .column {
    margin-right: 50px;
    margin-top: 50px;
    margin-left: 50px;
    /*width: 90%;*/
  }
  .center {
    margin: auto;
  }
  @media screen and (max-width: 768px) {
    #fixed_menu {
      position: relative;
      width: auto;
    }
    .column {
      margin-right: 5px;
      margin-top: 5px;
      margin-left: 5px;
    }
  }
  .grid-container {
    display: inline-grid;;
    grid-template-columns: auto auto auto auto;
    alignment: center;
  }

  .grid-item {
    background-color: rgba(255, 255, 255, 0.8);
  }

  .fa {
    padding: 12px;
    font-size: 60px;
    width: 40px;
    text-align: center;
    text-decoration: none;
    margin: 5px 2px;
    border-radius: 50%;
    color: black;
  }
  .fa-facebook:hover {
    background: #3B5998;
    color: white;
  }

  .fa-linkedin:hover {
    background: #007bb5;
    color: white;
  }

  .fa-youtube:hover {
    background: #bb0000;
    color: white;
  }

  .fa-instagram:hover {
    background-image: url('./media/ig_bg.png');
    /*background: #125688;*/
    color: white;
  }

</style>
