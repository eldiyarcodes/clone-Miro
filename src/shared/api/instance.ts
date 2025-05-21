import axios from 'axios'

import { CONFIG } from '../model/config'
import { useSession } from '../model/session'

const createApi = () => axios.create({ baseURL: CONFIG.API_BASE_URL })

const $mainApi = createApi()
const $authApi = createApi()

$authApi.interceptors.request.use(config => {
	const token = useSession(s => s.token)
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}

	return config
})

// ...

export { $authApi, $mainApi }
