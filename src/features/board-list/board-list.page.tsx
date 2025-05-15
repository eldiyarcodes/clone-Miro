import { ROUTES } from '@/shared/model/routes'
import { Button } from '@/shared/ui/kit/button'
import { Card, CardFooter, CardHeader } from '@/shared/ui/kit/card'
import { href, Link } from 'react-router-dom'

function BoardListPage() {
	return (
		<div className='p-4'>
			<h1 className='mb-2'>Board List</h1>

			<div className='grid grid-cols-3 gap-4'>
				<Card>
					<CardHeader>
						<Button asChild variant={'link'}>
							<Link to={href(ROUTES.BOARD, { boardId: '1' })}>board 1</Link>
						</Button>
					</CardHeader>
					<CardFooter>
						<Button
							variant={'destructive'}
							className='bg-rose-500 cursor-pointer hover:bg-rose-700'
						>
							Delete
						</Button>
					</CardFooter>
				</Card>
			</div>
		</div>
	)
}

export const Component = BoardListPage
