export default [
  {
    path: '/about',
    component: () => import('@/layouts/default.vue'),
    meta: {
      permissions: ['about'],
      middleware: ['authorized'],
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
