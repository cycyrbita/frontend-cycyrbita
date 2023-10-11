import {useAuthStore} from "@/stores/auth"

export default [
    {
        path: '/registration',
        component: () => import('@/views/registration/registration.vue'),
        beforeEnter: () => {
            if (useAuthStore().isAuth) return '/'
        },
        children: [
            {
                path: '',
                component: () => import('@/pages/Registration/RegistrationPage.vue'),
            },
        ]
    }
]