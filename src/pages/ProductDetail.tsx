import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { FiArrowLeft } from 'react-icons/fi';

// Imports from aliases
import Container from '@/components/ui/Container';

// Redux & Types
import type { RootState, AppDispatch } from '@/store';
import { addToCart } from '@/store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '@/store/slices/wishlistSlice';
import { getProductDetails, clearSelectedProduct } from '@/store/slices/productSlice';

// New Sub-components
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductInfo } from '@/components/product/ProductInfo';
import { ProductDetailActions } from '@/components/product/ProductDetailActions';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // 1. Selectors
  const { items, selectedProduct, status } = useSelector((state: RootState) => state.products);
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  // 2. Smart Product Resolution
  // Try to find it in the already loaded list first, otherwise use the selectedProduct from fetch
  const existingProduct = items.find((p) => p.id === Number(id));
  const product = existingProduct || selectedProduct;

  const isLoading = status === 'loading';

  // 3. Derived State
  const isInCart = product ? cartItems.some((item) => item.id === product.id) : false;
  const isWishlisted = product ? wishlistItems.some((item) => item.id === product.id) : false;
  
  // Client-side discount simulation (consistent with Card)
  const discountValue = 20;

  // 4. Lifecycle
  useEffect(() => {
    // Scroll to top when entering page
    window.scrollTo(0, 0);

    if (id && !existingProduct) {
      dispatch(getProductDetails(Number(id)));
    }
    // Cleanup on unmount
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

  const handleGoToCart = () => {
    navigate('/cart');
  };

  const handleWishlist = (e: React.MouseEvent) => {
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
      <div className="relative min-h-screen bg-bg-page flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-3 border-brand-primary"></div>
      </div>
    );
  }

  // --- Render ---
  return (
    <div className="relative min-h-screen bg-bg-page py-8 font-body mt-16 sm:mt-20">
      <Container>
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-text-muted hover:text-brand-primary mb-6 transition-colors font-medium text-sm"
        >
          <FiArrowLeft /> Back to results
        </button>

        {/* Main Product Layout */}
        <div className="bg-bg-surface rounded-2xl shadow-sm shadow-shadow-base border border-border-base overflow-hidden">
          <div className="flex flex-col md:flex-row">
            
            {/* Left: Gallery */}
            <ProductGallery 
              image={product.image}
              title={product.title}
              discount={discountValue}
              isWishlisted={isWishlisted}
              onToggleWishlist={handleWishlist}
            />

            {/* Right: Info & Actions */}
            <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col">
              
              <ProductInfo 
                product={product} 
                discount={discountValue} 
              />

              <ProductDetailActions 
                isInCart={isInCart}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                onGoToCart={handleGoToCart}
              />
              
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductDetail;