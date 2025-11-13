// apps/web/src/components/auth/LoginForm.tsx
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

// Типы DTO из вашего OpenAPI
import { UserLoginDto } from '@hairing/types' // Предполагая, что вы экспортируете типы

// Компоненты Shadcn/UI (предполагая, что они у вас есть)
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

// --- Тип для формы (на основе DTO) ---
type LoginFormValues = UserLoginDto // { email: string, password: string }

// --- Асинхронная функция для запроса ---
async function loginUser(data: LoginFormValues): Promise<any> {
    const response = await fetch('/api/auth/login', { // Используем наш Proxy!
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        // (401 Invalid credentials)
        throw new Error('Неверный email или пароль')
    }

    // (201 Login successful)
    return response.json() // Возвращаем токен/данные пользователя
}


export function LoginForm() {
    const navigate = useNavigate()

    // 1. Настройка формы
    const form = useForm<LoginFormValues>({
        // (Здесь можно добавить resolver, например Zod)
        defaultValues: {
            email: '',
            password: '',
        },
    })

    // 2. Настройка мутации (запроса)
    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            toast.success('Вход выполнен успешно!')
            // TODO: Сохранить токен (data.accessToken) в localStorage/cookie
            console.log('Login success:', data)
            // navigate('/') // Перенаправляем на главную
        },
        onError: (error) => {
            toast.error(error.message || 'Произошла ошибка')
        },
    })

    // 3. Обработчик отправки
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

                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
