export default [
  {
    path: '/users',
    component: () => import('@/layouts/default.vue'),
    meta: {
      middleware: ['auth', 'role.admin'],
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
