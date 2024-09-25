export default [
  {
    path: '/roles',
    component: () => import('@/layouts/default.vue'),
    meta: {
      permissions: ['roles'],
      middleware: ['authorized'],
    },
    children: [
      {
        path: '',
        name: 'roles',
        component: () => import('@/views/roles/roles.vue'),
      },
    ],
  },
]
