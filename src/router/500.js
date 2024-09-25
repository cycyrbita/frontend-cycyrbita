export default [
  {
    path: '/error500',
    name: 'error500',
    component: () => import('@/layouts/errors.vue'),
    children: [
      {
        path: '',
        name: '500',
        component: () => import('@/views/500/500.vue'),
      },
    ],
  },
]
