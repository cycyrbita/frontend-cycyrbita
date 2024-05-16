export default [
  {
    path: '/avatars',
    component: () => import('@/layouts/default.vue'),
    meta: {
      middleware: ['auth', 'role.admin', 'role.cycyrbit'],
    },
    children: [
      {
        path: '',
        name: 'avatars',
        component: () => import('@/views/avatars/avatars.vue'),
      },
    ],
  },
]
