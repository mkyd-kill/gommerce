export type ProductModel = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  featured: boolean;
  stock: number;
  quantity: number;
  rating: number;
};

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string | null;
  quantity: number;
}