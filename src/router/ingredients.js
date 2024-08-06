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
        component: () => import('@/views/ingredients/ingredients.vue'),
      },
    ],
  },
]
