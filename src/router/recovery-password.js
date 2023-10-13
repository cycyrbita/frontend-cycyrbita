import {useAuthStore} from "@/stores/auth"

export default [
    {
        path: '/recovery-password',
        component: () => import('@/layouts/DefaultLayout.vue'),
        beforeEnter: () => {
            if (useAuthStore().isAuth) return '/'
        },
        children: [
            {
                path: '',
                component: () => import('@/views/recovery-password/recovery-password.vue'),
            },
        ]
    }
]