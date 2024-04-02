import '../style.css'

import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Weather from '../views/Weather.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/weather/:city',
      name: 'Weather',
      component: Weather
    }
  ]
})

export default router
