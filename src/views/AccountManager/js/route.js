const accountManagerRoutes = [
   {
      path: "/account-managers",
      name: "AccountManagers",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "groups-index" */ '@/views/AccountManager/ui/index.vue')
   },
   {
      path: "/account-managers/create",
      name: "AccountManagerCreate",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "groups-create" */ '@/views/AccountManager/ui/form.vue')
   },
   {
      path: "/account-managers/edit/:id",
      name: "AccountManagerUpdate",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "groups-update" */ '@/views/AccountManager/ui/form.vue')
   },
]



export default accountManagerRoutes;