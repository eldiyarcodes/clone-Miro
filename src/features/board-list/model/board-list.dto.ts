export type BoardDto = {
	id: number
	name: string
	description: string
	createdAt: string
	updatedAt: string
}

export type BoardResponse = {
	status: string
	data: BoardDto[]
}
