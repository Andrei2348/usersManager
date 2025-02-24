import { createRouter, createWebHistory } from 'vue-router'
import { h } from 'vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/:catchAll(.*)*',
      name: 'NotFound',
      component: h('p', { style: 'color: red;' }, '404 Not Found')
    }
  ]
})

export default router
