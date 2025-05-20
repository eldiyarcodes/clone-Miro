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
import { useRegister } from '../model/use-register'

export function RegisterForm() {
	const form = useForm({
		resolver: zodResolver(authSchemas.register),
	})

	const { register, isPending } = useRegister()

	const onSubmit = form.handleSubmit(data => {
		register({
			email: data.email,
			password: data.password,
		})
	})

	return (
		<Form {...form}>
			<form className='flex flex-col gap-4' onSubmit={onSubmit}>
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
							<FormLabel>Пароль</FormLabel>
							<FormControl>
								<Input type='password' placeholder='******' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='confirmPassword'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Подтвердите пароль</FormLabel>
							<FormControl>
								<Input type='password' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button disabled={isPending} type='submit' className='cursor-pointer'>
					Зарегистрироваться
				</Button>
			</form>
		</Form>
	)
}
