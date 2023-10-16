class useFetch {
    async post(url, data, headers) {
        try {
            if(!headers) {
                headers = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(data),
                }
            }
            return await fetch(`http://localhost:5000/api/${url}`, headers)
        } catch (e) {
            throw e
        }
    }
}

export default new useFetch()