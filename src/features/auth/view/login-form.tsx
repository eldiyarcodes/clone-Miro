import { Button } from '@/shared/ui/kit/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/shared/ui/kit/form'
import { Input } from '@/shared/ui/kit/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { authSchemas } from '../lib/auth.schemas'
import { useLogin } from '../model/use-login'

export function LoginForm() {
	const form = useForm({
		resolver: zodResolver(authSchemas.login),
	})

	const { login, isPending } = useLogin()

	return (
		<Form {...form}>
			<form className='flex flex-col gap-4' onSubmit={form.handleSubmit(login)}>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder='example@icloud.com' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input type='password' placeholder='******' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button disabled={isPending} type='submit' className='cursor-pointer'>
					Войти
				</Button>
			</form>
		</Form>
	)
}
