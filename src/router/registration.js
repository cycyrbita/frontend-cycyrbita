export default [
  {
    path: '/registration',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: '',
        name: 'registration',
        component: () => import('@/views/registration/registration.vue'),
      },
    ],
  },
]
