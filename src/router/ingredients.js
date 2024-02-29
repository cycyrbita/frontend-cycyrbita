export default [
  {
    path: '/ingredients',
    component: () => import('@/layouts/default.vue'),
    meta: {
      middleware: ['auth', 'role.admin', 'role.cycyrbit'],
    },
    children: [
      {
        path: '',
        component: () => import('@/views/ingredients/ingredients.vue'),
      },
    ],
  },
]
