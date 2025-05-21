import { ROUTES } from '@/shared/model/routes'
import { useSession } from '@/shared/model/session'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { authService } from './auth.service'
import type { AuthData } from './types'

export function useRegister() {
	const navigate = useNavigate()
	const login = useSession(s => s.login)

	const registerMutation = useMutation({
		mutationFn: authService.register,
		onSuccess(data) {
			login(data.access_token)
			navigate(ROUTES.HOME)
		},
		onError(error) {
			if (error instanceof AxiosError) {
				toast.error(error.response?.data?.message || 'Ошибка при регистрации')
			}
		},
	})

	const register = (data: AuthData) => {
		registerMutation.mutate(data)
	}

	return {
		register,
		isPending: registerMutation.isPending,
	}
}
