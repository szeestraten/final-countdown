// import Vue stuff
import Vue from 'vue'
import VueRouter from 'vue-router'

// Import app specific stuff
import App from './App.vue'
import { routes } from './routes'
import store from './store/store'

// Import 3rd party libs
import VueAnalytics from 'vue-analytics'

// Enable Vue plugins
// Router
Vue.use(VueRouter)
// Google Analytics
Vue.use(VueAnalytics, {
  id: 'UA-1921051-7',
  router
})

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
