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

	const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const form = e.currentTarget

		const formData = new FormData(form)
		const name = String(formData.get('name') ?? '').trim()
		const description = String(formData.get('description') ?? '').trim()

		await mutation.mutateAsync({
			name,
			description: `${description} description ...`,
			lastOpenedAt: String(new Date(Date.now()).toISOString()),
			isFavorite: false,
		})

		form.reset()
	}

	return {
		handleCreate,
		isPending: mutation.isPending,
		isError: mutation.isError,
		error: mutation.error,
	}
}
