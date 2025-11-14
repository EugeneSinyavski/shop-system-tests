// TODO: Refactor to Zod

export interface ICreateOrderItemDto {
    product_id: number;
    quantity: number;
}

export interface ICreateOrderDto {
    items: ICreateOrderItemDto[];
}

export interface IUpdateOrderDto {
    status: any;
}
