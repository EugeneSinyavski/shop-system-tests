import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { IWarehouse, ICreateWarehouseDto, IUpdateWarehouseDto } from 'dto/web';


async function fetchWarehouses(): Promise<IWarehouse[]> {
    const response = await fetch('/api/warehouse');
    if (!response.ok) throw new Error('Не удалось загрузить склады');
    return response.json();
}

async function createWarehouseAPI(payload: ICreateWarehouseDto) {
    const response = await fetch('/api/warehouse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error('Не удалось создать склад');
    return response.json();
}

async function updateWarehouseAPI(warehouseId: number, payload: IUpdateWarehouseDto) {
    //]
    const response = await fetch(`/api/warehouse/${warehouseId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error('Не удалось обновить склад');
    return response.json();
}


const useWarehouseMutationSuccess = () => {
    const queryClient = useQueryClient();
    return () => {
        queryClient.invalidateQueries({ queryKey: ['warehouses'] });
    };
};

export function useWarehouses() {
    return useQuery({
        queryKey: ['warehouses'],
        queryFn: fetchWarehouses,
    });
}

export function useCreateWarehouse() {
    const onSuccess = useWarehouseMutationSuccess();
    return useMutation({
        mutationFn: createWarehouseAPI,
        onSuccess: () => {
            onSuccess();
            toast.success('Склад создан');
        },
        onError: (err) => toast.error(err.message),
    });
}

export function useUpdateWarehouse() {
    const onSuccess = useWarehouseMutationSuccess();
    return useMutation({
        mutationFn: (variables: { id: number; data: IUpdateWarehouseDto }) =>
            updateWarehouseAPI(variables.id, variables.data),
        onSuccess: () => {
            onSuccess();
            toast.success('Склад обновлен');
        },
        onError: (err) => toast.error(err.message),
    });
}
