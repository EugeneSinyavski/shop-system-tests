import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { IUserLoginDto } from "dto/web";
import { useAuthStore } from "@/store/useAuthStore";

type LoginFormValues = IUserLoginDto

async function loginUser(data: LoginFormValues): Promise<any> {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        throw new Error('Неверный email или пароль')
    }
    return response.json()
}


export function LoginForm() {
    const navigate = useNavigate();
    const form = useForm<IUserLoginDto>(/* ... */);
    const login = useAuthStore((state: { login: any }) => state.login);

    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            toast.success('Вход выполнен успешно!');

            login(data);

            // TODO: /profile
            // navigate('/');
        },
        onError: (error) => {
            toast.error(error.message || 'Произошла ошибка');
        },
    });

    function onSubmit(values: LoginFormValues) {
        mutation.mutate(values)
    }

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Вход в систему</CardTitle>
                <CardDescription>
                    Введите ваш email и пароль для входа.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                        {/* --- Поле Email --- */}
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

                        {/* --- Поле Password --- */}
                        <FormField
                            control={form.control}
                            name="password"
                            rules={{ required: 'Пароль обязателен' }}
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
                            {mutation.isPending ? 'Загрузка...' : 'Войти'}
                        </Button>

                        <div className="mt-4 text-center text-sm">
                            Нет аккаунта?{' '}
                            <Link to="/register" className="underline">
                                Зарегистрироваться
                            </Link>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
