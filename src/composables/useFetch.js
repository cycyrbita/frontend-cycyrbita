import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'
import router from '@/router'

const VITE_API_URL = import.meta.env.MODE === 'production' ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV

const getHeaders = (method = 'GET', data) => {
  const header = {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessTokenCycyrbita')}`,
    },
    credentials: 'include',
  }

  if (!!data) header.body = JSON.stringify(data)

  return header
}

class useFetch {
  async post(url, data, headers = getHeaders('POST', data)) {
    const storeAuth = useAuthStore()
    const storeUser = useUserStore()

    try {
      // запрос
      const res = await fetch(`${VITE_API_URL}api/${url}`, headers)

      // проверяем авторизован или нет
      if (res.status === 401) {
        storeAuth.auth = false

        // запрос на обновление токена
        const response = await this.get('refresh')
        const json = await response.json()

        if (response.status === 200) {
          // устанавливаем token
          localStorage.setItem('accessTokenCycyrbita', json.accessToken)

          storeAuth.auth = true
          storeUser.user = json.user

          // запускаем повторный вызов который был изначально
          return await this.post(url, data, getHeaders('POST', data))
        }

        await router.push('/login')
      }

      return res
    } catch (e) {
      throw e
    }
  }

  async get(url, headers = getHeaders()) {
    const storeAuth = useAuthStore()
    const storeUser = useUserStore()

    try {
      const res = await fetch(`${VITE_API_URL}api/${url}`, headers)

      // проверяем авторизован или нет
      if (res.status === 401) {
        storeAuth.auth = false

        if (url === 'refresh') return res

        // запрос на обновление токена
        const response = await this.get('refresh')
        const json = await response.json()

        // если токен обновился
        if (response.status === 200) {
          // устанавливаем token
          localStorage.setItem('accessTokenCycyrbita', json.accessToken)

          storeAuth.auth = true
          storeUser.user = json.user

          // запускаем повторный вызов который был изначально
          return await this.get(url, getHeaders())
        }

        await router.push('/login')
      }

      return res
    } catch (e) {
      throw e
    }
  }

  async delete(url, data, headers = getHeaders('DELETE', data)) {
    const storeAuth = useAuthStore()
    const storeUser = useUserStore()

    try {
      const res = await fetch(`${VITE_API_URL}api/${url}`, headers)

      // проверяем авторизован или нет
      if (res.status === 401) {
        storeAuth.auth = false

        // запрос на обновление токена
        const response = await this.get('refresh')
        const json = await response.json()

        // если токен обновился
        if (response.status === 200) {
          // устанавливаем token
          localStorage.setItem('accessTokenCycyrbita', json.accessToken)

          storeAuth.auth = true
          storeUser.user = json.user

          // запускаем повторный вызов который был изначально
          return await this.delete(url, data, getHeaders('DELETE', data))
        }

        await router.push('/login')
      }

      return res
    } catch (e) {
      throw e
    }
  }
}

export default new useFetch()
