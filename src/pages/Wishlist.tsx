import React from 'react';
import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { FiHeart, FiTrash2, FiShoppingBag } from 'react-icons/fi';
import { AnimatePresence } from 'framer-motion';

// Components
import { WishlistCard } from '../components/wishlist/WishlistCard';

// Redux & Types
import type { RootState, AppDispatch } from '../store';
import type { Product } from '../types/product.types';
import { addToCart } from '../store/slices/cartSlice';
// IMPORT YOUR SLICE ACTIONS HERE
import { removeFromWishlist, clearWishlist } from '../store/slices/wishlistSlice';

const Wishlist: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // 1. Get Data
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  // 2. Handler: Move to Cart
  const handleMoveToCart = (product: Product) => {
    dispatch(addToCart(product));
    // Optional: Decide if you want to remove it from wishlist after adding to cart
    // dispatch(removeFromWishlist({ id: Number(product.id) }));
  };

  // 3. Handler: Remove Single Item (Uses removeFromWishlist)
  const handleRemove = (id: number) => {
    dispatch(removeFromWishlist({ id }));
  };

  // 4. Handler: Clear All (Uses clearWishlist)
  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to empty your wishlist?")) {
      dispatch(clearWishlist());
    }
  };

  // --- Empty State ---
  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-[70vh] bg-bg-page flex flex-col items-center justify-center p-4 text-center font-body">
        <div className="w-24 h-24 bg-bg-surface rounded-full flex items-center justify-center mb-6 shadow-sm">
          <FiHeart className="w-10 h-10 text-text-muted/40" />
        </div>
        <h2 className="text-2xl font-bold text-text-main font-heading mb-2">
          Your Wishlist is Empty
        </h2>
        <p className="text-text-muted mb-8 max-w-md">
          Save items you love here. Review them anytime and move them to your cart when you're ready.
        </p>
        <Link 
          to="/" 
          className="
            flex items-center gap-2 px-8 py-3 rounded-xl
            bg-brand-primary text-text-inverse 
            font-bold shadow-lg shadow-brand-primary/20
            hover:bg-brand-hover transition-all hover:-translate-y-1
          "
        >
          <FiShoppingBag />
          Start Shopping
        </Link>
      </div>
    );
  }

  // --- Populated State ---
  return (
    <div className="relative min-h-screen bg-bg-page py-8 font-body top-20 ">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-text-main font-heading flex items-center gap-3">
              My Wishlist
              <span className="text-base font-normal text-text-muted bg-bg-surface px-3 py-1 rounded-full border border-border-base shadow-sm">
                {wishlistItems.length} items
              </span>
            </h1>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate('/')}
              className="
                px-4 py-2 rounded-lg border border-border-base bg-bg-surface 
                text-text-body font-medium text-sm
                hover:bg-bg-subtle transition-colors 
              "
            >
              Back to Shop
            </button>
            
            {/* CLEAR ALL BUTTON: Uses clearWishlist */}
            <button
              onClick={handleClearAll}
              className="
                flex items-center gap-2 px-4 py-2 rounded-lg 
                border border-status-error/20 bg-status-error/5 
                text-status-error font-medium text-sm
                hover:bg-status-error/10 transition-colors
              "
            >
              <FiTrash2 className="w-4 h-4" />
              Clear All
            </button>
          </div>
        </div>

        {/* Wishlist List */}
        <div className="flex flex-col gap-4">
          <AnimatePresence mode='popLayout'>
            {wishlistItems.map((product) => {
              const isInCart = cartItems.some(item => item.id === product.id);

              return (
                <WishlistCard 
                  key={product.id}
                  product={product}
                  isInCart={isInCart}
                  onMoveToCart={handleMoveToCart} // Handles adding to cart
                  onRemove={handleRemove}         // Handles removing from wishlist
                />
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default Wishlist;