// TODO: Refactor to Zod


export interface IWarehouse {
    id: number;
    title: string;
    address: string;
}

export interface ICreateWarehouseDto {
    title: string;
    address: string;
}

export interface IUpdateWarehouseDto {
    title?: string;
    address?: string;
}
