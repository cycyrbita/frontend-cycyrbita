export default [
  {
    path: '/users',
    component: () => import('@/layouts/DefaultLayout.vue'),
    meta: {
      middleware: [
        'auth',
        'role.admin',
      ]
    },
    children: [
      {
        path: '',
        name: 'users',
        component: () => import('@/views/users/UsersView.vue'),
      },
    ]
  }
]