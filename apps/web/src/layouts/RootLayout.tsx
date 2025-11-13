import { Outlet } from 'react-router-dom'

export default function RootLayout() {
    return (
        // Глобальный контейнер
        <main className="min-h-screen">
            {/* (Здесь можно добавить Header или Navbar) */}
            <Outlet /> {/* Здесь будут рендериться наши страницы (Login, Home и т.д.) */}
        </main>
    )
}
