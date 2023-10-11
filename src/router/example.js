import {useAuthStore} from "@/stores/auth"

export default [
    {
        path: '/example',
        component: () => import('@/views/example/ExampleView.vue'),
        beforeEnter: () => {
            if (!useAuthStore().isAuth) return '/'
        },
        children: [
            {
                path: '',
                component: () => import('@/pages/Example/ExamplePage.vue'),
            },
            {
                path: 'item',
                component: () => import('@/components/Footer/Footer.vue'),
            },
        ]
    }
]