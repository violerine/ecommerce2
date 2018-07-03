import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Frontpage from './views/Frontpage.vue'
import About from './views/About.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Cart from './views/Cart.vue'
import Admin from './views/Admin.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: Frontpage
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    }
  ]
})
