export default [
    {
        path: '/about',
        component: () => import('@/layouts/DefaultLayout.vue'),
        children: [
            {
                path: '',
                component: () => import('@/views/about/AboutView.vue'),
            },
        ]
    }
]