export default [
  {
    path: '/about',
    component: () => import('@/layouts/default.vue'),
    meta: {
      middleware: ['auth', 'role.admin', 'role.cycyrbit'],
    },
    children: [
      {
        path: '',
        name: 'about',
        component: () => import('@/views/about/about.vue'),
      },
    ],
  },
]
