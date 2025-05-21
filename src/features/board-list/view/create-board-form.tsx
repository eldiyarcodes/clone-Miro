import { Button } from '@/shared/ui/kit/button'
import { useCreateBoard } from '../model/use-create-board'

export function CreateBoardForm() {
	const createBoard = useCreateBoard()

	return (
		<form
			onSubmit={createBoard.handleCreate}
			className='flex items-center gap-2 mb-10'
		>
			<input
				type='text'
				name='name'
				placeholder='Name'
				className='p-1 border border-slate-400 rounded'
				required
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
	)
}
