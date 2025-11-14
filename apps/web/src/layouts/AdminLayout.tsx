import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/useAuthStore';

export default function AdminLayout() {
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Панель Администратора</h1>
                <Button variant="outline" onClick={handleLogout}>
                    Выйти
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <aside className="md:col-span-1">
                    <nav className="flex flex-col gap-2">
                        <Button asChild variant="ghost" className="justify-start">
                            <Link to="/admin">Главная</Link>
                        </Button>
                        <Button asChild variant="ghost" className="justify-start">
                            <Link to="/admin/products">Товары</Link>
                        </Button>
                        <Button asChild variant="ghost" className="justify-start">
                            <Link to="/admin/warehouses">Склады</Link>
                        </Button>
                        <Button asChild variant="ghost" className="justify-start">
                            <Link to="/admin/orders">Заказы</Link>
                        </Button>
                    </nav>
                </aside>

                <main className="md:col-span-3">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
