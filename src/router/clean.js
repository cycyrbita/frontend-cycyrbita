export default [
  {
    path: '/clean',
    component: () => import('@/layouts/default.vue'),
    meta: {
      permissions: ['clean'],
      middleware: ['authorized'],
    },
    children: [
      {
        path: '',
        name: 'clean',
        component: () => import('@/views/clean/clean.vue'),
      },
    ],
  },
]
