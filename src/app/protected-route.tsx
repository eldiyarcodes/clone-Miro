import { ROUTES } from '@/shared/model/routes'
import { useSession } from '@/shared/model/session'
import { Navigate, Outlet } from 'react-router-dom'

export function ProtectedRoute() {
	const session = useSession(s => s.session)

	return !session ? <Navigate to={ROUTES.LOGIN} replace /> : <Outlet />
}
