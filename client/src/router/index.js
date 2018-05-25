import Vue from 'vue'
import Router from 'vue-router'
import Blog from '@/components/Blog'
import Restaurants from '@/components/Restaurants'
import DevBlog from '@/components/DevBlog'
import AboutMe from '@/components/AboutMe'
import Contact from '@/components/Contact'
import AddBlog from '@/components/AddBlog'
import BlogContent from '@/components/BlogContent'
import SignIn from '@/components/SignIn'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Blog',
      component: Blog
    },
    {
      path: '/restaurants',
      name: 'Restaurants',
      component: Restaurants
    },
    {
      path: '/dev-blog',
      name: 'DevBlog',
      component: DevBlog
    },
    {
      path: '/about-me',
      name: 'AboutMe',
      component: AboutMe
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/addblog',
      name: 'AddBlog',
      component: AddBlog
    },
    {
      path: '/blogcontent/:blogId',
      name: 'BlogContent',
      component: BlogContent
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    }
  ]
})
