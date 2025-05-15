import { $authApi, $mainApi } from '@/shared/api/axios'
import { queryOptions } from '@tanstack/react-query'
import type { BoardResponse } from './board-list.dto'

export const boardListApi = {
	baseKey: 'boards',
	getAllBoards: async ({ signal }: { signal: AbortSignal }) => {
		const { data } = await $mainApi.get<BoardResponse>('boards', { signal })
		return data
	},

	createBoard: async (board: { name: string; description: string }) => {
		const { data } = await $authApi.post('boards/create', board)
		return data
	},

	deleteBoardById: async (id: number) => {
		const { data } = await $mainApi.delete(`boards/${id}`)
		return data
	},

	getBoardsQueryOptions: () => {
		return queryOptions({
			queryKey: [boardListApi.baseKey, 'list'],
			queryFn: meta => boardListApi.getAllBoards({ signal: meta.signal }),
		})
	},
}
