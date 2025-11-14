// apps/web/src/layouts/AdminLayout.tsx
import { Outlet, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function AdminLayout() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="mb-6 text-3xl font-bold">Панель Администратора</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* --- Боковое меню --- */}
                <aside className="md:col-span-1">
                    <nav className="flex flex-col gap-2">
                        <Button asChild variant="ghost" className="justify-start">
                            <Link to="/admin">Главная</Link>
                        </Button>
                        <Button asChild variant="ghost" className="justify-start">
                            <Link to="/admin/products">Товары</Link>
                        </Button>
                        {/* (TODO: Добавить /admin/orders, /admin/warehouses) */}
                    </nav>
                </aside>

                {/* --- Контент --- */}
                <main className="md:col-span-3">
                    <Outlet /> {/* Здесь рендерятся страницы админки */}
                </main>
            </div>
        </div>
    );
}
