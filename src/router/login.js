import {useAuthStore} from "@/stores/auth"

export default [
    {
        path: '/login',
        component: () => import('@/views/login/login.vue'),
        beforeEnter: () => {
            if (useAuthStore().isAuth) return '/'
        },
        children: [
            {
                path: '',
                component: () => import('@/pages/Login/LoginPage.vue'),
            },
        ]
    }
]