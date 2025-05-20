import { $mainApi } from '@/shared/api/axios'
import { TOKENS } from '@/shared/consts/constants'
import type { AuthData } from './types'

export const authService = {
	login: async (reqData: AuthData) => {
		const { data } = await $mainApi.post('auth/sign-in', reqData)
		return data
	},

	register: async (reqData: AuthData) => {
		const { data } = await $mainApi.post('auth/sign-up', reqData)
		return data
	},

	logout: () => {
		localStorage.removeItem(TOKENS.ACCESS)
		localStorage.removeItem(TOKENS.REFRESH)
	},
}
