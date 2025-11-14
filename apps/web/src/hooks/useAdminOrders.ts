import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { IOrder, IUpdateOrderDto } from 'dto/web';


async function fetchAllOrders(): Promise<IOrder[]> {
    const response = await fetch('/api/order');
    if (!response.ok) throw new Error('Не удалось загрузить все заказы');
    return response.json();
}

async function updateStatusAPI(orderId: number, payload: IUpdateOrderDto) {
    const response = await fetch(`/api/order/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error('Не удалось обновить статус');
    return response.json();
}


const useOrdersMutationSuccess = () => {
    const queryClient = useQueryClient();
    return () => {
        queryClient.invalidateQueries({ queryKey: ['adminOrders'] });
        queryClient.invalidateQueries({ queryKey: ['orders'] });
    };
};

export function useAdminOrders() {
    return useQuery({
        queryKey: ['adminOrders'],
        queryFn: fetchAllOrders,
    });
}

export function useUpdateOrderStatus() {
    const onSuccess = useOrdersMutationSuccess();
    return useMutation({
        mutationFn: (variables: { id: number; data: IUpdateOrderDto }) =>
            updateStatusAPI(variables.id, variables.data),
        onSuccess: () => {
            onSuccess();
            toast.success('Статус заказа обновлен');
        },
        onError: (err) => toast.error(err.message),
    });
}
