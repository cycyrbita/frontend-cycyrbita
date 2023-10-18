const VITE_API_URL = import.meta.env.VITE_API_URL

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
            return await fetch(`${VITE_API_URL}api/${url}`, headers)
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