export default [
    {
        path: '/ingredients',
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
                component: () => import('@/views/ingredients/IngredientsView.vue'),
            },
        ]
    }
]