import axios from 'axios'
import { CONFIG } from '../model/config'

const createApi = () => axios.create({ baseURL: CONFIG.API_BASE_URL })

const $mainApi = createApi()
const $authApi = createApi()

// ...

export { $authApi, $mainApi }
