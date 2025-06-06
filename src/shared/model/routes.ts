import 'react-router-dom'

export const ROUTES = {
	HOME: '/',
	LOGIN: '/login',
	REGISTER: '/register',
	BOARDS: '/boards',
	FAVORITE_BOARDS: '/favorite-boards',
	RECENT_BOARDS: '/recent-boards',
	BOARD: '/boards/:boardId',
} as const

export type PathParams = {
	[ROUTES.BOARD]: {
		boardId: string
	}
}

declare module 'react-router-dom' {
	interface Register {
		params: PathParams
	}
}
