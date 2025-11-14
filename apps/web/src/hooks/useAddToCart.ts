import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/useAuthStore';
import type { IUpdateBucketDto } from 'dto/web';

async function addToCartAPI(
    payload: IUpdateBucketDto,
    userId: number,
) {
    const response = await fetch(`/api/bucket/${userId}/addProduct`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error('Не удалось добавить товар. Возможно, он уже в корзине.');
    }
    return response.json();
}

export function useAddToCart() {
    const queryClient = useQueryClient();
    const user = useAuthStore((state) => state.user);

    return useMutation({
        mutationFn: (productId: number) => {
            if (!user) {
                throw new Error('Пользователь не авторизован');
            }
            return addToCartAPI({ productId }, user.id);
        },
        onSuccess: () => {
            toast.success('Товар добавлен в корзину');
            // TODO: Мы можем инвалидировать кэш корзины, когда он у нас появится
            // queryClient.invalidateQueries({ queryKey: ['bucket'] });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
}
