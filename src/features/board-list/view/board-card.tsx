import { ROUTES } from '@/shared/model/routes'
import { Button } from '@/shared/ui/kit/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/shared/ui/kit/card'
import { Switch } from '@/shared/ui/kit/switch'
import { StarIcon } from 'lucide-react'
import { Link, href } from 'react-router-dom'
import type { BoardDto } from '../model/board-list.types'
import { useDeleteBoard } from '../model/use-delete-board'
import { useUpdateFavorite } from '../model/use-update-favorite'

export function BoardCard({ board }: { board: BoardDto }) {
	const { handleDelete, getIsPending } = useDeleteBoard()
	const updateFavorite = useUpdateFavorite()

	return (
		<Card className='relative'>
			<div className='absolute top-2 right-2 flex items-center gap-2'>
				<span className='text-sm text-gray-500'>
					<StarIcon />
				</span>
				<Switch
					checked={board.isFavorite}
					onCheckedChange={() =>
						updateFavorite.toggle(board.id, !board.isFavorite)
					}
				/>
			</div>

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
