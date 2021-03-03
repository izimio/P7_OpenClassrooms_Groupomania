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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/signup.vue')
  },
  {
    path: '/hub',
    name: 'hub',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/hub.vue')
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
