import { useAuthStore } from '@/store/useAuthStore';

export default function HomePage() {
    const user = useAuthStore((state) => state.user);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">Добро пожаловать, {user?.firstname}!</h1>
            <p>Это главная страница магазина.</p>
        </div>
    );
}
