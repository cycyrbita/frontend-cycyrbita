export default [
    {
        path: '/login',
        component: () => import('@/layouts/DefaultLayout.vue'),
        children: [
            {
                path: '',
                name: 'login',
                component: () => import('@/views/login/login.vue'),
            },
        ]
    }
]