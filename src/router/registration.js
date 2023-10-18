export default [
    {
        path: '/registration',
        component: () => import('@/layouts/DefaultLayout.vue'),
        meta: {
            middleware: [
                'role.admin',
                'role.cycyrbit',
                'role.default',
            ]
        },
        children: [
            {
                path: '',
                name: 'registration',
                component: () => import('@/views/registration/registration.vue'),
            },
        ]
    }
]