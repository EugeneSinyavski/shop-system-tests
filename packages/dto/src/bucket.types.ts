// TODO: Refactor to Zod

import { IProduct } from "./product.types";

export interface IUpdateBucketDto {
    productId: number;
}

export interface IBucketItem {
    product_id: number;
    bucket_id: number;
    product: IProduct;
}

export interface IBucket {
    id: number;
    user_id: number;
    products: IBucketItem[];
}
