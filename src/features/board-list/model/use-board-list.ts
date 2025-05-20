import { useQuery } from '@tanstack/react-query'
import { boardListService } from './board-list.service'

export const useBoards = () => {
	const { data, isLoading, error } = useQuery({
		...boardListService.getBoardsQueryOptions(),
	})

	return {
		boards: data?.data,
		isLoading,
		error,
	}
}
