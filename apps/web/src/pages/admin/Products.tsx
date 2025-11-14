import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'; //
import { Input } from '@/components/ui/input';
import { useProducts } from '@/hooks/useProducts';
import {
    useCreateProduct,
    useUpdateProduct,
    useDeleteProduct,
} from '@/hooks/useMutateProduct';
import type { IProduct, ICreateProductDto } from 'dto/web';
import { Card } from "@/components/ui/card";

type ProductFormValues = ICreateProductDto;

function ProductForm({
                         product,
                         onClose,
                     }: {
    product?: IProduct;
    onClose: () => void;
}) {
    const { mutate: createProduct, isPending: isCreating } = useCreateProduct();
    const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();
    const isPending = isCreating || isUpdating;

    const form = useForm<ProductFormValues>({
        defaultValues: {
            name: product?.name || '',
            description: product?.description || '',
            price: product?.price || 0,
            urlImage: product?.urlImage || '',
            category: product?.category || 'ELECTRONICS', //
        },
    });

    function onSubmit(values: ProductFormValues) {
        const payload = { ...values, price: Number(values.price) };

        if (product) {
            updateProduct({ id: product.id, data: payload }, { onSuccess: onClose });
        } else {
            createProduct(payload, { onSuccess: onClose });
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Название</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Описание</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Цена (руб.)</FormLabel>
                            <FormControl><Input type="number" step="0.01" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="urlImage"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>URL Изображения</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Категория</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="ELECTRONICS">Электроника</SelectItem>
                                    <SelectItem value="BOOKS">Книги</SelectItem>
                                    <SelectItem value="CLOTHING">Одежда</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="ghost">Отмена</Button>
                    </DialogClose>
                    <Button type="submit" disabled={isPending}>
                        {isPending ? 'Сохранение...' : 'Сохранить'}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    );
}


export default function AdminProductsPage() {
    const { data: products, isLoading } = useProducts();
    const { mutate: deleteProduct } = useDeleteProduct();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<IProduct | undefined>();

    const openDialog = (product?: IProduct) => {
        setEditingProduct(product);
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setEditingProduct(undefined);
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Управление Товарами</h2>
                <DialogTrigger asChild>
                    <Button onClick={() => openDialog()}>Создать товар</Button>
                </DialogTrigger>
            </div>

            {/* --- ТАБЛИЦА --- */}
            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Название</TableHead>
                            <TableHead>Цена</TableHead>
                            <TableHead>Категория</TableHead>
                            <TableHead className="text-right">Действия</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow><TableCell colSpan={5}>Загрузка...</TableCell></TableRow>
                        ) : (
                            products?.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>{product.id}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.price} руб.</TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button variant="outline" size="sm" onClick={() => openDialog(product)}>
                                            Редакт.
                                        </Button>
                                        <Button variant="destructive" size="sm" onClick={() => deleteProduct(product.id)}>
                                            Удалить
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </Card>

            {/* --- МОДАЛЬНОЕ ОКНО --- */}
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {editingProduct ? 'Редактировать товар' : 'Создать новый товар'}
                    </DialogTitle>
                </DialogHeader>
                <ProductForm product={editingProduct} onClose={closeDialog} />
            </DialogContent>
        </Dialog>
    );
}
