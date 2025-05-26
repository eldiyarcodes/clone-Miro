import { useState } from 'react'
import { BoardCard, BoardItem } from './compose'
import type { BoardDto, ViewMode } from './model/board-list.types'
import { useBoardList } from './model/use-board-list'
import { useRecentGropus } from './model/use-recent-group'
import {
	BoardListLayout,
	BoardListLayoutCards,
	BoardListLayoutContent,
	BoardListLayoutHeader,
	BoardListLayoutList,
	BoardslayoutContentGroups,
} from './view/board-list-layout'
import { BoardListSidebar } from './view/sidebar'
import { ViewModeToggle } from './view/view-mode-toggle'

function BoardListRecentPage() {
	const boardListQuery = useBoardList({
		sort: 'lastOpenedAt',
	})

	const [viewMode, setViewMode] = useState<ViewMode>('list')
	const recentGroups = useRecentGropus(
		boardListQuery.boards ?? ([] as BoardDto[])
	)

	return (
		<BoardListLayout
			sidebar={<BoardListSidebar />}
			header={
				<BoardListLayoutHeader
					title='Последние доски'
					description='Здесь вы можете просматривать и управлять своими последними досками'
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
			>
				<BoardslayoutContentGroups
					groups={recentGroups.map(group => ({
						title: group.title,
						items: {
							list: (
								<BoardListLayoutList>
									{group.items.map(board => (
										<BoardItem key={board.id} board={board} />
									))}
								</BoardListLayoutList>
							),
							cards: (
								<BoardListLayoutCards>
									{group.items.map(board => (
										<BoardCard key={board.id} board={board} />
									))}
								</BoardListLayoutCards>
							),
						}[viewMode],
					}))}
				/>
			</BoardListLayoutContent>
		</BoardListLayout>
	)
}

export const Component = BoardListRecentPage
