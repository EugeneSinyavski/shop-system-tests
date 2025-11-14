import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from "lucide-react";

export default function RootLayout() {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const isRehydrated = useAuthStore((state) => state.isRehydrated);

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isAuthenticated = !!user;

    return (
        <main className="min-h-screen">
            <header className="border-b">
                <div className="container mx-auto flex h-16 items-center justify-between p-4">
                    <Link to="/" className="font-bold">Shop System</Link>

                    {isRehydrated && isAuthenticated && (
                        <div className="flex items-center gap-4">
                            <Button asChild variant="link" className="text-foreground">
                                <Link to="/profile">Привет, {user?.username}</Link>
                            </Button>

                            <Button asChild variant="link" className="text-foreground">
                                <Link to="/orders">Мои Заказы</Link>
                            </Button>

                            <Button asChild variant="ghost" size="icon">
                                <Link to="/cart">
                                    <ShoppingCart className="h-5 w-5"/>
                                    <span className="sr-only">Корзина</span>
                                </Link>
                            </Button>

                            <Button variant="outline" onClick={handleLogout}>
                                Выйти
                            </Button>
                        </div>
                    )}
                </div>
            </header>

            {isRehydrated ? <Outlet/> : null}
        </main>
    );
}
