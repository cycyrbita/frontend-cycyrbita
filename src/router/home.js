export default [
  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    meta: {
      middleware: ['role.admin', 'role.cycyrbit', 'role.default'],
    },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home/home.vue'),
      },
    ],
  },
]
