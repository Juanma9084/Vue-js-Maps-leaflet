import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Mapa from '../views/Mapa.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Mapa',
    component: Mapa
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
