export interface ProductModel {
  ID: number;
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
  ID: number;
  name: string;
  price: number;
  image: string | null;
  quantity: number;
}

export interface WishlistItem {
  ID: number;
  name: string;
  price: number;
  image: string | null;
  quantity: number;
}