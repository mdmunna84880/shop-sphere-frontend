import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { FiTrash2 } from 'react-icons/fi';
import { AnimatePresence } from 'framer-motion';

// Components
import { WishlistCard } from '@/components/wishlist/WishlistCard';
import { WishlistEmpty } from '@/components/wishlist/WishlistEmpty';
import Container from '@/components/ui/Container';

// Redux & Types
import type { RootState, AppDispatch } from '@/store';
import type { Product } from '@/types/product.types';
import { addToCart } from '@/store/slices/cartSlice';
import { removeFromWishlist, clearWishlist } from '@/store/slices/wishlistSlice';

const Wishlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // 1. Data Selection
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  // 2. Lifecycle
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 3. Logic Handlers
  const handleMoveToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  const handleRemove = (id: number) => {
    dispatch(removeFromWishlist({ id }));
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to empty your wishlist?")) {
      dispatch(clearWishlist());
    }
  };

  // --- Render: Empty State ---
  if (wishlistItems.length === 0) {
    return <WishlistEmpty />;
  }

  // --- Render: Populated State ---
  return (
    <div className="relative min-h-screen py-8 bg-bg-page font-body mt-16 sm:mt-20">
      <Container>
        
        {/* Page Header */}
        <div className="flex flex-col gap-4 mb-8 sm:flex-row sm:items-center justify-between">
          <div>
            <h1 className="flex items-center gap-3 text-2xl font-bold md:text-3xl text-text-main font-heading">
              My Wishlist
              <span className="px-3 py-1 text-base font-normal border rounded-full text-text-muted bg-bg-surface border-border-base shadow-sm">
                {wishlistItems.length} items
              </span>
            </h1>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 text-sm font-medium transition-colors border rounded-lg border-border-base bg-bg-surface text-text-body hover:bg-bg-subtle"
            >
              Back to Shop
            </button>
            
            <button
              onClick={handleClearAll}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors border rounded-lg border-status-error/20 bg-status-error/5 text-status-error hover:bg-status-error/10"
            >
              <FiTrash2 className="w-4 h-4" />
              Clear All
            </button>
          </div>
        </div>

        {/* Wishlist Items Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <AnimatePresence mode='popLayout'>
            {wishlistItems.map((product) => {
              const isInCart = cartItems.some(item => item.id === product.id);

              return (
                <WishlistCard 
                  key={product.id}
                  product={product}
                  isInCart={isInCart}
                  onMoveToCart={handleMoveToCart}
                  onRemove={handleRemove}
                />
              );
            })}
          </AnimatePresence>
        </div>

      </Container>
    </div>
  );
};

export default Wishlist;