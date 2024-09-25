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
        name: 'new-promo',
        component: () => import('@/views/new-promo/new-promo.vue'),
      },
    ],
  },
]
