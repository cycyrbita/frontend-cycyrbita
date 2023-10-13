import {useAuthStore} from "@/stores/auth"

export default [
    {
        path: '/registration',
        component: () => import('@/layouts/DefaultLayout.vue'),
        beforeEnter: () => {
            if (useAuthStore().isAuth) return '/'
        },
        children: [
            {
                path: '',
                component: () => import('@/views/registration/registration.vue'),
            },
        ]
    }
]