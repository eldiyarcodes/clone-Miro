import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { boardListService } from './board-list.service'

export const useDeleteBoard = () => {
	const queryClient = useQueryClient()

	const { mutate, isPending, variables } = useMutation({
		mutationFn: boardListService.deleteBoardById,
		onSettled: async () =>
			await queryClient.invalidateQueries({
				queryKey: [boardListService.baseKey],
			}),
		onSuccess(data) {
			toast.error(data.message)
		},
	})

	return {
		handleDelete: mutate,
		getIsPending: (id: number) => isPending && variables === id,
	}
}
