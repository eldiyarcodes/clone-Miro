import { z } from 'zod'

export const authSchemas = {
	login: z.object({
		email: z
			.string({ required_error: 'Email обязателен' })
			.email('Неверный email'),
		password: z
			.string({ required_error: 'Пароль обязателен' })
			.min(6, 'Пароль должен быть не менее 6 символов'),
	}),

	register: z
		.object({
			email: z
				.string({ required_error: 'Email обязателен' })
				.email('Неверный email'),
			password: z
				.string({ required_error: 'Пароль обязателен' })
				.min(6, 'Пароль должен быть не менее 6 символов'),
			confirmPassword: z.string().optional(),
		})
		.refine(data => data.password === data.confirmPassword, {
			path: ['confirmPassword'],
			message: 'Пароли не совпадают',
		}),
}
