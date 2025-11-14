import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

import './index.css';

import RootLayout from './layouts/RootLayout';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import HomePage from './pages/Home';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import CartPage from "@/pages/Cart";
import OrdersPage from "@/pages/Orders";
import ProductDetailPage from "@/pages/ProductDetail";
import ProfilePage from "@/pages/Profile";

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        children: [
            {
                path: '/',
                element: (
                    <ProtectedRoute>
                        <HomePage/>
                    </ProtectedRoute>
                ),
            },
            {
                path: '/profile',
                element: (<ProtectedRoute><ProfilePage/></ProtectedRoute>),
            },
            {
                path: '/cart',
                element: (<ProtectedRoute><CartPage/></ProtectedRoute>),
            },
            {
                path: '/product/:productId',
                element: (<ProtectedRoute><ProductDetailPage/></ProtectedRoute>),
            },
            {
                path: '/orders',
                element: (<ProtectedRoute><OrdersPage/></ProtectedRoute>),
            },

            { path: '/login', element: <LoginPage/> },
            { path: '/register', element: <RegisterPage/> },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
            <Toaster richColors/>
        </QueryClientProvider>
    </React.StrictMode>,
);
