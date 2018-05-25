<template>

  <div class="layout-padding innerbox">
    <form style="border:1px solid #ccc; padding: 16px" v-on:submit.prevent="onSubmit">
      <!--<div class="container">-->
      <h3>Sign In</h3>
      <div id="status"></div>

      <label for="username"><b>Username</b></label>
      <input type="text" id="username" placeholder="Enter Username" name="username" v-model="username" required>

      <label for="password"><b>Password</b></label>
      <input type="password" id="password" placeholder="Enter Password" name="password" v-model="pwd" required>
      <label>
        <input type="checkbox" checked="checked" name="remember" style="margin-bottom:15px"> Remember me
      </label>
      <div class="clearfix">
        <button type="submit" @click="signin" class="signupbtn">Sign In</button>
      </div>
      <!--</div>-->
    </form>
  </div>
</template>

<script>
export default {
  name: 'SignIn',
  data () {
    return {
      username: '',
      pwd: ''
    }
  },
  methods: {
    signin () {
      if (!this.username & !this.pwd) alert('Please type in username and password.')
      else {
        this.$router.push({name: 'AddBlog'})
      }
      // await UsersServices.userSignin({username: this.username, password: this.password})
      //   .then(response => {
      //     console.log("here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
      //     console.log(response)
      //     console.log("here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
      //     this.$router.push({name: 'Home'})
      //   })
      //   .catch(error => {
      //     console.log(error)
      //     document.getElementById("status").innerHTML = error.response
      //   })
      // // user.then(
      // //   this.$router.push({name: 'Home'})
      // // )
    }
  }
}
</script>

<style scoped>
  .innerbox {
    max-width: 800px; /* or whatever width you want. */
    display: inline-block;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
  }

  * {
    box-sizing: border-box
  }

  /* Full-width input fields */
  input[type=text], input[type=password] {
    width: 100%;
    padding: 15px;
    margin: 5px 0 22px 0;
    display: inline-block;
    border: none;
    background: #f1f1f1;
  }

  input[type=text]:focus, input[type=password]:focus {
    background-color: #ddd;
    outline: none;
  }

  hr {
    border: 1px solid #f1f1f1;
    margin-bottom: 25px;
  }

  /* Set a style for all buttons */
  button {
    background-color: dodgerblue;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 100%;
    opacity: 0.9;
  }

  button:hover {
    opacity: 1;
  }

  /* Clear floats */
  .clearfix::after {
    content: "";
    clear: both;
    display: table;
  }

  /* Change styles for cancel button and signup button on extra small screens */
  @media screen and (max-width: 300px) {
    .signupbtn {
      width: 100%;
    }
  }
</style>
