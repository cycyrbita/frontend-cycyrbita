export default [
    {
        path: '/ingredients',
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
                path: '',
                component: () => import('@/views/ingredients/IngredientsView.vue'),
            },
        ]
    }
]