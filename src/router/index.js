import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main.vue'
import Login from '@/views/Auth/Login.vue'
import ForgotPassword from '@/views/Auth/Forgot-Password.vue'
import store from '@/store';

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {
        path: 'about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component:Login
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component:ForgotPassword
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "reset-password" */ '../views/Auth/Reset-Password.vue')
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "404" */ '../views/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  let isAuthenticated = store.getters.isLoggedIn
  const user = store.getters.getUserDetails;
  if (to.name !== 'Login'  && to.name !== 'ResetPassword' && to.name !== 'ForgotPassword' && !isAuthenticated) next({ name: 'Login' })
  else {
    if(to.name == 'Login' && isAuthenticated) next({ name: 'Main' })
    else next()
  }
});


export default router
