import { Button } from '@/shared/ui/kit/button'
import type { BoardDto } from '../model/board-list.types'
import { useDeleteBoard } from '../model/use-delete-board'
import { useUpdateFavorite } from '../model/use-update-favorite'
import { BoardFavoriteToggle } from '../view/board-favorite-toggle'
import { BoardListCardView } from '../view/board-list-card'

export function BoardCard({ board }: { board: BoardDto }) {
	const updateFavorite = useUpdateFavorite()
	const deleteBoard = useDeleteBoard()

	return (
		<BoardListCardView
			key={board.id}
			board={board}
			rightTopActions={
				<BoardFavoriteToggle
					isFavorite={updateFavorite.isOptimisticFavorite(board)}
					onToggle={() => updateFavorite.toggle(board)}
				/>
			}
			bottomActions={
				<Button
					disabled={deleteBoard.getIsPending(board.id)}
					onClick={() => deleteBoard.handleDelete(board.id)}
					variant={'destructive'}
					className='cursor-pointer'
				>
					Delete
				</Button>
			}
		/>
	)
}
