<template>
  <div>
    <div style="font-size: 40px; font-weight: bold" v-html="blogtitle"></div>

    <ul class="post-meta">
      <li>
          <time class="entry-date published updated" datetime="2018-06-05T11:50:23-05:00">June 5, 2018</time>
      </li>
      <li class="meta-author">
        <span class="meta-separator">by</span>
        <span class="author vcard">
          <a class="url fn n" href="https://www.newsledge.com/author/marcus-chavers/" title="View all posts by Marcus Chavers">Marcus Chavers</a>
        </span>
      </li>
    </ul>
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
