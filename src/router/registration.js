export default [
    {
        path: '/registration',
        component: () => import('@/layouts/DefaultLayout.vue'),
        children: [
            {
                path: '',
                name: 'registration',
                component: () => import('@/views/registration/registration.vue'),
            },
        ]
    }
]