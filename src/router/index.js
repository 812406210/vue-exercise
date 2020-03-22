import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/contents/index'
import Notbook from '@/components/contents/notbook'
import Contact from '@/components/contents/contact'
import Describe from '@/components/contents/describe'
import Management from '@/components/contents/management'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/notbook',
      name: 'Notbook',
      component: Notbook
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    },
    {
      path: '/describe',
      name: 'Describe',
      component: Describe
    },
    {
      path: '/management',
      name: 'Management',
      component: Management
    }
  ]
})
