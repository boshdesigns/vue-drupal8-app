import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import Basic from '@/components/Basic.vue'
import Portfolio from '@/components/Portfolio.vue'
import Project from '@/components/Project.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/portfolio',
      name: 'Portfolio',
      component: Portfolio
    },
    {
      path: '/portfolio/:id',
      name: 'Portfolio',
      component: Portfolio
    },
    {
      path: '/:id',
      name: 'Basic',
      component: Basic
    },
    {
      path: '/project/:id',
      name: 'Project',
      component: Project
    }
  ]
})
