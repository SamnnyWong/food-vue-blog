<template>
  <div>
    <h1 v-html="blogtitle"></h1>

    <p v-html="blogcontent"></p>
  </div>
</template>

<script>
import api from '@/services/api'
export default {
  name: 'BlogContent',
  data () {
    return {
      blogtitle: '',
      blogcontent: ''
    }
  },
  created: function () {
    this.getBlogContent()
  },
  methods: {
    async getBlogContent () {
      // console.log(this.$route.params.blogId)
      var blogId = this.$route.params.blogId
      var data = {bcid: blogId}
      await api().get('/api/blogContent', {params: data})
        .then((response) => {
          // console.log(response.data.res_blog_content[0].blogtitle)
          // console.log(response.data.res_blog_content[0].blogcontent)
          this.blogtitle = response.data.res_blog_content[0].blogtitle
          this.blogcontent = response.data.res_blog_content[0].blogcontent
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>

</style>
