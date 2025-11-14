// apps/web/src/pages/admin/Dashboard.tsx
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminDashboardPage() {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Добро пожаловать!</CardTitle>
                </CardHeader>
            </Card>
            <p className="mt-4">
                Это главная страница админ-панели. Выберите раздел для управления.
            </p>
        </div>
    );
}
