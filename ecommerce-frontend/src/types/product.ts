export interface ProductModel {
  ID: number;
  Name: string;
  Description: string;
  Price: number;
  Image: string;
  Stock: number;
  Rating: number;
  Quantity: number;
};

export interface CartItem {
  ID: number;
  Name: string;
  Price: number;
  Image: string | null;
  Quantity: number;
}

export interface WishlistItem {
  ID: number;
  Name: string;
  Price: number;
  Image: string | null;
  Quantity: number;
}