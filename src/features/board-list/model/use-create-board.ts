import { useMutation, useQueryClient } from '@tanstack/react-query'
import { boardListService } from './board-list.service'

export const useCreateBoard = () => {
	const queryClient = useQueryClient()
	const queryKey = boardListService.getBoardsQueryOptions().queryKey

	const mutation = useMutation({
		mutationKey: ['create-board'],
		mutationFn: boardListService.createBoard,

		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey })
			const previousBoards = queryClient.getQueryData(queryKey)
			return { previousBoards }
		},

		onError: (_, __, context) => {
			if (context?.previousBoards) {
				queryClient.setQueryData(
					boardListService.getBoardsQueryOptions().queryKey,
					context.previousBoards
				)
			}
		},

		onSettled: async () => await queryClient.invalidateQueries({ queryKey }),
	})

	const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const name = String(formData.get('name') ?? '').trim()
		const description = String(formData.get('description') ?? '').trim()

		await mutation.mutateAsync({ name, description })
		e.currentTarget.reset()
	}

	return {
		handleCreate,
		isLoading: mutation.isPending,
		isError: mutation.isError,
		error: mutation.error,
	}
}
