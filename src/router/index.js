import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useMainStore } from '@/stores/store'

import StoreLayout from  '@/components/layout/StoreLayout.vue'
import AdminLayout from  '@/components/layout/AdminLayout.vue'

import Homepage from  '@/components/sections/Homepage.vue'
import ProductPage from  '@/components/sections/ProductPage.vue'
import CategoryPage from  '@/components/sections/CategoryPage.vue'
import Login from  '@/components/sections/Login.vue'
import Register from  '@/components/sections/Register.vue'

import Products from '@/components/admin-view/Products.vue'
import Categories from '@/components/admin-view/Categories.vue'
import Analytics from '@/components/admin-view/Analytics.vue'
import Orders from '@/components/admin-view/Orders.vue'

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
          component: Analytics,
        },
        {
          path: 'products',
          name: 'products',
          component: Products,
        },
        {
          path: 'categories',
          name: 'categories',
          component: Categories,
        },
        {
          path: 'orders',
          name: 'orders',
          component: Orders,
        },
      ]
    },
    {
      path: '/category',
      name: 'category',
      component: StoreLayout,
      children: [
        {
          path: ':category_id',
          name: 'category',
          component: CategoryPage,
        },
      ]
    },
    {
      path: '/product',
      name: 'product',
      component: StoreLayout,
      children: [
        {
          path: ':product_id',
          name: 'product',
          component: ProductPage,
          beforeEnter: (to, from, next) => {
            const product_id = to.params.product_id
            useMainStore().getProductById(product_id)
              .finally(() => {
                next()
              })
          },
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

  const mainStore = useMainStore()
  mainStore.getCategories()
})

export default router
