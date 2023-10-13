export default [
    {
        path: '/',
        component: () => import('@/layouts/DefaultLayout.vue'),
        children: [
            {
                path: '',
                component: () => import('@/views/home/HomeView.vue'),
            },
        ]
    }
]