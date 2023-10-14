export default [
    {
        path: '/login',
        component: () => import('@/layouts/DefaultLayout.vue'),
        middleware: [
            'role.admin',
            'role.cycyrbit',
            'role.default',
        ],
        children: [
            {
                path: '',
                name: 'login',
                component: () => import('@/views/login/login.vue'),
            },
        ]
    }
]