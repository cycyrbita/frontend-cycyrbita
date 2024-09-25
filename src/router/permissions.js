export default [
  {
    path: '/permissions',
    component: () => import('@/layouts/default.vue'),
    meta: {
      permissions: ['permissions'],
      middleware: ['authorized'],
    },
    children: [
      {
        path: '',
        name: 'permissions',
        component: () => import('@/views/permissions/permissions.vue'),
      },
    ],
  },
]
