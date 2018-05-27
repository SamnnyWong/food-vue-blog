<template>
  <div>
    <h1>Add my blog post</h1>

    <div class="layout-padding" style="border:1px solid #ccc; padding: 16px">
      <input type="text" v-model="blog.title" id="blog_title" placeholder="Enter Blog Title">
      <input type="text" v-model="blog.subtitle" id="blog_subtitle" placeholder="Enter blog subtitle">
      <!--<input type="file" name="thumbnail" id="thumbnail" accept="image/*">-->
        <input type="file" id="thumbnail" ref="thumbnail" accept="image/*">
        <button v-on:click="postThumbnail"  placeholder="Not uploaded yet" id="upload_thumbnail">Upload Thumbnail</button>
      <input type="text" id="upload_thumbnail_name" ref="upload_thumbnail_name" placeholder="Thumbnail Uploaded name will appear in here" readonly>
      <!--<input type="text" id="upload_thumbnail_name" ref="upload_thumbnail_name">-->
    </div>
    <br />
    <br />
    <div>
      <quill-editor
        style="height: 400px"
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption">
      </quill-editor>
      <br />
      <br />
      <br />
      <div class="layout-padding innerbox post-blog-button" style="border:1px solid #ccc; padding: 16px">

        <button type="button" v-on:click="postBlog" class="btn btn-primary" id="upload_blog_content">Post Blog</button>
        <br />
        <!--Blog Post Status:<div id="upload_blog_status"></div>-->

        <input type="text" id="upload_blog_status" placeholder="Blog Post Status" readonly>
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

    </div>
  </div>
</template>

<script>
import {quillEditor} from 'vue-quill-editor'
import axios from 'axios'
import api from '@/services/api'

export default {
  components: {
    quillEditor
  },
  data: function () {
    return {
      content: '',
      upload_thumbnail_name: '',
      thumbnail: [],
      blog: {
        title: '',
        subtitle: ''
      },

      serverUrl: 'http://localhost:3000/api/postImage/', // 这里写你要上传的图片服务器地址
      header: {token: sessionStorage.token}, // 有的图片服务器要求请求头需要有token之类的参数，写在这里
      detailContent: '', // 富文本内容
      editorOption: {
        placeholder: '',
        theme: 'snow',
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              // remove formatting button
              ['link', 'image'],
              [{'size': ['small', false, 'large', 'huge']}],
              [{'header': [1, 2, 3, 4, 5, 6, false]}],

              [{'color': []}],
              [{'font': []}]
            ],
            handlers: {
              'image': function () {
                const input = document.createElement('input')
                input.setAttribute('type', 'file')
                input.click()
                input.onchange = () => {
                  const imgFile = input.files[0]
                  if (/^image\//.test(imgFile.type)) {
                    var formData = new FormData()
                    formData.append('thumbnail', imgFile, imgFile.name)
                    var ref = this
                    axios({
                      method: 'post',
                      url: 'http://sammy-food-blog.herokuapp.com/api/postImage/',
                      data: formData,
                      config: {headers: { 'Content-Type': 'multipart/form-data' }}
                    })
                      .then(function (response) {
                        var resImgName = response.data.uploaded_image
                        console.log(resImgName)
                        const range = ref.quill.getSelection()
                        ref.quill.insertEmbed(range.index, 'image', `http://sammy-food-blog.herokuapp.com/api/getImage/${resImgName}`)
                      })
                      .catch(function (response) {
                        // handle error
                        console.log(response)
                      })
                  } else {
                    alert('You could only upload images.')
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  methods: {
    async postThumbnail () {
      var thumbnail = this.$refs.thumbnail.files[0]
      if (!thumbnail) {
        alert('Please choose an image first.')
      }
      if (/^image\//.test(thumbnail.type)) {
        var formData = new FormData()
        formData.append('thumbnail', thumbnail, thumbnail.name)
        var ref = this
        await axios({
          method: 'post',
          url: 'http://sammy-food-blog.herokuapp.com/api/postImage/',
          data: formData,
          config: {headers: { 'Content-Type': 'multipart/form-data' }}
        })
          .then(function (response) {
          // handle success
            // the reponse return something, like the full src of the image
            ref.$refs.upload_thumbnail_name.placeholder = response.data.uploaded_image
          })
          .catch(function (response) {
          // handle error
            console.log(response)
          })
      }
    },
    async postBlog () {
      console.log(this.$refs.upload_thumbnail_name.innerHTML)
      console.log(this.blog.title)
      console.log(this.blog.subtitle)
      console.log(this.content)
      await api().post('/api/postBlog/', {
        req_blog_title: this.blog.title,
        req_thumbnail: this.$refs.upload_thumbnail_name.placeholder,
        req_blog_content: this.content,
        req_subtitle: this.blog.subtitle
      })
        .then((response) => {
          console.log(response.data.message)
          document.getElementById('upload_blog_status').placeholder = response.data.message
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>

  .post-blog-button {
    width: 100%;
  }

  .innerbox {
    /*max-width: 900px; !* or whatever width you want. *!*/
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

  #upload_blog_content {
    width: 100%;
  }

  /* Set a style for all buttons */
  button {
    background-color: dodgerblue;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 30%;
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
