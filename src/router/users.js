export default [
  {
    path: '/users',
    component: () => import('@/layouts/default.vue'),
    meta: {
      permissions: ['users'],
      middleware: ['authorized'],
    },
    children: [
      {
        path: '',
        name: 'users',
        component: () => import('@/views/users/users.vue'),
      },
    ],
  },
]
