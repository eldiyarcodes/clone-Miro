import {
	useMutation,
	useQueryClient,
	type InfiniteData,
} from '@tanstack/react-query'
import { boardListService } from './board-list.service'
import type { BoardResponse } from './board-list.types'
// import { useState } from 'react'

export function useUpdateFavorite() {
	const queryClient = useQueryClient()

	// const [favorite, setFavorite]= useState<Record<string, boolean>>({  })

	const updateFavoriteMutation = useMutation({
		mutationKey: ['update-favorite'],
		mutationFn: boardListService.toggleFavorite,

		async onMutate({ boardId, isFavorite }) {
			await queryClient.cancelQueries({ queryKey: [boardListService.baseKey] })

			const previousData = queryClient.getQueryData<
				InfiniteData<BoardResponse>
			>([boardListService.baseKey, 'list'])

			queryClient.setQueryData<InfiniteData<BoardResponse>>(
				[boardListService.baseKey, 'list'],
				old =>
					old
						? {
								...old,
								pages: old.pages.map(page => ({
									...page,
									data: page.data.map(board =>
										board.id === boardId ? { ...board, isFavorite } : board
									),
								})),
						  }
						: old
			)

			return { previousData }
		},

		async onSettled() {
			await queryClient.invalidateQueries({
				queryKey: [boardListService.baseKey],
				exact: false,
			})
		},
	})

	const toggle = (boardId: number, isFavorite: boolean) =>
		updateFavoriteMutation.mutate({ boardId, isFavorite })

	return { toggle }
}
