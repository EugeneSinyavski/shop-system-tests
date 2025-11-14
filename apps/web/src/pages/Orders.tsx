import { useOrders } from '@/hooks/useOrders';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import type { IOrder, IOrderItem } from 'dto/web';
import { Card } from '@/components/ui/card';


function OrderItem({ item }: { item: IOrderItem }) {
    return (
        <div className="flex justify-between items-center py-2">
            <div className="flex items-center gap-4">
                <img
                    src={item.product.urlImage}
                    alt={item.product.name}
                    className="h-12 w-12 rounded-md object-cover"
                />
                <div>
                    <h5 className="font-medium">{item.product.name}</h5>
                    <p className="text-sm text-muted-foreground">
                        {item.quantity} x {Number(item.product.price).toFixed(2)} руб.
                    </p>
                </div>
            </div>
            <div className="font-medium">
                {Number(item.totalCost).toFixed(2)} руб.
            </div>
        </div>
    );
}


function OrderCard({ order }: { order: IOrder }) {
    const orderDate = new Date(order.orderDate).toLocaleDateString('ru-RU');

    const totalCost = order.items.reduce((acc, item) => {
        return acc + Number(item.totalCost);
    }, 0);

    return (
        <Card className="mb-4">
            <AccordionItem value={`order-${order.id}`} className="border-b-0">
                <AccordionTrigger className="p-4 hover:no-underline">
                    <div className="flex justify-between w-full">
                        <div>
                            <h4 className="font-semibold text-lg">Заказ #{order.id}</h4>
                            <p className="text-sm text-muted-foreground">{orderDate}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-bold">{totalCost.toFixed(2)} руб.</p>
                            <p className="text-sm font-medium">{order.status}</p>
                        </div>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="p-4 pt-0">
                    <h5 className="font-semibold mb-2">Состав заказа:</h5>
                    <div className="flex flex-col gap-2 border-t pt-2">
                        {order.items.map((item) => (
                            <OrderItem key={item.id} item={item} />
                        ))}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Card>
    );
}


export default function OrdersPage() {
    const { data: orders, isLoading, isError, error } = useOrders();

    if (isLoading) {
        return <div className="container p-4">Загрузка заказов...</div>;
    }

    if (isError) {
        return <div className="container p-4 text-destructive">Ошибка: {error.message}</div>;
    }

    return (
        <div className="container mx-auto max-w-4xl p-4">
            <h1 className="mb-6 text-3xl font-bold">Мои Заказы</h1>
            {orders && orders.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                    {orders.map((order) => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                </Accordion>
            ) : (
                <p className="p-6 text-center text-muted-foreground">
                    У вас еще нет заказов.
                </p>
            )}
        </div>
    );
}
