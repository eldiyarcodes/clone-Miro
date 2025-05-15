import { ROUTES } from '@/shared/model/routes'
import { Button } from '@/shared/ui/kit/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/shared/ui/kit/card'
import { Link, href } from 'react-router-dom'
import { useBoards } from '../model/use-board-list'
import { useCreateBoard } from '../model/use-create-board'
import { useDeleteBoard } from '../model/use-delete-board'

function BoardListPage() {
	const { boards, isLoading } = useBoards()
	const { handleDelete, getIsPending } = useDeleteBoard()
	const createBoard = useCreateBoard()

	if (isLoading) {
		return <h1>LOADING...</h1>
	}

	return (
		<div className='p-4'>
			<h1 className='mb-2'>Board List</h1>

			<form
				onSubmit={createBoard.handleCreate}
				className='flex items-center gap-2 mb-4'
			>
				<input
					type='text'
					name='name'
					placeholder='Name'
					className='p-1 border border-slate-400 rounded'
				/>
				<Button
					type='submit'
					variant={'default'}
					disabled={createBoard.isLoading}
					className='cursor-pointer'
				>
					Create board
				</Button>
			</form>

			<div className='grid grid-cols-3 gap-4'>
				{boards?.map(board => (
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
								className='bg-rose-500 cursor-pointer hover:bg-rose-700'
							>
								Delete
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	)
}

export const Component = BoardListPage
