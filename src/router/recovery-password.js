export default [
    {
        path: '/recovery-password',
        component: () => import('@/layouts/DefaultLayout.vue'),
        middleware: [
            'role.admin',
            'role.cycyrbit',
            'role.default',
        ],
        children: [
            {
                path: '',
                name: 'recovery-password',
                component: () => import('@/views/recovery-password/recovery-password.vue'),
            },
        ]
    }
]