import { AppHeader } from '@/features/header'
import { Outlet } from 'react-router-dom'

export function App() {
	return (
		<div>
			<AppHeader />
			<main className='container mx-auto min-h-screen flex flex-col'>
				<Outlet />
			</main>
		</div>
	)
}
