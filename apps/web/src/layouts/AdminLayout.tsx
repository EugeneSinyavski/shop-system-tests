// apps/web/src/layouts/AdminLayout.tsx
import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
    return (
        <div className="container mx-auto p-4">
            {/* Здесь будет боковое меню (Sidebar)
        и основной контент (<Outlet />)
      */}
            <h1 className="mb-6 text-3xl font-bold">Панель Администратора</h1>

            {/* (TODO: Добавить Sidebar) */}

            <main>
                <Outlet /> {/* Здесь будут рендериться /admin/dashboard, /admin/products и т.д. */}
            </main>
        </div>
    );
}
