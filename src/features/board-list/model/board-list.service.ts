import { $authApi } from '@/shared/api/instance'
import type { BoardListParams, BoardResponse } from './board-list.types'

export const boardListService = {
	baseKey: 'boards',
	getAllBoards: async ({
		limit,
		isFavorite,
		sort,
		search,
		page = 1,
	}: BoardListParams) => {
		const { data } = await $authApi.get<BoardResponse>('boards', {
			params: {
				page,
				limit,
				isFavorite,
				sort,
				search,
			},
		})

		return { data }
	},

	createBoard: async (board: {
		name: string
		description: string
		lastOpenedAt: string
		isFavorite: boolean
	}) => {
		const { data } = await $authApi.post('boards/create', board)

		return data
	},

	deleteBoardById: async (id: number) => {
		const { data } = await $authApi.delete(`boards/${id}`)

		return data
	},

	toggleFavorite: async ({
		boardId,
		isFavorite,
	}: {
		boardId: number
		isFavorite: boolean
	}) => {
		const { data } = await $authApi.patch(`boards/favorite`, {
			boardId,
			isFavorite,
		})

		return data
	},
}
