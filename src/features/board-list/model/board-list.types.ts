export type BoardDto = {
	id: number
	name: string
	description: string
	createdAt: string
	updatedAt: string
	lastOpenedAt: string
	isFavorite: boolean
}

export type BoardSortOption =
	| 'crearedAt'
	| 'updatedAt'
	| 'name'
	| 'lastOpenedAt'

export type BoardResponse = {
	total: number
	totalPages: number
	data: BoardDto[]
}

export type BoardListParams = {
	page?: number
	limit?: number
	isFavorite?: boolean
	search?: string
	sort?: BoardSortOption
}
