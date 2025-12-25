import type { Product } from './product.types';

export interface CartItem extends Product {
  quantity: number;
}


export interface CartState {
  items: CartItem[];
  totalAmount: number;
  totalQuantity: number;
}