export default [
  {
    path: '/:pathMatch(.*)*',
    name: 'error404',
    component: () => import('@/layouts/errors.vue'),
    children: [
      {
        path: '',
        name: '404',
        component: () => import('@/views/404/404.vue'),
      },
    ],
  },
]
