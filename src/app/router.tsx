import { AppHeader } from '@/features/header'
import { ROUTES } from '@/shared/model/routes'
import { createBrowserRouter, redirect } from 'react-router-dom'
import { App } from './app'
import { protectedLoader, ProtectedRoute } from './protected-route'
import { Providers } from './providers'

export const router = createBrowserRouter([
	{
		element: (
			<Providers>
				<App />
			</Providers>
		),
		children: [
			{
				loader: protectedLoader,
				element: (
					<>
						<AppHeader />
						<ProtectedRoute />
					</>
				),
				children: [
					{
						path: ROUTES.BOARDS,
						lazy: () => import('@/features/board-list/board-list.page'),
					},
					{
						path: ROUTES.FAVORITE_BOARDS,
						lazy: () =>
							import('@/features/board-list/board-list-favorite.page'),
					},
					{
						path: ROUTES.RECENT_BOARDS,
						lazy: () => import('@/features/board-list/board-list-recent.page'),
					},
					{
						path: ROUTES.BOARD,
						lazy: () => import('@/features/board/board.page'),
					},
				],
			},
			{
				path: ROUTES.LOGIN,
				lazy: () => import('@/features/auth/login.page'),
			},
			{
				path: ROUTES.REGISTER,
				lazy: () => import('@/features/auth/register.page'),
			},
			{
				path: ROUTES.HOME,
				loader: () => redirect(ROUTES.BOARDS),
			},
		],
	},
])
