const BranchesRoutes = [
   {
      path: "/branches",
      name: "Branches",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "groups-index" */ '@/views/Branches/ui/index.vue')
   },
   {
      path: "/branches/create",
      name: "BranchesCreate",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "groups-create" */ '@/views/Branches/ui/form.vue')
   },
   {
      path: "/branches/edit/:id",
      name: "BranchesUpdate",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "groups-update" */ '@/views/Branches/ui/form.vue')
   },
]



export default BranchesRoutes;