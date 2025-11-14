import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/useAuthStore';
import type { IUpdateBucketDto } from 'dto/web';


async function removeFromCartAPI(
    payload: IUpdateBucketDto,
    userId: number,
) {
    const response = await fetch(`/api/bucket/${userId}/removeProduct`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error('Не удалось удалить товар из корзины.');
    }
    return response.json();
}

export function useRemoveFromCart() {
    const queryClient = useQueryClient();
    const user = useAuthStore((state) => state.user);
    const userId = user?.id;

    return useMutation({
        mutationFn: (productId: number) => {
            if (!userId) {
                throw new Error('Пользователь не авторизован');
            }
            return removeFromCartAPI({ productId }, userId);
        },
        onSuccess: () => {
            toast.success('Товар удален из корзины');
            queryClient.invalidateQueries({ queryKey: ['bucket', userId] });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
}
