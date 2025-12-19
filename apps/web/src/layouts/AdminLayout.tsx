import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/useAuthStore';
import {
    LayoutDashboard,
    Package,
    Warehouse,
    ClipboardList,
    LogOut,
    ChevronRight
} from 'lucide-react';

export default function AdminLayout() {
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { to: "/admin", label: "Обзор", icon: LayoutDashboard, end: true },
        { to: "/admin/products", label: "Товары", icon: Package, end: false },
        { to: "/admin/warehouses", label: "Склады", icon: Warehouse, end: false },
        { to: "/admin/orders", label: "Заказы", icon: ClipboardList, end: false },
    ];

    return (
        <div className="flex min-h-screen bg-muted/30">
            {/* Сайдбар */}
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 border-r bg-background md:block">
                <div className="flex h-full flex-col gap-2">
                    {/* Кликабельный заголовок-бренд */}
                    <div className="flex h-16 items-center border-b px-6">
                        <Link
                            to="/"
                            className="text-lg font-bold tracking-tight text-primary hover:opacity-80 transition-opacity"
                        >
                            Админ-панель
                        </Link>
                    </div>

                    <nav className="flex-1 px-4 py-4 space-y-1">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                end={item.end}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                                        isActive
                                            ? "bg-primary text-primary-foreground shadow-sm"
                                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <item.icon className="h-4 w-4" />
                                        <span className="flex-1">{item.label}</span>
                                        {isActive ? <ChevronRight className="ml-auto h-4 w-4" /> : null}
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="mt-auto border-t p-4">
                        <Button
                            variant="ghost"
                            className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                            onClick={handleLogout}
                        >
                            <LogOut className="h-4 w-4" />
                            Выйти
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Контентная часть */}
            <div className="flex flex-1 flex-col md:pl-64">
                <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 px-6 backdrop-blur">
                    <Link to="/" className="text-sm font-bold text-primary md:hidden">
                        Admin panel
                    </Link>

                    <div className="hidden md:block">
                        <p className="text-sm text-muted-foreground font-medium">Система управления магазином v1.0</p>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Место для переключателя темы */}
                    </div>
                </header>

                <main className="flex-1 p-6 lg:p-10">
                    <div className="mx-auto max-w-6xl">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
