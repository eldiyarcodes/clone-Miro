import { cn } from '@/shared/lib/tailwind-merge'
import { Button } from '@/shared/ui/kit/button'
import { StarIcon } from 'lucide-react'

export function BoardFavoriteToggle({
	isFavorite,
	className,
	onToggle,
}: {
	isFavorite: boolean
	onToggle: () => void
	className?: string
}) {
	return (
		<Button
			onClick={onToggle}
			variant={'ghost'}
			className={cn(
				className,
				'p-1 rounded-full hover:bg-gray-100 transition-colors'
			)}
		>
			<StarIcon
				className={cn(
					className,
					'w-5 h-5',
					isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'
				)}
			/>
		</Button>
	)
}
