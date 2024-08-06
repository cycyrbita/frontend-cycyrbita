export default [
  {
    path: '/new_promo',
    component: () => import('@/layouts/default.vue'),
    meta: {
      permissions: ['new-promo'],
      middleware: ['authorized'],
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
