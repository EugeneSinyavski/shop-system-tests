import type { IProduct } from 'dto/web';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { useAddToCart } from '@/hooks/useAddToCart';
import { Link } from 'react-router-dom';

interface ProductCardProps {
    product: IProduct;
}

export function ProductCard({ product }: ProductCardProps) {
    const { mutate: addToCart, isPending } = useAddToCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product.id);
    };

    return (
        // 3. ОБОРАЧИВАЕМ КАРТОЧКУ В ССЫЛКУ
        <Link to={`/product/${product.id}`} className="flex">
            <Card className="flex flex-col w-full hover:border-primary">
                <CardHeader>
                    <div className="relative h-48 w-full overflow-hidden rounded-md">
                        <img
                            src={product.urlImage}
                            alt={product.name}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <CardTitle className="pt-4">{product.name}</CardTitle>
                    <CardDescription>{product.description.substring(0, 100)}...</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p className="text-2xl font-bold">{product.price} руб.</p>
                </CardContent>
                <CardFooter>
                    <Button
                        className="w-full"
                        onClick={handleAddToCart}
                        disabled={isPending}
                    >
                        {isPending ? 'Добавление...' : 'Добавить в корзину'}
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
}
