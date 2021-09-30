const ClientRoutes = [
    {
        path: "/clients",
        name: "Clients",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "cilents" */ '@/views/Client/Index.vue')
    }
]

export default ClientRoutes;