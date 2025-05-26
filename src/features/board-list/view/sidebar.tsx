import { cn } from '@/shared/lib/tailwind-merge'
import { ROUTES } from '@/shared/model/routes'
import { Button } from '@/shared/ui/kit/button'
import { ClockIcon, LayoutGridIcon, StarIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

export function BoardListSidebar({ className }: { className?: string }) {
	return (
		<div className={cn(className, 'w-64 border-r p-4 space-y-4')}>
			<div className='space-y-2'>
				<div className='text-sm font-medium text-gray-500 px-2'>Навигация</div>
				<Button className='w-full justify-start' asChild variant={'ghost'}>
					<Link to={ROUTES.BOARDS}>
						<LayoutGridIcon className='mr-2 w-4 h-4' />
						Все доски
					</Link>
				</Button>
				<Button className='w-full justify-start' asChild variant={'ghost'}>
					<Link to={ROUTES.FAVORITE_BOARDS}>
						<StarIcon className='mr-2 w-4 h-4' />
						Избранные
					</Link>
				</Button>
				<Button className='w-full justify-start' asChild variant={'ghost'}>
					<Link to={ROUTES.RECENT_BOARDS}>
						<ClockIcon className='mr-2 w-4 h-4' />
						Недавние
					</Link>
				</Button>
			</div>
		</div>
	)
}
