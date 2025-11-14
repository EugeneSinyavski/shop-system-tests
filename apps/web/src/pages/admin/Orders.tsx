import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { useAdminOrders, useUpdateOrderStatus } from '@/hooks/useAdminOrders';
import type { IOrder } from 'dto/web';

const ALL_STATUSES = ['PENDING', 'SHIPPED', 'DELIVERED', 'CANCELED'];

function OrderStatusSelector({ order }: { order: IOrder }) {
    const { mutate: updateStatus, isPending } = useUpdateOrderStatus();

    const handleStatusChange = (newStatus: string) => {
        updateStatus({
            id: order.id,
            data: { status: newStatus },
        });
    };

    return (
        <Select
            defaultValue={order.status}
            onValueChange={handleStatusChange}
            disabled={isPending}
        >
            <SelectTrigger className="w-[160px]">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {ALL_STATUSES.map((status) => (
                    <SelectItem key={status} value={status}>
                        {status}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

export default function AdminOrdersPage() {
    const { data: orders, isLoading } = useAdminOrders();

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Управление Заказами</h2>
            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Дата</TableHead>
                            <TableHead>Покупатель (Email)</TableHead>
                            <TableHead>Статус</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow><TableCell colSpan={4}>Загрузка...</TableCell></TableRow>
                        ) : (
                            orders?.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell>#{order.id}</TableCell>
                                    <TableCell>
                                        {new Date(order.orderDate).toLocaleDateString('ru-RU')}
                                    </TableCell>
                                    <TableCell>{order.user_id}</TableCell>
                                    <TableCell>
                                        <OrderStatusSelector order={order} />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}
