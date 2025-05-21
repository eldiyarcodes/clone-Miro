import axios from 'axios'

import { CONFIG } from '../model/config'
import { useSession } from '../model/session'

const createApi = () =>
	axios.create({ baseURL: CONFIG.API_BASE_URL, withCredentials: true })

const $mainApi = createApi()
const $authApi = createApi()

$authApi.interceptors.request.use(
	async config => {
		const token = await useSession.getState().refresh()

		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}

		return config
	},
	error => Promise.reject(error)
)

export { $authApi, $mainApi }
