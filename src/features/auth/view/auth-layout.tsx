import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/shared/ui/kit/card'
import type React from 'react'

export function AuthLayout({
	form,
	title,
	description,
	footerText,
}: {
	form: React.ReactNode
	title: React.ReactNode
	description: React.ReactNode
	footerText: React.ReactNode
}) {
	return (
		<div className='grow flex flex-col pt-[200px] items-center'>
			<Card className='w-full max-w-[400px]'>
				<CardHeader>
					<CardTitle>{title}</CardTitle>
					<CardDescription>{description}</CardDescription>
				</CardHeader>
				<CardContent>{form}</CardContent>
				<CardFooter className='flex justify-center'>
					<p className='text-sm text-muted-foreground [&_a]:underline [&_a]:text-primary'>
						{footerText}
					</p>
				</CardFooter>
			</Card>
		</div>
	)
}
