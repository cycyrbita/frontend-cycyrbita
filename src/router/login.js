export default [
  {
    path: '/login',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('@/views/login/login.vue'),
      },
    ],
  },
]
