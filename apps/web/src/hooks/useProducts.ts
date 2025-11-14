import { useQuery } from '@tanstack/react-query';
import type { IProduct } from 'dto/web';

async function fetchProducts(): Promise<IProduct[]> {
    const response = await fetch('/api/product');
    if (!response.ok) {
        throw new Error('Не удалось загрузить продукты');
    }
    return response.json();
}

export function useProducts() {
    return useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });
}
