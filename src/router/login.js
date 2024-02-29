export default [
  {
    path: '/login',
    component: () => import('@/layouts/default.vue'),
    meta: {
      middleware: ['role.admin', 'role.cycyrbit', 'role.default'],
    },
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('@/views/login/login.vue'),
      },
    ],
  },
]
