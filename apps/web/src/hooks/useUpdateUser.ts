import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/useAuthStore';
import type { IUpdateUserDto, IUser } from 'dto/web';


async function updateUserAPI(
    payload: IUpdateUserDto,
    userId: number,
): Promise<IUser> {
    const response = await fetch(`/api/auth/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Не удалось обновить профиль. Email или username могут быть заняты.');
    }
    return response.json();
}


export function useUpdateUser() {
    const user = useAuthStore((state) => state.user);
    const login = useAuthStore((state) => state.login);
    const userId = user?.id;

    return useMutation({
        mutationFn: (data: IUpdateUserDto) => {
            if (!userId) {
                throw new Error('Пользователь не авторизован');
            }
            return updateUserAPI(data, userId);
        },
        onSuccess: (updatedUser) => {
            login(updatedUser);
            toast.success('Профиль успешно обновлен!');
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
}
