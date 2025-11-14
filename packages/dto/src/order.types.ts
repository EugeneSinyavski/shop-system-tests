// TODO: Refactor to Zod

import { IProduct } from "./product.types";

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

export interface IOrderItem {
    id: number;
    quantity: number;
    totalCost: number;
    product_id: number;
    ordering_id: number;
    product: IProduct;
}

export interface IOrder {
    id: number;
    orderDate: string;
    status: string; // TODO: Enum OrderStatus
    user_id: number;
    items: IOrderItem[];
}
