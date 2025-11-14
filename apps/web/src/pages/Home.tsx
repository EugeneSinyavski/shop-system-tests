import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from '@/components/products/ProductCard';

export default function HomePage() {
    const { data: products, isLoading, isError, error } = useProducts();

    if (isLoading) {
        return (
            <div className="container mx-auto p-4">
                <p>Загрузка продуктов...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="container mx-auto p-4">
                <p className="text-destructive">Ошибка: {error.message}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="mb-6 text-3xl font-bold">Каталог</h1>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
