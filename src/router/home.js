export default [
    {
        path: '/',
        component: () => import('@/layouts/DefaultLayout.vue'),
        meta: {
            middleware: ['auth']
        },
        children: [
            {
                path: '',
                name: 'home',
                component: () => import('@/views/home/HomeView.vue'),
            },
        ]
    }
]