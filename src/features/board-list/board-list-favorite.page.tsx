import { useState } from 'react'
import { BoardCard, BoardItem } from './compose'
import type { ViewMode } from './model/board-list.types'
import { useBoardList } from './model/use-board-list'
import {
	BoardListLayout,
	BoardListLayoutContent,
	BoardListLayoutHeader,
} from './view/board-list-layout'
import { BoardListSidebar } from './view/sidebar'
import { ViewModeToggle } from './view/view-mode-toggle'

function BoardListFavoritePage() {
	const boardListQuery = useBoardList({
		isFavorite: true,
	})

	const [viewMode, setViewMode] = useState<ViewMode>('list')

	return (
		<BoardListLayout
			sidebar={<BoardListSidebar />}
			header={
				<BoardListLayoutHeader
					title='Избранные доски'
					description='Здесь вы можете просматривать и управлять своими избранными досками'
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

export const Component = BoardListFavoritePage
