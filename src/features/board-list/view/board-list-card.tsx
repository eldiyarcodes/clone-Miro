import { ROUTES } from '@/shared/model/routes'
import { Button } from '@/shared/ui/kit/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/shared/ui/kit/card'
import { Link, href } from 'react-router-dom'
import type { BoardDto } from '../model/board-list.types'

export function BoardListCardView({
	board,
	rightTopActions,
	bottomActions,
}: {
	board: BoardDto
	rightTopActions?: React.ReactNode
	bottomActions?: React.ReactNode
}) {
	return (
		<Card className='relative'>
			<div className='absolute top-2 right-2 flex items-center gap-2'>
				{rightTopActions && rightTopActions}
			</div>

			<CardHeader>
				<Button asChild variant={'link'}>
					<Link to={href(ROUTES.BOARD, { boardId: String(board.id) })}>
						board {board.id}
					</Link>
				</Button>
			</CardHeader>

			<CardContent>{board.name}</CardContent>

			{bottomActions && <CardFooter>{bottomActions}</CardFooter>}
		</Card>
	)
}
