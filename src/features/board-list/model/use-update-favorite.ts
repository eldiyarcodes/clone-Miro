import { useMutation, useQueryClient } from '@tanstack/react-query'
import { startTransition, useOptimistic } from 'react'
import { boardListService } from './board-list.service'

export function useUpdateFavorite() {
	const queryClient = useQueryClient()

	const [favorite, setFavorite] = useOptimistic<Record<string, boolean>>({})

	const updateFavoriteMutation = useMutation({
		mutationKey: ['update-favorite'],
		mutationFn: boardListService.toggleFavorite,

		async onSettled() {
			await queryClient.invalidateQueries({
				queryKey: [boardListService.baseKey],
				exact: false,
			})
		},
	})

	const toggle = (board: { id: number; isFavorite: boolean }) => {
		setFavorite(prev => ({
			...prev,
			[board.id]: !board.isFavorite,
		}))

		startTransition(async () => {
			await updateFavoriteMutation.mutateAsync({
				boardId: board.id,
				isFavorite: !board.isFavorite,
			})
		})
	}

	const isOptimisticFavorite = (board: { id: number; isFavorite: boolean }) =>
		favorite[board.id] ?? board.isFavorite

	return {
		toggle,
		isOptimisticFavorite,
	}
}
