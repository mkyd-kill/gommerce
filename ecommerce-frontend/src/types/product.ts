export type ProductModel = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  quantityInCart: number;
  rating: number;
};

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantityInCart: number;
}