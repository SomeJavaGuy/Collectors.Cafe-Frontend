import Vue from 'vue'
import Router from 'vue-router'
import { config } from '@/config'

import PublicLayout from '@/layouts/PublicLayout'
import AppLayout from '@/layouts/AppLayout'

import HomePublic from './views/HomePublic.vue'
import User from './views/User.vue'
import OrderList from './views/OrderList.vue'
import Order from './views/Order.vue'
import CreateOrder from './views/CreateOrder.vue'
// import Login from './views/Login.vue'
// import Register from './views/Register.vue'
import Logout from './views/Logout.vue'

Vue.use(Router)

const router = new Router({
  routes: [

    {
      path: '/',
      name: '',
      component: PublicLayout,

      children: [
        {
          path: '',
          name: 'public-home',
          component: HomePublic
        },
        // {
        //   path: 'login',
        //   name: 'login',
        //   component: Login
        // },
        // {
        //   path: 'register',
        //   name: 'register',
        //   component: Register
        // },
      ]

    },

    {
      path: '/app',
      name: 'App',
      component: AppLayout,
      children: [

        {
          path: '/',
          name: 'app-home',
          component: User
        },

        {
          path: 'user/:userAddress',
          name: 'user',
          component: User
        },

        {
          path: 'orders/:type',
          name: 'orders-all',
          component: OrderList
        },

        {
          path: 'orders/:type/:contractAddress/:tokenId',
          name: 'orders-by-token',
          component: OrderList
        },

        {
          path: 'orders/:type/:makerAddress',
          name: 'orders-by-user',
          component: OrderList
        },

        {
          path: 'order/:orderHash',
          name: 'order',
          component: Order
        },

        {
          path: 'create-order/:type/:contractAddress/:tokenId',
          name: 'create-order',
          component: CreateOrder
        },

        {
          path: 'logout',
          name: 'logout',
          component: Logout
        }
      ]
    }
  ]
})


router.beforeEach((to, from, next) => {
  if (to.path.includes('/app/')) {
    if (!localStorage.getItem(config.localStorageKey.login)) {
      // console.log('no jwtToken, redirecting to login')
      router.push({ name: 'public-home', query: { redirect: to.path }})
    }
  }
  next()
})

export default router
