import { $authApi } from '@/shared/api/axios'
import { queryOptions } from '@tanstack/react-query'
import type { BoardResponse } from './board-list.dto'

export const boardListService = {
	baseKey: 'boards',
	getAllBoards: async ({ signal }: { signal: AbortSignal }) => {
		const { data } = await $authApi.get<BoardResponse>('boards', { signal })
		return data
	},

	createBoard: async (board: { name: string; description: string }) => {
		const { data } = await $authApi.post('boards/create', board)
		return data
	},

	deleteBoardById: async (id: number) => {
		const { data } = await $authApi.delete(`boards/${id}`)
		return data
	},

	getBoardsQueryOptions: () => {
		return queryOptions({
			queryKey: [boardListService.baseKey, 'list'],
			queryFn: meta => boardListService.getAllBoards({ signal: meta.signal }),
		})
	},
}
