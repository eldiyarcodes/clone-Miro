import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/kit/tabs'
import { ImagesIcon, ListIcon } from 'lucide-react'
import type { ViewMode } from '../model/board-list.types'

export function ViewModeToggle({
	value,
	onChange,
}: {
	value: ViewMode
	onChange: (value: ViewMode) => void
}) {
	return (
		<Tabs defaultValue={value} onValueChange={v => onChange(v as ViewMode)}>
			<TabsList>
				<TabsTrigger value='list'>
					<ListIcon />
				</TabsTrigger>
				<TabsTrigger value='cards'>
					<ImagesIcon />
				</TabsTrigger>
			</TabsList>
		</Tabs>
	)
}
