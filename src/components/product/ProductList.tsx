import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { ProductCard } from './ProductCard';

// 1. Import Actions from your provided slices
import { 
  getProducts, 
  getCategories, 
  getProductsByCategory 
} from '../../store/slices/productSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../store/slices/wishlistSlice';

// 2. Import Types
import type { RootState, AppDispatch } from '../../store';

export const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Use AppDispatch to handle AsyncThunks correctly
  const dispatch = useDispatch<AppDispatch>();

  // --- Local UI State ---
  // We manage the "active" tab locally because the API response 
  // just gives us an array of products, not the category name.
  const [activeCategory, setActiveCategory] = useState("All");

  // --- Redux Selectors ---
  const { 
    items: products, 
    categories, 
    status 
  } = useSelector((state: RootState) => state.products);

  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  const searchQuery = searchParams.get("search")?.toLowerCase() || "";
  const isLoading = status === 'loading';

  // --- Effects ---

  // 1. Fetch Categories on Mount
  useEffect(() => {
    // Only fetch if we don't have them yet (optional optimization)
    if (categories.length === 0) {
      dispatch(getCategories());
    }
  }, [dispatch, categories.length]);

  // 2. Fetch Products when Category Changes
  useEffect(() => {
    if (activeCategory === "All") {
      dispatch(getProducts());
    } else {
      dispatch(getProductsByCategory(activeCategory));
    }
  }, [dispatch, activeCategory]);

  // --- Filtering Logic (Client-Side Search) ---
  const displayedProducts = useMemo(() => {
    // The products array is already filtered by category via the API call above.
    // Now we just filter by the search term.
    if (!searchQuery) return products;

    return products.filter((p) => 
      p.title.toLowerCase().includes(searchQuery) || 
      p.category.toLowerCase().includes(searchQuery)
    );
  }, [products, searchQuery]);

  // --- Handlers ---

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    // Optional: clear search when changing category for better UX
    if (searchQuery) navigate('/');
  };

  const handleAddToCart = (id: number | string) => {
    const product = products.find((p) => p.id === id);
    if (product) dispatch(addToCart(product));
  };

  const handleToggleWishlist = (id: number | string) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    const exists = wishlistItems.some((item) => item.id === id);
    if (exists) {
      dispatch(removeFromWishlist({ id: Number(id) }));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <div className="min-h-screen bg-bg-page py-8 font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Header & Category Tabs --- */}
        <div className="mb-6 bg-bg-surface p-4 rounded-xl shadow-sm shadow-shadow-base border border-border-base">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Title Section */}
            <div>
              <h2 className="text-xl font-bold text-text-main font-heading">
                {searchQuery 
                  ? `Results for "${searchQuery}"` 
                  : activeCategory === "All" 
                    ? "All Products" 
                    : <span className="capitalize">{activeCategory}</span>
                }
              </h2>
              <p className="text-sm text-text-muted mt-1">
                {displayedProducts.length} Items found
              </p>
            </div>

            {/* Category Buttons (From Redux) */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              {/* Manually add "All" option */}
              <button
                onClick={() => handleCategoryChange("All")}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border
                  ${activeCategory === "All" 
                    ? "bg-brand-primary text-text-inverse border-brand-primary shadow-md"
                    : "bg-bg-surface text-text-body border-border-base hover:bg-bg-subtle hover:border-border-strong"
                  }
                `}
              >
                All
              </button>

              {/* Map Categories from Store */}
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap capitalize transition-all border
                    ${activeCategory === cat 
                      ? "bg-brand-primary text-text-inverse border-brand-primary shadow-md"
                      : "bg-bg-surface text-text-body border-border-base hover:bg-bg-subtle hover:border-border-strong"
                    }
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* --- Product Grid --- */}
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => <ProductSkeleton key={i} />)}
          </div>
        ) : (
          <>
            {displayedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayedProducts.map((product) => {
                  
                  // Check if product is in cart (for "Go to Cart" button)
                  const isInCart = cartItems.some((item) => item.id === product.id);

                  return (
                    <div key={product.id} className="flex justify-center">
                      <ProductCard 
                        product={product} 
                        isInCart={isInCart}
                        onAddToCart={handleAddToCart}
                        onToggleWishlist={handleToggleWishlist}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              // Empty State
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-xl text-text-muted font-heading">No products found.</p>
                <button 
                  onClick={() => {
                    handleCategoryChange("All");
                    navigate("/"); // Clear search URL
                  }}
                  className="mt-4 text-brand-primary hover:underline font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
};

// --- Skeleton Loader (Matches Theme) ---
const ProductSkeleton = () => {
  return (
    <div className="w-full max-w-[300px] bg-bg-surface rounded-xl border border-border-base p-4 animate-pulse mx-auto shadow-sm">
      <div className="w-full aspect-[4/5] bg-bg-subtle rounded-lg mb-4"></div>
      <div className="h-3 w-1/3 bg-bg-subtle rounded mb-2"></div>
      <div className="h-4 w-3/4 bg-bg-subtle rounded mb-3"></div>
      <div className="h-3 w-1/4 bg-bg-subtle rounded mb-4"></div>
      <div className="h-8 w-1/2 bg-bg-subtle rounded mb-4"></div>
      <div className="grid grid-cols-2 gap-3 mt-auto">
        <div className="h-10 bg-bg-subtle rounded-lg"></div>
        <div className="h-10 bg-bg-subtle rounded-lg"></div>
      </div>
    </div>
  );
};

export default ProductList;