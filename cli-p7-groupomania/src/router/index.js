import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import OnePost from '../views/OnePost.vue';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';
import UserInfo from '../views/UserInfo.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/post/:id',
    name: 'OnePost',
    component: OnePost
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/user/:id',
    name: 'UserInfo',
    component: UserInfo
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
