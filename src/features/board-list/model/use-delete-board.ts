import { useMutation, useQueryClient } from '@tanstack/react-query'
import { boardListApi } from './board-list.api'

export const useDeleteBoard = () => {
	const queryClient = useQueryClient()

	const { mutate, isPending, variables } = useMutation({
		mutationFn: boardListApi.deleteBoardById,
		onSettled: async () =>
			queryClient.invalidateQueries({ queryKey: [boardListApi.baseKey] }),
		onSuccess: async (_, deletedId) => {
			queryClient.setQueryData(
				boardListApi.getBoardsQueryOptions().queryKey,
				boards =>
					boards
						? {
								...boards,
								data: boards.data?.filter(board => board.id !== deletedId),
						  }
						: undefined
			)
		},
	})

	return {
		handleDelete: mutate,
		getIsPending: (id: number) => isPending && variables === id,
	}
}
