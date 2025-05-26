import { useDebouncedValue } from '@/shared/lib/hooks'
import { Button } from '@/shared/ui/kit/button'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { BoardCard, BoardItem } from './compose'
import type { ViewMode } from './model/board-list.types'
import { useBoardFilter } from './model/use-board-filters'
import { useBoardList } from './model/use-board-list'
import { useCreateBoard } from './model/use-create-board'
import {
	BoardListLayout,
	BoardListLayoutContent,
	BoardListLayoutFilters,
	BoardListLayoutHeader,
} from './view/board-list-layout'
import { BoardSearch } from './view/board-search'
import { BoardSort } from './view/board-sort'
import { BoardListSidebar } from './view/sidebar'
import { ViewModeToggle } from './view/view-mode-toggle'

function BoardListPage() {
	const boardFilter = useBoardFilter()
	const createBoard = useCreateBoard()

	const boardListQuery = useBoardList({
		sort: boardFilter.sort,
		search: useDebouncedValue(boardFilter.search, 300),
	})

	const [viewMode, setViewMode] = useState<ViewMode>('list')

	return (
		<BoardListLayout
			sidebar={<BoardListSidebar />}
			header={
				<BoardListLayoutHeader
					title='Доски'
					description='Здесь вы можете просматривать и управлять своими досками'
					actions={
						<Button
							onClick={createBoard.handleCreate}
							disabled={createBoard.isPending}
						>
							<PlusIcon />
							Создать доску
						</Button>
					}
				/>
			}
			filters={
				<BoardListLayoutFilters
					sort={
						<BoardSort
							value={boardFilter.sort}
							onChange={boardFilter.setSort}
						/>
					}
					filters={
						<BoardSearch
							value={boardFilter.search}
							onChange={boardFilter.setSearch}
						/>
					}
					actions={
						<ViewModeToggle
							value={viewMode}
							onChange={value => setViewMode(value)}
						/>
					}
				/>
			}
		>
			<BoardListLayoutContent
				isPending={boardListQuery.isPending}
				isEmpty={boardListQuery.boards?.length === 0}
				hasCursor={boardListQuery.hasNextPage}
				isPendingNext={boardListQuery.isFetchingNextPage}
				cursorRef={boardListQuery.cursorRef}
				mode={viewMode}
				renderGrid={() =>
					boardListQuery.boards?.map(board => (
						<BoardCard key={board.id} board={board} />
					))
				}
				renderList={() =>
					boardListQuery.boards?.map(board => (
						<BoardItem key={board.id} board={board} />
					))
				}
			/>
		</BoardListLayout>
	)
}

export const Component = BoardListPage
