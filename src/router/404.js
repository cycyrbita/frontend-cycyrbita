export default [
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/layouts/errors.vue'),
    meta: {
      middleware: ['role.admin', 'role.cycyrbit', 'role.default'],
    },
    children: [
      {
        path: '',
        name: '404',
        component: () => import('@/views/404/404.vue'),
      },
    ],
  },
]
