import {useAuthStore} from "@/stores/auth"

export default [
    {
        path: '/login',
        component: () => import('@/layouts/DefaultLayout.vue'),
        beforeEnter: () => {
            if (useAuthStore().isAuth) return '/'
        },
        children: [
            {
                path: '',
                component: () => import('@/views/login/login.vue'),
            },
        ]
    }
]