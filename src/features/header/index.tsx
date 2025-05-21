import { ROUTES } from '@/shared/model/routes'
import { useSession } from '@/shared/model/session'
import { Button } from '@/shared/ui/kit/button'
import { Link } from 'react-router-dom'

export function AppHeader() {
	const session = useSession(s => s.session)
	const logout = useSession(s => s.logout)

	return (
		<header className='bg-background border-b border-border/40 shadow-sm py-3 px-4 mb-6'>
			<div className='max-w-7xl mx-auto flex items-center justify-between'>
				<div className='text-xl font-semibold'>Clone Miro</div>

				{session ? (
					<div className='flex items-center gap-4'>
						<span className='text-sm text-muted-foreground'>
							{session.email}
						</span>
						<Button
							variant={'outline'}
							size={'sm'}
							onClick={() => logout()}
							className='hover:bg-destructive/10 cursor-pointer'
						>
							Выйти
						</Button>
					</div>
				) : (
					<Button asChild variant={'link'} size={'sm'}>
						<Link to={ROUTES.LOGIN}>Войти</Link>
					</Button>
				)}
			</div>
		</header>
	)
}
