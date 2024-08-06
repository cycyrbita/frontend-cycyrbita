export default [
  {
    path: '/add-recovery-password-link',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: '/add-recovery-password-link',
        name: 'add-recovery-password-link',
        component: () => import('@/views/add-recovery-password-link/add-recovery-password-link.vue'),
      },
    ],
  },
]
