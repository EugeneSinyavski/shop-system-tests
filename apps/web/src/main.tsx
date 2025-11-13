import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'

import './index.css'

import LoginPage from './pages/Login'
import RootLayout from "@/layouts/RootLayout";
import RegisterPage from './pages/Register'

const queryClient = new QueryClient()

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            // { path: '/', element: <HomePage /> },
            { path: '/login', element: <LoginPage /> },
            { path: '/register', element: <RegisterPage /> },
        ],
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <Toaster richColors /> {/* Для уведомлений */}
        </QueryClientProvider>
    </React.StrictMode>,
)
