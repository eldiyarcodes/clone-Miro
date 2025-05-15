import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/shared/ui/kit/card'

function LoginPage() {
	return (
		<div className='grow flex flex-col items-center pt-[100px] justify-center'>
			<Card className='w-full max-w-[400px]'>
				<CardHeader>
					<CardTitle>Вход в систему</CardTitle>
					<CardDescription>
						Введите ваш email и пароль для входа в систему
					</CardDescription>
				</CardHeader>
			</Card>
		</div>
	)
}

export const Component = LoginPage
