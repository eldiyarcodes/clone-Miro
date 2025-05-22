import { Input } from '@/shared/ui/kit/input'
import { Label } from '@/shared/ui/kit/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/ui/kit/select'
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/kit/tabs'
import { useState } from 'react'
import { useBoards } from './model/use-board-list'
import { BoardCard } from './view/board-card'
import { CreateBoardForm } from './view/create-board-form'

function BoardListPage() {
	const [search, setSearch] = useState('')
	const [sort, setSort] = useState('')

	const { boards, isLoading } = useBoards()

	if (isLoading) {
		return <h1>LOADING...</h1>
	}

	return (
		<div className='p-4'>
			<h1 className='mb-2'>Board List</h1>

			<div className='mb-8 grid grid-cols-1 md:grid-cols-4 gap-4'>
				<div className='md:col-span-3'>
					<Label htmlFor='search' className='mb-2'>
						Поиск
					</Label>
					<Input
						id='search'
						placeholder='Введите название доски ...'
						value={search}
						onChange={e => setSearch(e.target.value)}
						className='w-full'
					/>
				</div>
				<div className='flex flex-col '>
					<Label htmlFor='sort' className='mb-2'>
						Сортировка
					</Label>
					<Select value={sort} onValueChange={value => setSort(value)}>
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
				</div>
			</div>

			<Tabs defaultValue='all' className='mb-6'>
				<TabsList>
					<TabsTrigger value='all' onClick={() => {}}>
						Все доски
					</TabsTrigger>
					<TabsTrigger value='favorites' onClick={() => {}}>
						Избранные
					</TabsTrigger>
				</TabsList>
			</Tabs>

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
