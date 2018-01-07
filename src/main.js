import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import VueCookie from 'vue-cookie'
import 'vuetify/dist/vuetify.css'
import store from './store'

import App from './components/App.vue'
import Home from './components/Home.vue'
import Frequent from './components/Frequent.vue'
import Duplicates from './components/Duplicates.vue'
import { firebaseApp } from "./api/database";


Vue.use(VueRouter);
Vue.use(Vuetify);
Vue.use(VueCookie);


const router = new VueRouter({
  mode: 'history',
  routes: [
    {path: '/', component: Home},
    {path: '/contacts', component: Home},
    {path: '/frequent', component: Frequent},
    {path: '/merge', component: Duplicates}
  ]
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
