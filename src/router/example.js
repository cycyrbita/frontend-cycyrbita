import {useAuthStore} from "@/stores/auth"

export default [
    {
        path: '/example',
        component: () => import('../views/example/ExampleView.vue'),
        beforeEnter: (to, from) => {
            const store = useAuthStore()
            if (!store.isAuth) return '/'
        }
    }
]