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
                children: [
                    {
                        path: '',
                        name: 'ingredients',
                        component: () => import('@/components/Ingredients/IngredientsList.vue'),
                    },
                    {
                        path: 'create',
                        name: 'ingredients-create',
                        component: () => import('@/components/Ingredients/IngredientCreate.vue'),
                    },
                ]
            },
        ]
    }
]