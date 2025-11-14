import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import type { ICreateOrderDto, IBucketItem } from 'dto/web';


async function createOrderAPI(
    payload: ICreateOrderDto,
    userId: number,
) {
    const response = await fetch(`/api/order/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error('Не удалось создать заказ.');
    }
    return response.json();
}

export function useCreateOrder() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const userId = user?.id;

    return useMutation({
        mutationFn: (items: IBucketItem[]) => {
            if (!userId) {
                throw new Error('Пользователь не авторизован');
            }

            const orderItems = items.map(item => ({
                product_id: item.product_id,
                quantity: 1,
            }));

            const payload: ICreateOrderDto = { items: orderItems };

            return createOrderAPI(payload, userId);
        },
        onSuccess: () => {
            toast.success('Заказ успешно создан!');
            queryClient.invalidateQueries({ queryKey: ['bucket', userId] });

            // TODO: Перенаправить на страницу "Мои Заказы"
            navigate('/');
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
}
