// apps/web/src/pages/Login.tsx
import { LoginForm } from '@/components/auth/LoginForm' // (Создадим сейчас)

export default function LoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <LoginForm />
        </div>
    )
}
