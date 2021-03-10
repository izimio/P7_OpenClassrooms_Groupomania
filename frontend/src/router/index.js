import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
import Login from '../views/login.vue'

// creating the path for all ours views
const routes = [{
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
  {
    path: '/post/create',
    name: 'PostCreate',
    component: () => import('../views/PostCreate.vue')
  },
  {
    path: '/post/:id(\\d+)/update',
    name: 'PostUpdate',
    component: () => import('../views/PostUpdate.vue')
  },
  {
    path: '/comment/:id(\\d+)/update',
    name: 'CommentUpdate',
    component: () => import('../views/CommentUpdate.vue')
  },
]
const router = createRouter({
  mode: 'history',
  history: createWebHashHistory(),
  routes
})

export default router