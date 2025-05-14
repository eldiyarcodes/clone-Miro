import { ROUTES } from '@/shared/model/routes'
import { href, Link } from 'react-router-dom'

function BoardListPage() {
	return (
		<div>
			BoardList
			<Link to={href(ROUTES.BOARD, { boardId: '1' })}>board 1</Link>
		</div>
	)
}

export const Component = BoardListPage
