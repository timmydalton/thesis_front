import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

import StoreLayout from  '@/components/layout/StoreLayout.vue'
import AdminLayout from  '@/components/layout/AdminLayout.vue'

import Homepage from  '@/components/sections/Homepage.vue'
import Login from  '@/components/sections/Login.vue'
import Register from  '@/components/sections/Register.vue'

import Products from '@/components/admin-view/Products.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin',
      name: 'admin',
      component: AdminLayout,
      children: [
        {
          path: '',
          name: 'analytics',
          component: Products,
        },
        {
          path: 'products',
          name: 'products',
          component: Products,
        },
        {
          path: 'categories',
          name: 'categories',
          component: Products,
        },
        {
          path: 'orders',
          name: 'orders',
          component: Products,
        },
      ]
    },
    {
      path: '/',
      name: 'store',
      component: StoreLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: Homepage,
          alias: '/home'
        },
        {
          path: 'login',
          name: 'login',
          component: Login
        },
        {
          path: 'register',
          name: 'register',
          component: Register
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

router.beforeEach((to, from) => {
  const user = useUserStore()
  user.fetchAccount()
})

export default router
