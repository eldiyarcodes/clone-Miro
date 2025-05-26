import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/ui/kit/select'
import type { BoardSortOption } from '../model/board-list.types'

export function BoardSort({
	value,
	onChange,
}: {
	value: BoardSortOption
	onChange: (value: BoardSortOption) => void
}) {
	return (
		<Select
			value={value}
			onValueChange={value => onChange(value as BoardSortOption)}
		>
			<SelectTrigger id='sort' className='w-full'>
				<SelectValue placeholder='Сортировка' />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value='lastOpenedAt'>По дате открытия</SelectItem>
				<SelectItem value='createdAt'>По дате создания</SelectItem>
				<SelectItem value='updatedAt'>По дате обновления</SelectItem>
				<SelectItem value='name'>По имени</SelectItem>
			</SelectContent>
		</Select>
	)
}
