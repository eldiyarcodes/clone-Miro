import { useState } from 'react'
import type { BoardSortOption } from './board-list.types'

export type BoardFilters = {
	search: string
	sort: BoardSortOption
}

export function useBoardFilter() {
	const [search, setSearch] = useState('')
	const [sort, setSort] = useState<BoardSortOption>('lastOpenedAt')

	return {
		search,
		setSearch,
		sort,
		setSort,
	}
}
