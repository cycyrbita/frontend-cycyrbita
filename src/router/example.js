export default [
    {
        path: '/example',
        component: () => import('@/layouts/DefaultLayout.vue'),
        meta: {
            middleware: [
                'auth',
                'role.admin',
            ]
        },
        children: [
            {
                path: '',
                name: 'example',
                component: () => import('@/views/example/ExampleView.vue'),
            },
            {
                path: 'item',
                component: () => import('@/views/users/UsersView.vue'),
            },
        ]
    }
]