import { useMutation, useQueryClient } from '@tanstack/react-query'
import { boardListService } from './board-list.service'

export const useDeleteBoard = () => {
	const queryClient = useQueryClient()

	const { mutate, isPending, variables } = useMutation({
		mutationFn: boardListService.deleteBoardById,
		onSettled: async () =>
			await queryClient.invalidateQueries({
				queryKey: [boardListService.baseKey],
			}),
		onSuccess: async (_, deletedId) => {
			queryClient.setQueryData(
				boardListService.getBoardsQueryOptions().queryKey,
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
