import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';

type ProtectedRouteProps = {
    children: React.ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const user = useAuthStore((state) => state.user);
    const isRehydrated = useAuthStore((state) => state.isRehydrated);

    const navigate = useNavigate();

    useEffect(() => {
        if (!isRehydrated) {
            return;
        }
        if (!user) {
            navigate('/login', { replace: true });
        }
    }, [isRehydrated, user, navigate]);

    if (!isRehydrated || !user) {
        return null;
    }

    return <>{children}</>;
}
