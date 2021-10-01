const groupRoutes = [
   {
      path: "/groups",
      name: "Groups",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "cilents" */ '@/views/Group/Index.vue')
   }
]



export default groupRoutes;