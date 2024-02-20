export default [
    {
        path: '/error404',
        name: 'error404',
        component: () => import('@/views/errors/Error404View.vue'),
        meta: {
            middleware: [
                'role.admin',
                'role.cycyrbit',
                'role.default',
            ]
        },
    }
]