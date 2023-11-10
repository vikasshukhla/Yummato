export interface IProductCreate {
    name: string;
    price: number;
    cuisine: string;
    image?: string;
}

export interface IProduct {
    id: string;
    name: string;
    price: number;
    cuisine: string;
    image?: string;
}

export interface IProductUpdate {
    price?: number;
    image?: string;
}
