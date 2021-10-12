const ClientRoutes = [
    {
        path: "/clients",
        name: "Clients",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "clients" */ '@/views/Client/Index.vue')
    },
    {
        path: "/clients/new-client",
        name: "NewClient",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "newClient" */ '@/views/Client/ClientForm.vue')
    },
    {
        path: "/clients/new-client/:id",
        name: "UpdateClient",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "updateClient" */ '@/views/Client/ClientForm.vue')
    }
]

export default ClientRoutes;