import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import getstart from '@/pages/getstart'
import api from '@/pages/api'
import about from '@/pages/about'
import login from '@/pages/login'
import article from '@/pages/article'
import newTipic from '@/pages/new'
import user from '@/pages/user'
import info from '@/pages/info'
import error from '@/pages/error'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/getstart',
      name: 'getstart',
      component: getstart
    },
    {
      path: '/api',
      name: 'api',
      component: api
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/article',
      name: 'article',
      component: article
    },
    {
      path: '/new',
      name: 'newTipic',
      component: newTipic
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/info',
      name: 'info',
      component: info
    },
    {
      path: '/error',
      name: 'error',
      component: error
    },
    {
      path: '*',
      component: index
    }
  ]
})
