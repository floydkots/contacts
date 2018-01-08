import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/Home.vue'
import Frequent from '../components/Frequent.vue'
import Duplicates from '../components/Duplicates.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/contacts'
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: Home
    },
    {
      path: '/frequent',
      name: 'frequent',
      component: Frequent
    },
    {
      path: '/merge',
      name: 'merge',
      component: Duplicates
    }
  ]
})
