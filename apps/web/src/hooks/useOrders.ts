import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/store/useAuthStore';
import type { IOrder } from 'dto/web';


async function fetchOrders(userId: number): Promise<IOrder[]> {
    const response = await fetch(`/api/order/${userId}`);
    if (!response.ok) {
        throw new Error('Не удалось загрузить заказы');
    }
    return response.json();
}

export function useOrders() {
    const user = useAuthStore((state) => state.user);
    const userId = user?.id;

    return useQuery({
        queryKey: ['orders', userId],
        queryFn: () => fetchOrders(userId!),
        enabled: !!userId,
    });
}
