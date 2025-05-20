import { ROUTES } from '@/shared/model/routes'
import { Link } from 'react-router-dom'
import { AuthLayout } from './view/auth-layout'
import { LoginForm } from './view/login-form'

function LoginPage() {
	return (
		<AuthLayout
			form={<LoginForm />}
			title={'Вход в систему'}
			description={'Введите ваш email и пароль для входа в систему'}
			footerText={
				<>
					Нет аккаунта? <Link to={ROUTES.REGISTER}>Зарегистрироваться</Link>
				</>
			}
		/>
	)
}

export const Component = LoginPage
