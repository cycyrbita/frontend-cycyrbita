export default [
  {
    path: '/ingredients',
    component: () => import('@/layouts/default.vue'),
    meta: {
      permissions: ['ingredients'],
      middleware: ['authorized'],
    },
    children: [
      {
        path: '',
        name: 'ingredients',
        component: () => import('@/views/ingredients/ingredients.vue'),
      },
    ],
  },
]
