import { Skeleton } from '@/shared/ui/kit/skeleton'
import type { RefCallback } from 'react'
import type { ViewMode } from '../model/board-list.types'

export function BoardListLayout({
	header,
	children,
	filters,
	sidebar,
}: {
	header: React.ReactNode
	children: React.ReactNode
	filters?: React.ReactNode
	sidebar?: React.ReactNode
}) {
	return (
		<div className='container mx-auto'>
			<div className='flex gap-4'>
				{sidebar}
				<div className='flex-1 flex flex-col gap-6 p-4'>
					{header}
					{filters}
					{children}
				</div>
			</div>
		</div>
	)
}

export function BoardListLayoutHeader({
	title,
	description,
	actions,
}: {
	title: string
	description?: string
	actions?: React.ReactNode
}) {
	return (
		<div className='flex items-center justify-between'>
			<div className=''>
				<h1 className='text-2xl font-bold'>{title}</h1>
				{description && <p className='text-gray-500'>{description}</p>}
			</div>
			{actions}
		</div>
	)
}

export function BoardListLayoutFilters({
	sort,
	actions,
	filters,
}: {
	sort?: React.ReactNode
	filters: React.ReactNode
	actions?: React.ReactNode
}) {
	return (
		<div className='flex items-center gap-4'>
			{filters && (
				<div className='flex items-center gap-2'>
					<span className='text-gray-500 text-sm whitespace-nowrap'>
						Filter by
					</span>
					{filters}
				</div>
			)}
			{sort && (
				<div className='flex items-center gap-2'>
					<span className='text-gray-500 text-sm whitespace-nowrap'>
						Sort by
					</span>
					{sort}
				</div>
			)}
			{actions && <div className='ml-auto'>{actions}</div>}
		</div>
	)
}

export function BoardListLayoutContent({
	children,
	isEmpty,
	isPending,
	isPendingNext,
	hasCursor,
	cursorRef,
	mode,
	renderGrid,
	renderList,
}: {
	children?: React.ReactNode
	isEmpty?: boolean
	isPending?: boolean
	hasCursor?: boolean
	isPendingNext?: boolean
	cursorRef: RefCallback<HTMLDivElement>
	mode: ViewMode
	renderList?: () => React.ReactNode
	renderGrid?: () => React.ReactNode
}) {
	return (
		<div>
			{isPending && <h1 className='text-center py-10'>LOADING...</h1>}

			{mode === 'cards' && renderGrid && (
				<BoardListLayoutCards>{renderGrid()}</BoardListLayoutCards>
			)}

			{mode === 'list' && renderList && (
				<BoardListLayoutList>{renderList()}</BoardListLayoutList>
			)}

			{!isPending && children}

			{isEmpty && !isPending && (
				<div className='text-center py-8'>Доски не найдены</div>
			)}

			{hasCursor && (
				<div ref={cursorRef} className='text-center py-8'>
					{isPendingNext &&
						{
							list: <Skeleton className='h-10 w-full' />,
							cards: <Skeleton className='h-10 w-full' />,
						}[mode]}
				</div>
			)}
		</div>
	)
}

export function BoardListLayoutCards({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
			{children}
		</div>
	)
}

export function BoardListLayoutList({
	children,
}: {
	children: React.ReactNode
}) {
	return <div className='flex flex-col gap-2'>{children}</div>
}

export function BoardslayoutContentGroups({
	groups,
}: {
	groups: {
		items: React.ReactNode
		title: string
	}[]
}) {
	return (
		<div className='flex flex-col gap-2'>
			{groups.map(group => (
				<div key={group.title}>
					<div className='text-lg font-bold mb-2'>{group.title}</div>
					{group.items}
					<br />
				</div>
			))}
		</div>
	)
}
