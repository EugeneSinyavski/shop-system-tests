import { useParams } from 'react-router-dom';
import { useProduct } from '@/hooks/useProduct';
import { Button } from '@/components/ui/button';
import { useAddToCart } from '@/hooks/useAddToCart';

export default function ProductDetailPage() {
    const { productId } = useParams<{ productId: string }>();

    const {
        data: product,
        isLoading,
        isError,
        error
    } = useProduct(Number(productId));

    const { mutate: addToCart, isPending } = useAddToCart();

    if (isLoading) {
        return <div className="container p-4">Загрузка продукта...</div>;
    }

    if (isError) {
        return <div className="container p-4 text-destructive">Ошибка: {error.message}</div>;
    }

    if (!product) {
        return <div className="container p-4">Продукт не найден.</div>;
    }

    const handleAddToCart = () => {
        addToCart(product.id);
    };

    return (
        <div className="container mx-auto max-w-4xl p-4">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

                {/* Изображение */}
                <div>
                    <img
                        src={product.urlImage}
                        alt={product.name}
                        className="w-full h-auto rounded-lg shadow-md object-cover"
                    />
                </div>

                {/* Информация */}
                <div className="flex flex-col gap-4">
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <p className="text-muted-foreground">{product.category}</p>

                    <p className="text-3xl font-bold">{product.price} руб.</p>

                    <Button
                        size="lg"
                        onClick={handleAddToCart}
                        disabled={isPending}
                    >
                        {isPending ? 'Добавление...' : 'Добавить в корзину'}
                    </Button>

                    <div className="mt-4">
                        <h2 className="text-xl font-semibold">Описание</h2>
                        <p className="mt-2 text-muted-foreground">{product.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
