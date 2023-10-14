export default [
    {
        path: '/add-recovery-password-link',
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
                path: '/add-recovery-password-link',
                name: 'add-recovery-password-link',
                component: () => import('@/views/add-recovery-password-link/add-recovery-password-link.vue'),
            },
        ]
    }
]