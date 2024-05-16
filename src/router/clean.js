export default [
  {
    path: '/clean',
    component: () => import('@/layouts/default.vue'),
    meta: {
      middleware: ['auth', 'role.admin', 'role.cycyrbit'],
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
