// TODO: Refactor to Zod

export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    urlImage: string;
    category: any; // TODO:Category
    createdAt: string;
    updatedAt: string;
}

export interface ICreateProductDto {
    name: string;
    description: string;
    price: number;
    category: any; // TODO: Category
    urlImage: string;
}

export interface IUpdateProductDto {
    name?: string;
    description?: string;
    price?: number;
    category?: any;
    urlImage?: string;
}
