import type { Product } from './product.types';

export interface CartItem extends Product {
  cartQuantity: number;
}
