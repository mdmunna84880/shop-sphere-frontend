import type { Product } from './product.types';

// The shape of the Redux Slice state for the Wishlist
export interface WishlistState {
  items: Product[]; // Stores the list of products added to favorites
  count: number;    // Used to display the badge count on the header icon
}