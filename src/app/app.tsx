import { Outlet } from 'react-router-dom'

export function App() {
	return (
		<main className='container mx-auto min-h-screen flex flex-col'>
			<Outlet />
		</main>
	)
}
