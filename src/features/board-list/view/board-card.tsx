import { ROUTES } from '@/shared/model/routes'
import { Button } from '@/shared/ui/kit/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/shared/ui/kit/card'
import { Link, href } from 'react-router-dom'
import type { BoardDto } from '../model/board-list.dto'
import { useDeleteBoard } from '../model/use-delete-board'

export function BoardCard({ board }: { board: BoardDto }) {
	const { handleDelete, getIsPending } = useDeleteBoard()

	return (
		<Card>
			<CardHeader>
				<Button asChild variant={'link'}>
					<Link to={href(ROUTES.BOARD, { boardId: String(board.id) })}>
						board {board.id}
					</Link>
				</Button>
			</CardHeader>
			<CardContent>{board.name}</CardContent>
			<CardFooter>
				<Button
					disabled={getIsPending(board.id)}
					onClick={() => handleDelete(board.id)}
					variant={'destructive'}
					className='cursor-pointer'
				>
					Delete
				</Button>
			</CardFooter>
		</Card>
	)
}
