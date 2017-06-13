import Home from './components/Home.vue'

// Lazy load alarm page
const Timer = resolve => {
  require.ensure(['./components/Timer.vue'], () => {
    resolve(require('./components/Timer.vue'))
  })
}

export const routes = [
  { path: '/', component: Home },
  { path: '/timer', component: Timer }
]