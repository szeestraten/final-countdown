// import Vue stuff
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import VueLocaleStorage from 'vue-ls'

// Import app specific stuff
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'
import { createI18n } from './i18n'

const router = createRouter()
const store = createStore()
const i18n = createI18n()

// Google Analytics
Vue.use(VueAnalytics, {
  id: 'UA-1921051-7',
  router
})

// Vue LocalStorage
Vue.use(VueLocaleStorage, { namespace: 'vuejs__' })

const app = new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
}) // eslint-disable-line
