import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  FiShoppingCart, 
  FiHeart, 
  FiCheck, 
  FiStar, 
  FiArrowLeft, 
  FiZap, 
  FiTruck, 
  FiShield 
} from 'react-icons/fi';

// Redux & Types
import type { RootState, AppDispatch } from '../store';
import { addToCart } from '../store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../store/slices/wishlistSlice';
import { getProductDetails, clearSelectedProduct } from '../store/slices/productSlice';
import Container from '../components/ui/Container';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // 1. Selectors
  const { items, selectedProduct, status } = useSelector((state: RootState) => state.products);
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  // 2. Smart Product Resolution
  const existingProduct = items.find((p) => p.id === Number(id));
  const product = existingProduct || selectedProduct;

  const isLoading = status === 'loading';

  // 3. Derived State
  const isInCart = product ? cartItems.some((item) => item.id === product.id) : false;
  const isWishlisted = product ? wishlistItems.some((item) => item.id === product.id) : false;

  // 4. Lifecycle
  useEffect(() => {
    if (id && !existingProduct) {
      dispatch(getProductDetails(Number(id)));
    }
    return () => { dispatch(clearSelectedProduct()); };
  }, [id, existingProduct, dispatch]);

  // 5. Handlers
  const handleAddToCart = () => {
    if (product) dispatch(addToCart(product));
  };

  const handleBuyNow = () => {
    if (product) {
      if (!isInCart) dispatch(addToCart(product));
      navigate('/cart');
    }
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product) return;
    if (isWishlisted) {
      dispatch(removeFromWishlist({ id: Number(product.id) }));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  // --- Loading State ---
  if (isLoading || !product) {
    return (
      <div className="relative top-20 min-h-screen bg-(--color-bg-page) flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-(--color-brand-primary)"></div>
      </div>
    );
  }

  // --- Discount Logic ---
  const discountPercent = 20;
  const originalPrice = product.price / (1 - discountPercent / 100);

  return (
    <div className="relative top-20 min-h-screen bg-(--color-bg-page) py-8 font-(--font-body)">
      <Container>
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-(--color-text-muted) hover:text-(--color-brand-primary) mb-6 transition-colors font-medium text-sm"
        >
          <FiArrowLeft /> Back to results
        </button>

        {/* Main Product Card */}
        <div className="bg-(--color-bg-surface) rounded-2xl shadow-sm shadow-(--color-shadow-base) border border-(--color-border-base) overflow-hidden">
          <div className="flex flex-col md:flex-row">
            
            {/* 1. LEFT COLUMN: Image Gallery */}
            <div className="w-full md:w-1/2 p-8 bg-(--color-bg-subtle) flex items-center justify-center relative group">
              
              {/* DISCOUNT BADGE */}
              <div className="absolute top-6 left-6 bg-(--color-status-success) text-(--color-text-inverse) px-3 py-1 rounded-md text-sm font-bold shadow-sm z-10">
                {discountPercent}% OFF
              </div>

              {/* WISHLIST BUTTON */}
              <button
                onClick={handleToggleWishlist}
                className="
                  absolute top-6 right-6 z-20 
                  p-3 rounded-full 
                  bg-(--color-bg-surface) shadow-md hover:shadow-lg
                  text-(--color-text-muted) hover:text-(--color-status-error)
                  transition-all duration-300 transform hover:scale-110
                  cursor-pointer border border-(--color-border-base)
                "
              >
                <FiHeart 
                  className={`w-5 h-5 transition-colors ${isWishlisted ? "fill-(--color-status-error) text-(--color-status-error)" : ""}`} 
                />
              </button>

              {/* Image */}
              <motion.img 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                src={product.image} 
                alt={product.title} 
                className="max-h-[400px] w-auto object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* 2. RIGHT COLUMN: Details & Actions */}
            <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col">
              
              {/* Category */}
              <span className="text-xs font-bold text-(--color-brand-primary) uppercase tracking-wider mb-2">
                {product.category}
              </span>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-bold text-(--color-text-main) font-(--font-heading) mb-4 leading-tight">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center bg-(--color-status-success)/10 px-2 py-1 rounded text-(--color-status-success) font-bold text-sm">
                  {product.rating.rate} <FiStar className="ml-1 fill-current" />
                </div>
                <span className="text-(--color-text-muted) text-sm underline cursor-pointer hover:text-(--color-brand-primary)">
                  {product.rating.count} Verified Reviews
                </span>
              </div>

              {/* Price Block */}
              <div className="mb-8 p-4 bg-(--color-bg-page) rounded-xl border border-(--color-border-base)">
                <div className="flex items-end gap-3 mb-1">
                  <span className="text-3xl font-bold text-(--color-text-main) font-(--font-heading)">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-lg text-(--color-text-muted) line-through mb-1">
                    ${originalPrice.toFixed(2)}
                  </span>
                </div>
                <p className="text-(--color-status-success) text-sm font-medium">
                  Inclusive of all taxes
                </p>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-sm font-bold text-(--color-text-main) mb-2">Description</h3>
                <p className="text-(--color-text-body) leading-relaxed text-sm md:text-base">
                  {product.description}
                </p>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 text-sm text-(--color-text-muted)">
                  <FiTruck className="w-5 h-5 text-(--color-brand-primary)" />
                  Free Delivery
                </div>
                <div className="flex items-center gap-3 text-sm text-(--color-text-muted)">
                  <FiShield className="w-5 h-5 text-(--color-brand-primary)" />
                  2 Year Warranty
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* 1. Add to Cart Logic */}
                {isInCart ? (
                  <button
                    onClick={() => navigate('/cart')}
                    className="
                      py-3.5 rounded-xl
                      bg-(--color-status-success)/10 border border-(--color-status-success) text-(--color-status-success)
                      font-bold text-base shadow-sm
                      flex items-center justify-center gap-2
                      hover:bg-(--color-status-success)/20 transition-all cursor-pointer
                    "
                  >
                    <FiCheck className="w-5 h-5" />
                    Go to Cart
                  </button>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    // OUTLINE STYLE: Secondary Action
                    className="
                      py-3.5 rounded-xl
                      bg-transparent border-2 border-(--color-brand-primary) text-(--color-brand-primary)
                      font-bold text-base
                      flex items-center justify-center gap-2
                      hover:bg-(--color-brand-primary) hover:text-(--color-text-inverse) transition-all cursor-pointer
                    "
                  >
                    <FiShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                )}

                {/* 2. Buy Now: ACCENT COLOR (Conversion) */}
                <button
                  onClick={handleBuyNow}
                  className="
                    py-3.5 rounded-xl
                    bg-(--color-brand-accent) text-(--color-text-inverse)
                    font-bold text-base shadow-lg shadow-(--color-shadow-base)
                    flex items-center justify-center gap-2
                    hover:bg-(--color-brand-accent-hover) transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer
                  "
                >
                  <FiZap className="w-5 h-5 fill-current" />
                  Buy Now
                </button>

              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductDetail;