export interface CategoryModel {
    id: number;
    name: string;
    image: string;
    style: {
        backgroundColor: string;
    }
}

export interface Deal {
    id: number;
    name: string;
    image: string;
    price: number;
    left: number;
}