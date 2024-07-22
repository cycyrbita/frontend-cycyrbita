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
        name: 'new-promo',
        component: () => import('@/views/new-promo/new-promo.vue'),
      },
    ],
  },
]
