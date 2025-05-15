import { useQuery } from '@tanstack/react-query'
import { boardListApi } from './board-list.api'

export const useBoards = () => {
	const { data, isLoading, error } = useQuery({
		...boardListApi.getBoardsQueryOptions(),
	})

	return {
		boards: data?.data,
		isLoading,
		error,
	}
}
