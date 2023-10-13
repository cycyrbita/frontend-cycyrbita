export default [
    {
        path: '/example',
        component: () => import('@/layouts/DefaultLayout.vue'),
        meta: {
            middleware: ['auth']
        },
        children: [
            {
                path: '',
                name: 'example',
                component: () => import('@/views/example/ExampleView.vue'),
            },
            {
                path: 'item',
                component: () => import('@/components/Footer/Footer.vue'),
            },
        ]
    }
]