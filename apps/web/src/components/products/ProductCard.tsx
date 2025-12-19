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

    return (
        <Link to={`/product/${product.id}`} className="group flex">
            <Card className="flex flex-col w-full transition-all duration-300 hover:shadow-lg group-hover:border-primary/50 overflow-hidden">
                <CardHeader className="p-0">
                    <div className="relative h-56 w-full overflow-hidden">
                        <img
                            src={product.urlImage}
                            alt={product.name}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                </CardHeader>
                <CardContent className="flex-grow p-4">
                    <CardTitle className="line-clamp-1 group-hover:text-primary transition-colors">
                        {product.name}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 mt-2 min-h-[40px]">
                        {product.description}
                    </CardDescription>
                    <div className="mt-4">
                        <span className="text-2xl font-bold text-primary">
                            {Intl.NumberFormat('ru-RU').format(product.price)} ₽
                        </span>
                    </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                    <Button
                        className="w-full font-semibold"
                        onClick={(e) => {
                            e.preventDefault();
                            addToCart(product.id);
                        }}
                        disabled={isPending}
                        variant={isPending ? "secondary" : "default"}
                    >
                        {isPending ? 'Добавляем...' : 'В корзину'}
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
}
