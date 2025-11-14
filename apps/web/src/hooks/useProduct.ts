import { useQuery } from '@tanstack/react-query';
import type { IProduct } from 'dto/web';

async function fetchProduct(productId: number): Promise<IProduct> {
    const response = await fetch(`/api/product/${productId}`);
    if (!response.ok) {
        throw new Error('Не удалось загрузить продукт');
    }
    return response.json();
}

export function useProduct(productId: number) {
    return useQuery({
        queryKey: ['product', productId],
        queryFn: () => fetchProduct(productId),
        enabled: !!productId,
    });
}
