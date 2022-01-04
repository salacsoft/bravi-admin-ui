const groupRoutes = [
   {
      path: "/groups",
      name: "Groups",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "groups-index" */ '@/views/Group/ui/index.vue')
   },
   {
      path: "/groups/create",
      name: "GroupCreate",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "groups-create" */ '@/views/Group/ui/form.vue')
   },
   {
      path: "/groups/edit/:id",
      name: "GroupUpdate",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "groups-update" */ '@/views/Group/ui/form.vue')
   },
]



export default groupRoutes;