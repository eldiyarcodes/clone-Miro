import { useInfiniteQuery } from '@tanstack/react-query'
import { useCallback, type RefCallback } from 'react'
import { boardListService } from './board-list.service'
import type { BoardListParams } from './board-list.types'

export const useBoardList = ({
	limit = 10,
	isFavorite,
	search,
	sort,
}: BoardListParams) => {
	const { data, fetchNextPage, isPending, hasNextPage, isFetchingNextPage } =
		useInfiniteQuery({
			queryKey: [boardListService.baseKey, { limit, sort, search, isFavorite }],
			queryFn: ({ pageParam = 1 }) =>
				boardListService.getAllBoards({
					limit,
					sort,
					search,
					isFavorite,
					page: pageParam,
				}),
			initialPageParam: 1,
			getNextPageParam: (lastPage, _, lastPageParams) =>
				Number(lastPageParams) < lastPage.data.totalPages
					? Number(lastPageParams) + 1
					: null,
		})

	const cursorRef: RefCallback<HTMLDivElement> = useCallback(
		el => {
			const observer = new IntersectionObserver(
				entries => {
					if (entries[0].isIntersecting) {
						fetchNextPage()
					}
				},
				{ threshold: 0.5 }
			)

			if (el) {
				observer.observe(el)

				return () => observer.disconnect()
			}
		},
		[fetchNextPage]
	)

	const boards = data?.pages.flatMap(page => page.data.data ?? [])

	return {
		boards,
		cursorRef,
		isPending,
		hasNextPage,
		isFetchingNextPage,
	}
}
