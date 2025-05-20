import { TOKENS } from '@/shared/consts/constants'
import { ROUTES } from '@/shared/model/routes'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { authService } from './auth.service'
import type { AuthData } from './types'

export function useLogin() {
	const navigate = useNavigate()

	const loginMutation = useMutation({
		mutationFn: authService.login,
		onSuccess(data) {
			localStorage.setItem(TOKENS.ACCESS, data.access_token)
			navigate(ROUTES.HOME)
		},
		onError(error) {
			if (error instanceof AxiosError) {
				toast.error(error.response?.data?.message || 'Ошибка при регистрации')
			}
		},
	})

	const login = (data: AuthData) => {
		loginMutation.mutate(data)
	}

	return {
		login,
		isPending: loginMutation.isPending,
	}
}
