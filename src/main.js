import Vue from 'vue'
import App from './components/App.vue'
import Vuetify from 'vuetify'
import VueCookie from 'vue-cookie'
import 'vuetify/dist/vuetify.css'
import store from './store'

Vue.use(Vuetify);
Vue.use(VueCookie);

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
