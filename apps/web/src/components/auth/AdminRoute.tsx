import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'sonner';

type AdminRouteProps = {
    children: React.ReactNode;
};

export function AdminRoute({ children }: AdminRouteProps) {
    const user = useAuthStore((state) => state.user);
    const isRehydrated = useAuthStore((state) => state.isRehydrated);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isRehydrated) {
            return;
        }

        if (!user) {
            navigate('/login', { replace: true });
        } else if (user.role !== 'ADMIN') {
            toast.error('У вас нет прав для доступа к этому разделу.');
            navigate('/', { replace: true });
        }
    }, [isRehydrated, user, navigate]);

    if (!isRehydrated || !user || user.role !== 'ADMIN') {
        return null;
    }

    return <>{children}</>;
}
