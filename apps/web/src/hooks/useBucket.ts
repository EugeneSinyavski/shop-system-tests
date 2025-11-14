import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/store/useAuthStore';
import type { IBucket } from 'dto/web';

async function fetchBucket(userId: number): Promise<IBucket> {
    const response = await fetch(`/api/bucket/${userId}`);
    if (!response.ok) {
        throw new Error('Не удалось загрузить корзину');
    }
    return response.json();
}

export function useBucket() {
    const user = useAuthStore((state) => state.user);
    const userId = user?.id;

    return useQuery({
        queryKey: ['bucket', userId],
        queryFn: () => fetchBucket(userId!),
        enabled: !!userId,
    });
}
