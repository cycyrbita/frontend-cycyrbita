export default [
  {
    path: '/face',
    component: () => import('@/layouts/default.vue'),
    meta: {
      middleware: ['role.admin', 'role.cycyrbit', 'role.default'],
    },
    children: [
      {
        path: '',
        name: 'face',
        component: () => import('@/views/face/face.vue'),
      },
    ],
  },
]
