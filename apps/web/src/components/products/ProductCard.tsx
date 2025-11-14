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

interface ProductCardProps {
    product: IProduct;
}

export function ProductCard({ product }: ProductCardProps) {
    // TODO: useMutation  'onClick'
    const handleAddToCart = () => {
        console.log('Добавить в корзину:', product.id);
        //POST /api/bucket/{userId}/addProduct
    };

    return (
        <Card className="flex flex-col">
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
                <Button className="w-full" onClick={handleAddToCart}>
                    Добавить в корзину
                </Button>
            </CardFooter>
        </Card>
    );
}
