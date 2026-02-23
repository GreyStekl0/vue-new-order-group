import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Region from './views/Region.vue'
import PollingStation from './views/PollingStation.vue'
import CreateRegion from '@/components/CreateRegion.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/region',
    name: 'Region',
    component: Region,
  },
  {
    path: '/createRegion',
    name: 'CreateRegion',
    component: CreateRegion,
  },
  {
    path: '/pollingstation',
    name: 'PollingStation',
    component: PollingStation,
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
