import {useAuthStore} from "@/stores/auth"

export default [
    {
        path: '/recovery-password',
        component: () => import('@/views/recovery-password/recovery-password.vue'),
        beforeEnter: () => {
            if (useAuthStore().isAuth) return '/'
        },
        children: [
            {
                path: '',
                component: () => import('@/pages/RecoveryPassword/RecoveryPasswordPage.vue'),
            },
        ]
    }
]