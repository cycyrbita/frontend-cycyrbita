export default [
    {
        path: '/about',
        component: () => import('@/layouts/DefaultLayout.vue'),
        meta: {
            middleware: [
                'auth',
                'role.admin',
                'role.cycyrbit',
            ]
        },
        children: [
            {
                path: '',
                name: 'about',
                component: () => import('@/views/about/AboutView.vue'),
            },
        ]
    }
]