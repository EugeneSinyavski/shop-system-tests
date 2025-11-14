import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/store/useAuthStore';
import { useUpdateUser } from '@/hooks/useUpdateUser';
import type { IUpdateUserDto } from 'dto/web';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type ProfileFormValues = IUpdateUserDto;

export default function ProfilePage() {
    const currentUser = useAuthStore((state) => state.user);

    const { mutate: updateUser, isPending } = useUpdateUser();

    const form = useForm<ProfileFormValues>({
        defaultValues: {
            firstname: currentUser?.firstname || '',
            lastname: currentUser?.lastname || '',
            email: currentUser?.email || '',
            username: currentUser?.username || '',
            phoneNumber: currentUser?.phoneNumber || '',
        },
    });

    function onSubmit(values: ProfileFormValues) {
        updateUser(values);
    }

    return (
        <div className="container mx-auto max-w-2xl p-4">
            <h1 className="mb-6 text-3xl font-bold">Мой Профиль</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Редактировать данные</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="firstname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Имя</FormLabel>
                                            <FormControl><Input {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Фамилия</FormLabel>
                                            <FormControl><Input {...field} /></FormControl>
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
                                        <FormControl><Input {...field} /></FormControl>
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
                                        <FormControl><Input {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Телефон</FormLabel>
                                        <FormControl><Input {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" disabled={isPending}>
                                {isPending ? 'Сохранение...' : 'Сохранить изменения'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
