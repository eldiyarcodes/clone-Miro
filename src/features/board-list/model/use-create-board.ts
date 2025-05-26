import { ROUTES } from '@/shared/model/routes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { href, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { boardListService } from './board-list.service'

export const useCreateBoard = () => {
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationKey: ['create-board'],
		mutationFn: boardListService.createBoard,

		onSuccess(data) {
			navigate(href(ROUTES.BOARD, { boardId: data.id }))
			toast.success('Доска успешно создана')
		},

		async onSettled() {
			await queryClient.invalidateQueries({
				queryKey: [boardListService.baseKey],
				exact: false,
			})
		},
	})

	const handleCreate = async () => {
		await mutation.mutateAsync({
			name: 'board name',
			description: `description ...`,
			lastOpenedAt: String(new Date(Date.now()).toISOString()),
			isFavorite: false,
		})
	}

	return {
		handleCreate,
		isPending: mutation.isPending,
		isError: mutation.isError,
		error: mutation.error,
	}
}
