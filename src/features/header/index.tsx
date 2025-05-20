import { ROUTES } from '@/shared/model/routes'
import { Button } from '@/shared/ui/kit/button'
import { useNavigate } from 'react-router-dom'
import { authService } from '../auth'

export function AppHeader() {
	const navigate = useNavigate()

	return (
		<header className='flex items-center justify-around py-4 border-b border-b-slate-300'>
			AppHeader{' '}
			<Button
				type='button'
				variant={'outline'}
				onClick={() => {
					authService.logout()
					navigate(ROUTES.LOGIN)
				}}
			>
				Выйти
			</Button>{' '}
		</header>
	)
}
