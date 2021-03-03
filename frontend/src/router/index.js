import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/login.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/signup.vue')
  },
  {
    path: '/Home',
    name: 'Home',
    component: () => import('../views/home.vue')
  },
  {
    path: '/profile/:id(\\d+)',
    name: 'profileMain', 
    component: () => import('../views/profileMain.vue')
  },
  {
    path: '/profile/:id(\\d+)/update',
    name: 'profileUpdate', 
    component: () => import('../views/profileUpdate.vue')
  },
  {
    path: '/profile/:id(\\d+)/delete',
    name: 'profileDelete', 
    component: () => import('../views/profileDelete.vue')
  },
  {
    path: '/post/:id(\\d+)',
    name: 'PostEach',
    component: () => import('../views/PostEach.vue')
  },
]
const router = createRouter({
  mode: 'history',
  history: createWebHashHistory(),
  routes
})

export default router
