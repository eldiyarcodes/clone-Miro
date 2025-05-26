import { DropdownMenuItem } from '@/shared/ui/kit/dropdown-menu'
import type { BoardDto } from '../model/board-list.types'
import { useDeleteBoard } from '../model/use-delete-board'
import { useUpdateFavorite } from '../model/use-update-favorite'
import { BoardFavoriteToggle } from '../view/board-favorite-toggle'
import { BoardListItem } from '../view/board-list-item'

export function BoardItem({ board }: { board: BoardDto }) {
	const updateFavorite = useUpdateFavorite()
	const deleteBoard = useDeleteBoard()

	return (
		<BoardListItem
			key={board.id}
			board={board}
			rightActions={
				<BoardFavoriteToggle
					isFavorite={updateFavorite.isOptimisticFavorite(board)}
					onToggle={() => updateFavorite.toggle(board)}
				/>
			}
			menuActions={
				<DropdownMenuItem
					variant='destructive'
					disabled={deleteBoard.getIsPending(board.id)}
					onClick={() => deleteBoard.handleDelete(board.id)}
				>
					Удалить
				</DropdownMenuItem>
			}
		/>
	)
}
