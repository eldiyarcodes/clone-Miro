import { useBoards } from '../model/use-board-list'
import { BoardCard } from './board-card'
import { CreateBoardForm } from './create-board-form'

function BoardListPage() {
	const { boards, isLoading } = useBoards()

	if (isLoading) {
		return <h1>LOADING...</h1>
	}

	return (
		<div className='p-4'>
			<h1 className='mb-2'>Board List</h1>

			<CreateBoardForm />

			<div className='grid grid-cols-3 gap-4'>
				{boards?.map(board => (
					<BoardCard key={board.id} board={board} />
				))}
			</div>
		</div>
	)
}

export const Component = BoardListPage
