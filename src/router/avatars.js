export default [
  {
    path: '/avatars',
    component: () => import('@/layouts/default.vue'),
    meta: {
      permissions: ['avatars'],
      middleware: ['authorized'],
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
