// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import VueCookie from 'vue-cookie'
import store from './store'

import 'jquery'
import 'vuetify/dist/vuetify.css'
import 'intl-tel-input/build/css/intlTelInput.css'
import '../src/assets/css/index.css'

Vue.use(Vuetify)
Vue.use(VueCookie)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
