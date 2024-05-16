export default [
  {
    path: '/new_promo',
    component: () => import('@/layouts/default.vue'),
    meta: {
      middleware: ['auth', 'role.admin', 'role.cycyrbit'],
    },
    children: [
      {
        path: '',
        name: 'new_promo',
        component: () => import('@/views/new_promo/new_promo.vue'),
      },
    ],
  },
]
