import { useBucket } from '@/hooks/useBucket';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { IBucketItem } from 'dto/web';
import { useRemoveFromCart } from "@/hooks/useRemoveFromCart";

// TODO: Вынести 'useRemoveFromCart' в отдельный хук
// TODO: Вынести 'CartItem' в отдельный компонент

function CartItem({ item }: { item: IBucketItem }) {
    const { mutate: removeFromCart, isPending } = useRemoveFromCart();

    const handleRemove = () => {
        removeFromCart(item.product_id);
    };

    return (
        <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-4">
                <img
                    src={item.product.urlImage}
                    alt={item.product.name}
                    className="h-16 w-16 rounded-md object-cover"
                />
                <div>
                    <h4 className="font-semibold">{item.product.name}</h4>
                    <p className="text-sm text-muted-foreground">
                        {item.product.price} руб.
                    </p>
                </div>
            </div>
            <Button variant="destructive" size="sm" onClick={handleRemove} disabled={isPending}>
                Удалить
            </Button>
        </div>
    );
}

export default function CartPage() {
    const { data: bucket, isLoading, isError, error } = useBucket();

    if (isLoading) {
        return <div className="container p-4">Загрузка корзины...</div>;
    }

    if (isError) {
        return <div className="container p-4 text-destructive">Ошибка: {error.message}</div>;
    }

    const items = bucket?.products || [];

    const totalCost = items.reduce((acc, item) => {
        return acc + Number(item.product.price);
    }, 0);

    return (
        <div className="container mx-auto max-w-4xl p-4">
            <h1 className="mb-6 text-3xl font-bold">Ваша Корзина</h1>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">

                {/* Список товаров */}
                <div className="md:col-span-2">
                    <Card>
                        <CardContent className="p-0">
                            {items.length > 0 ? (
                                items.map((item) => (
                                    <CartItem key={item.product_id} item={item}/>
                                ))
                            ) : (
                                <p className="p-6 text-center text-muted-foreground">
                                    Ваша корзина пуста.
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Итог (Summary) */}
                <div className="md:col-span-1">
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="mb-4 text-xl font-semibold">Итог</h2>
                            <div className="flex justify-between text-lg font-bold">
                                <span>Итого:</span>
                                <span>{totalCost.toFixed(2)} руб.</span>
                            </div>
                            <Button className="mt-6 w-full" disabled={items.length === 0}>
                                {/* POST /order/{userId} */}
                                Оформить заказ
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
