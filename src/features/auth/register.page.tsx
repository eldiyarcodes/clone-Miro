import { ROUTES } from '@/shared/model/routes'
import { Link } from 'react-router-dom'
import { AuthLayout } from './view/auth-layout'
import { RegisterForm } from './view/register-form'

function RegisterPage() {
	return (
		<AuthLayout
			form={<RegisterForm />}
			title={'Регистрация'}
			description={'Введите ваш email и пароль для регистрации в системе'}
			footerText={
				<>
					Уже есть аккаунт? <Link to={ROUTES.LOGIN}>Войти</Link>
				</>
			}
		/>
	)
}

export const Component = RegisterPage
