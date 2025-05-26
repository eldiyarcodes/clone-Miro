import { ROUTES } from '@/shared/model/routes'
import { Button } from '@/shared/ui/kit/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/shared/ui/kit/dropdown-menu'
import { MoreHorizontalIcon } from 'lucide-react'
import { href, Link } from 'react-router-dom'
import type { BoardDto } from '../model/board-list.types'

export function BoardListItem({
	board,
	rightActions,
	menuActions,
}: {
	board: BoardDto
	rightActions: React.ReactNode
	menuActions: React.ReactNode
}) {
	return (
		<div className='flex items-center gap-4 p-4 border-b border-b-gray-100'>
			<div className='flex-grow min-w-0'>
				<Button
					asChild
					variant={'link'}
					className='text-left justify-start h-auto p-0'
				>
					<Link to={href(ROUTES.BOARD, { boardId: String(board.id) })}>
						<span className='text-lg font-medium truncate block'>
							{board.name}
						</span>
					</Link>
				</Button>
				<div className='flex flex-col text-sm text-gray-500 mt-1'>
					<div>Создано {new Date(board.createdAt).toLocaleDateString()}</div>
					<div>
						Последнее открытие{' '}
						{new Date(board.lastOpenedAt).toLocaleDateString()}
					</div>
				</div>
			</div>
			<div className='flex items-center gap-2'>
				{rightActions}
				{menuActions && (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant={'ghost'} size={'icon'}>
								<MoreHorizontalIcon className='h-4 w-4' />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>{menuActions}</DropdownMenuContent>
					</DropdownMenu>
				)}
			</div>
		</div>
	)
}
