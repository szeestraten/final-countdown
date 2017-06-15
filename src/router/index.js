import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'

Vue.use(Router)

// Lazy load alarm page
const Timer = resolve => {
  require.ensure(['../components/Timer.vue'], () => {
    resolve(require('../components/Timer.vue'))
  })
}

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      { path: '/', component: Home },
      { path: '/timer', component: Timer }
    ]
  })
}
