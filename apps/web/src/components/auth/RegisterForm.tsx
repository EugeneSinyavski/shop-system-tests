import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'

import { ICreateUserDto, Role } from 'dto/web'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type RegisterFormValues = Omit<ICreateUserDto, 'role'>

async function registerUser(data: RegisterFormValues): Promise<any> {
    const payload: ICreateUserDto = {
        ...data,
        role: Role.USER,
    }

    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Email или username уже существуют')
    }

    return response.json()
}


export function RegisterForm() {
    const navigate = useNavigate()

    const form = useForm<RegisterFormValues>({
        defaultValues: {
            firstname: '',
            lastname: '',
            phoneNumber: '',
            email: '',
            username: '',
            password: '',
        },
    })

    const mutation = useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            toast.success('Регистрация прошла успешно! Теперь вы можете войти.')
            navigate('/login')
        },
        onError: (error) => {
            toast.error(error.message || 'Произошла ошибка')
        },
    })

    function onSubmit(values: RegisterFormValues) {
        mutation.mutate(values)
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Создать аккаунт</CardTitle>
                <CardDescription>
                    Введите ваши данные для регистрации.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="firstname"
                                rules={{ required: 'Имя обязательно' }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Имя</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Иван" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastname"
                                rules={{ required: 'Фамилия обязательна' }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Фамилия</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Иванов" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="email"
                            rules={{ required: 'Email обязателен' }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="user@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="username"
                            rules={{ required: 'Username обязателен' }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="ivan_ivanov" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            rules={{ required: 'Телефон обязателен' }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Телефон</FormLabel>
                                    <FormControl>
                                        <Input placeholder="+1234567890" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            rules={{ required: 'Пароль обязателен', minLength: 8 }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Пароль</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="••••••••" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full" disabled={mutation.isPending}>
                            {mutation.isPending ? 'Регистрация...' : 'Зарегистрироваться'}
                        </Button>

                        <div className="mt-4 text-center text-sm">
                            Уже есть аккаунт?{' '}
                            <Link to="/login" className="underline">
                                Войти
                            </Link>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
