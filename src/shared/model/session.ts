import { jwtDecode } from 'jwt-decode'
import { create } from 'zustand'

type Session = {
	userId: number
	email: string
	exp: number
	iat: number
}

type SessionStore = {
	token: string | null
	session: Session | null
	login: (token: string) => void
	logout: () => void
}

const TOKEN_KEY = 'access_token'

export const useSession = create<SessionStore>(set => {
	const token = localStorage.getItem(TOKEN_KEY) || null

	const decoded = token ? jwtDecode<Session>(token) : null

	return {
		token,
		session: decoded,

		login: (token: string) => {
			localStorage.setItem(TOKEN_KEY, token)
			set({ token, session: jwtDecode<Session>(token) })
		},

		logout: () => {
			localStorage.removeItem(TOKEN_KEY)
			set({ token: null, session: null })
		},
	}
})
