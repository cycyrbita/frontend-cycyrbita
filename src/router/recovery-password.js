export default [
  {
    path: '/recovery-password',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: '',
        name: 'recovery-password',
        component: () => import('@/views/recovery-password/recovery-password.vue'),
      },
    ],
  },
]
