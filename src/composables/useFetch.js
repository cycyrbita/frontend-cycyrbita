import {useAuthStore} from "@/stores/auth";
import {useUserStore} from "@/stores/user";
import router from "@/router";

const VITE_API_URL = import.meta.env.MODE === 'production' ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV

class useFetch {
    async post(url, data, headers, auth) {
        const storeAuth = useAuthStore()
        const storeUser = useUserStore()

        try {
            // проверяем передали ли мы header
            if(!headers) {
                // если header не передали то приминяем этот
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

            // запрос
            const res = await fetch(`${VITE_API_URL}api/${url}`, headers)

            if(auth) {
                // проверяем авторизован или нет
                if(res.status === 401) {
                    // переключаем флаг авторизации
                    storeAuth.auth = false
                    // передаем дефолтного пользователя
                    storeUser.user = {role: 'role.default'}

                    // запрос на обновление токена
                    const response = await this.get('refresh')
                    // генерим данные в json
                    const json = await response.json()

                    // если токен обновился
                    if(response.status === 200) {
                        // устанавливаем token
                        localStorage.setItem('accessTokenCycyrbita', json.accessToken)
                        // переключаем флаг авторизации
                        storeAuth.auth = true
                        // передаем пользователя
                        storeUser.user = json.user
                        // обновляем дату последней активности
                        await this.post('last-activity-at', storeUser.user)
                        // запускаем повторный вызов который был изначально
                        return await this.post(url, data)
                    }
                    router.push('/login')
                }
                // обновляем дату последней активности
                await this.post('last-activity-at', storeUser.user)
            }
            return res
        } catch (e) {
            throw e
        }
    }

    async get(url, data, headers, auth) {
        const storeAuth = useAuthStore()
        const storeUser = useUserStore()

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
            const res = await fetch(`${VITE_API_URL}api/${url}`, headers)

            if(auth) {
                // проверяем авторизован или нет
                if(res.status === 401) {
                    // переключаем флаг авторизации
                    storeAuth.auth = false
                    // передаем дефолтного пользователя
                    storeUser.user = {role: 'role.default'}

                    // запрос на обновление токена
                    const response = await this.get('refresh')
                    // генерим данные в json
                    const json = await response.json()

                    // если токен обновился
                    if(response.status === 200) {
                        // устанавливаем token
                        localStorage.setItem('accessTokenCycyrbita', json.accessToken)
                        // переключаем флаг авторизации
                        storeAuth.auth = true
                        // передаем пользователя
                        storeUser.user = json.user
                        // обновляем дату последней активности
                        await this.post('last-activity-at', storeUser.user)
                        // запускаем повторный вызов который был изначально
                        return await this.get(url, data)
                    }
                    router.push('/login')
                }
                // обновляем дату последней активности
                await this.post('last-activity-at', storeUser.user)
            }
            return res
        } catch (e) {
            throw e
        }
    }

    async delete(url, data, headers, auth) {
        const storeAuth = useAuthStore()
        const storeUser = useUserStore()

        try {
            // проверяем передали ли мы header
            if(!headers) {
                // если header не передали то приминяем этот
                headers = {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('accessTokenCycyrbita')}`
                    },
                    credentials: 'include',
                    body: JSON.stringify(data),
                }
            }

            // запрос
            const res = await fetch(`${VITE_API_URL}api/${url}`, headers)

            if(auth) {
                // проверяем авторизован или нет
                if(res.status === 401) {
                    // переключаем флаг авторизации
                    storeAuth.auth = false
                    // передаем дефолтного пользователя
                    storeUser.user = {role: 'role.default'}

                    // запрос на обновление токена
                    const response = await this.get('refresh')
                    // генерим данные в json
                    const json = await response.json()

                    // если токен обновился
                    if(response.status === 200) {
                        // устанавливаем token
                        localStorage.setItem('accessTokenCycyrbita', json.accessToken)
                        // переключаем флаг авторизации
                        storeAuth.auth = true
                        // передаем пользователя
                        storeUser.user = json.user
                        // обновляем дату последней активности
                        await this.post('last-activity-at', storeUser.user)
                        // запускаем повторный вызов который был изначально
                        return await this.delete(url, data)
                    }
                    router.push('/login')
                }
                // обновляем дату последней активности
                await this.post('last-activity-at', storeUser.user)
            }
            return res
        } catch (e) {
            throw e
        }
    }
}

export default new useFetch()