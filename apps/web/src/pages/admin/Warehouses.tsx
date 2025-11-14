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
import { Input } from '@/components/ui/input';
import {
    useWarehouses,
    useCreateWarehouse,
    useUpdateWarehouse,
} from '@/hooks/useWarehouses';
import type { IWarehouse, ICreateWarehouseDto } from 'dto/web';
import { Card } from "@/components/ui/card";

type WarehouseFormValues = ICreateWarehouseDto;


function WarehouseForm({
                           warehouse,
                           onClose,
                       }: {
    warehouse?: IWarehouse;
    onClose: () => void;
}) {
    const { mutate: createWarehouse, isPending: isCreating } = useCreateWarehouse();
    const { mutate: updateWarehouse, isPending: isUpdating } = useUpdateWarehouse();
    const isPending = isCreating || isUpdating;

    const form = useForm<WarehouseFormValues>({
        defaultValues: {
            title: warehouse?.title || '',
            address: warehouse?.address || '',
        },
    });

    function onSubmit(values: WarehouseFormValues) {
        if (warehouse) {
            updateWarehouse({ id: warehouse.id, data: values }, { onSuccess: onClose });
        } else {
            createWarehouse(values, { onSuccess: onClose });
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Название склада</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Адрес</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
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


export default function AdminWarehousesPage() {
    const { data: warehouses, isLoading } = useWarehouses();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingWarehouse, setEditingWarehouse] = useState<IWarehouse | undefined>();

    const openDialog = (warehouse?: IWarehouse) => {
        setEditingWarehouse(warehouse);
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setEditingWarehouse(undefined);
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Управление Складами</h2>
                <DialogTrigger asChild>
                    <Button onClick={() => openDialog()}>Создать склад</Button>
                </DialogTrigger>
            </div>

            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Название</TableHead>
                            <TableHead>Адрес</TableHead>
                            <TableHead className="text-right">Действия</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow><TableCell colSpan={4}>Загрузка...</TableCell></TableRow>
                        ) : (
                            warehouses?.map((warehouse) => (
                                <TableRow key={warehouse.id}>
                                    <TableCell>{warehouse.id}</TableCell>
                                    <TableCell>{warehouse.title}</TableCell>
                                    <TableCell>{warehouse.address}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button variant="outline" size="sm" onClick={() => openDialog(warehouse)}>
                                            Редакт.
                                        </Button>
                                        {/* В API нет удаления склада] */}
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
                        {editingWarehouse ? 'Редактировать склад' : 'Создать склад'}
                    </DialogTitle>
                </DialogHeader>
                <WarehouseForm warehouse={editingWarehouse} onClose={closeDialog} />
            </DialogContent>
        </Dialog>
    );
}
