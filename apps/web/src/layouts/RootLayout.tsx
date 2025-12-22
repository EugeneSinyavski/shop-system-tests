import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';
import {
    ShoppingCart,
    LayoutDashboard,
    User as UserIcon,
    Package,
    LogOut,
    ChevronDown
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function RootLayout() {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const isRehydrated = useAuthStore((state) => state.isRehydrated);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isAdmin = user?.role === 'ADMIN';

    return (
        <main className="min-h-screen flex flex-col">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="text-xl font-bold tracking-tight hover:text-primary transition-colors">
                            Shop System
                        </Link>
                    </div>

                    {isRehydrated && user && (
                        <div className="flex items-center gap-2">
                            {/* Админка (видна только админу) */}
                            {isAdmin && (
                                <Button asChild variant="ghost" size="sm" className="hidden md:flex gap-2 text-orange-600 hover:text-orange-700 hover:bg-orange-50">
                                    <Link to="/admin">
                                        <LayoutDashboard className="h-4 w-4" />
                                        Панель
                                    </Link>
                                </Button>
                            )}

                            {/* Мои заказы */}
                            <Button asChild variant="ghost" size="sm" className="gap-2">
                                <Link to="/orders">
                                    <Package className="h-4 w-4 text-muted-foreground" />
                                    <span className="hidden sm:inline">Заказы</span>
                                </Link>
                            </Button>

                            {/* Корзина */}
                            <Button asChild variant="ghost" size="icon" className="relative mr-2">
                                <Link to="/cart">
                                    <ShoppingCart className="h-5 w-5" />
                                    <span className="sr-only">Корзина</span>
                                </Link>
                            </Button>

                            <div className="h-8 w-[1px] bg-border mx-1" />

                            {/* Выпадающее меню пользователя */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-10 flex items-center gap-2 pl-2 pr-1 hover:bg-muted">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                                            {user.username.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex flex-col items-start text-left">
                                            <span className="text-sm font-medium leading-none">{user.username}</span>
                                            {isAdmin && (
                                                <span className="text-[10px] leading-tight text-orange-600 font-bold uppercase tracking-wider">
                                                    Admin
                                                </span>
                                            )}
                                        </div>
                                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">{user.firstname} {user.lastname}</p>
                                            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link to="/profile" className="cursor-pointer w-full flex items-center">
                                            <UserIcon className="mr-2 h-4 w-4" />
                                            <span>Профиль</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link to="/orders" className="cursor-pointer w-full flex items-center text-sm">
                                            <Package className="mr-2 h-4 w-4" />
                                            <span>История заказов</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={handleLogout}
                                        className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Выйти</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    )}
                </div>
            </header>

            <div className="flex-1">
                {isRehydrated ? <Outlet /> : null}
            </div>
        </main>
    );
}
