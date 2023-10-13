import {useAuthStore} from "@/stores/auth"

export default [
    {
        path: '/example',
        component: () => import('@/layouts/DefaultLayout.vue'),
        beforeEnter: () => {
            if (!useAuthStore().isAuth) return '/'
        },
        children: [
            {
                path: '',
                component: () => import('@/views/example/ExampleView.vue'),
            },
            {
                path: 'item',
                component: () => import('@/components/Footer/Footer.vue'),
            },
        ]
    }
]