export default [
    {
        path: '/error500',
        name: 'error500',
        component: () => import('@/views/errors/Error500View.vue'),
        meta: {
            middleware: [
                'role.admin',
                'role.cycyrbit',
                'role.default',
            ]
        },
    }
]