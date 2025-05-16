import { useMutation, useQueryClient } from '@tanstack/react-query'
import { boardListApi } from './board-list.api'

export const useCreateBoard = () => {
	const queryClient = useQueryClient()
	const queryKey = boardListApi.getBoardsQueryOptions().queryKey

	const mutation = useMutation({
		mutationKey: ['create-board'],
		mutationFn: boardListApi.createBoard,

		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey })
			const previousBoards = queryClient.getQueryData(queryKey)
			return { previousBoards }
		},

		onError: (_, __, context) => {
			if (context?.previousBoards) {
				queryClient.setQueryData(
					boardListApi.getBoardsQueryOptions().queryKey,
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
