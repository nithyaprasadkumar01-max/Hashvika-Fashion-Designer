export interface Product {
  id: string | number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  colors: string[];
  sizes: string[];
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  isNew?: boolean;
  isSale?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}