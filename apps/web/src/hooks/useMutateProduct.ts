import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { ICreateProductDto, IUpdateProductDto } from 'dto/web';


async function createProductAPI(payload: ICreateProductDto) {
    const response = await fetch('/api/product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error('Не удалось создать товар');
    return response.json();
}

async function updateProductAPI(productId: number, payload: IUpdateProductDto) {
    const response = await fetch(`/api/product/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error('Не удалось обновить товар');
    return response.json();
}

async function deleteProductAPI(productId: number) {
    const response = await fetch(`/api/product/${productId}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Не удалось удалить товар');
    return response.json();
}


const useProductMutationSuccess = () => {
    const queryClient = useQueryClient();
    return () => {
        queryClient.invalidateQueries({ queryKey: ['products'] });
    };
};

export function useCreateProduct() {
    const onSuccess = useProductMutationSuccess();
    return useMutation({
        mutationFn: createProductAPI,
        onSuccess: () => {
            onSuccess();
            toast.success('Товар успешно создан');
        },
        onError: (err) => toast.error(err.message),
    });
}

export function useUpdateProduct() {
    const onSuccess = useProductMutationSuccess();
    return useMutation({
        mutationFn: (variables: { id: number; data: IUpdateProductDto }) =>
            updateProductAPI(variables.id, variables.data),
        onSuccess: () => {
            onSuccess();
            toast.success('Товар успешно обновлен');
        },
        onError: (err) => toast.error(err.message),
    });
}

export function useDeleteProduct() {
    const onSuccess = useProductMutationSuccess();
    return useMutation({
        mutationFn: deleteProductAPI,
        onSuccess: () => {
            onSuccess();
            toast.success('Товар удален');
        },
        onError: (err) => toast.error(err.message),
    });
}
