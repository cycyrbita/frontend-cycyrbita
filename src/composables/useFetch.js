import

import {useAuthStore} from "@/stores/auth";
import {useUserStore} from "@/stores/user";

const VITE_API_URL = import.meta.env.VITE_API_URL

const storeAuth = useAuthStore()
// const storeUser = useUserStore()

class useFetch {
    async post(url, data, headers) {
        try {
            if(!headers) {
                headers = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('accessTokenCycyrbita')}`
                    },
                    credentials: 'include',
                    body: JSON.stringify(data),
                }
            }
            const res = await fetch(`${VITE_API_URL}api/${url}`, headers)
            if(res.status === 401) {
                const res = await this.get('refresh')
                const json = await res.json()

                if(res.status === 200) {
                    localStorage.setItem('accessTokenCycyrbita', json.accessToken)
                    // storeAuth.auth = true
                    // storeUser.user = json.user
                    this.post(url, data, headers)
                }
            }
            return res
        } catch (e) {
            throw e
        }
    }

    async get(url, data, headers) {
        try {
            if(!headers) {
                headers = {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('accessTokenCycyrbita')}`
                    },
                    credentials: 'include',
                }
            }
            return await fetch(`${VITE_API_URL}api/${url}`, headers)
        } catch (e) {
            throw e
        }
    }
}

export default new useFetch()