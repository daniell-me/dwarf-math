import { createRouter, createWebHistory } from 'vue-router'
import HomeViewV2 from '../views/v2/HomeViewV2.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeViewV2,
    },
  ],
  // Ensure trailing slash doesn't matter
  strict: false,
})

export default router
