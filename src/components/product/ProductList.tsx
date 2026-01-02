import { useEffect, useState, useMemo, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

// Components
import { ProductCard } from "./ProductCard";
import { ProductSkeleton } from "./ProductSkeleton";
import { Pagination } from "@/components/ui/Pagination";
import Container from "@/components/ui/Container";
import { CategoryHeader } from "./CategoryHeader";

// Redux Actions & Types
import {
  getProducts,
  getCategories,
  getProductsByCategory,
} from "@/store/slices/productSlice";
import { addToCart } from "@/store/slices/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/store/slices/wishlistSlice";
import type { RootState, AppDispatch } from "@/store";

const ITEMS_PER_PAGE = 8;

export const ProductList = () => {
  const navigate = useNavigate();
  // 1. Destructure setter from useSearchParams
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const headerRef = useRef<HTMLDivElement>(null);

  // --- Local State (Category is still local for now) ---
  const [activeCategory, setActiveCategory] = useState("All");

  // If ?page= is missing, default to 1.
  const currentPage = Number(searchParams.get("page")) || 1;
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  // --- Redux Selectors ---
  const {
    items: products,
    categories,
    status,
  } = useSelector((state: RootState) => state.products);

  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  const isLoading = status === "loading";

  // --- Effects ---

  // 1. Fetch Categories
  useEffect(() => {
    if (categories.length === 0) {
      dispatch(getCategories());
    }
  }, [dispatch, categories.length]);

  // 2. Fetch Products
  useEffect(() => {
    if (activeCategory === "All") {
      dispatch(getProducts());
    } else {
      dispatch(getProductsByCategory(activeCategory));
    }
  }, [dispatch, activeCategory]);

  // --- Scroll Helper ---
  const scrollToHeader = () => {
    if (headerRef.current) {
      headerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // --- Filtering Logic ---
  const displayedProducts = useMemo(() => {
    if (!searchQuery) return products;

    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(searchQuery) ||
        p.category.toLowerCase().includes(searchQuery)
    );
  }, [products, searchQuery]);

  // --- Handlers ---
  const handlePageChange = (pageNumber: number) => {
    // UPDATE URL: This automatically re-renders the component with new currentPage
    setSearchParams({page: pageNumber.toString()});
    scrollToHeader();
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    // RESET URL PAGE: Ensure we start at page 1 when switching categories
    setSearchParams({page: "1"});
    
    scrollToHeader();

    if (searchQuery) navigate("/");
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

  // --- Slicing Data ---
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentProducts = displayedProducts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Container className="min-h-screen py-8 bg-bg-page font-body scroll-mt-16" ref={headerRef}>
      
      {/* --- Header --- */}
      <CategoryHeader
        categories={categories}
        activeCategory={activeCategory}
        searchQuery={searchQuery}
        totalItems={displayedProducts.length}
        onSelectCategory={handleCategoryChange} 
      />

      {/* --- Product Grid --- */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      ) : (
        <>
          {currentProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {currentProducts.map((product) => {
                const isInCart = cartItems.some((item) => item.id === product.id);
                const isWishlisted = wishlistItems.some((item) => item.id === product.id);

                return (
                  <div key={product.id} className="flex justify-center">
                    <ProductCard
                      product={product}
                      isInCart={isInCart}
                      isWishlistedInitial={isWishlisted}
                      onAddToCart={handleAddToCart}
                      onToggleWishlist={handleToggleWishlist}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-xl text-text-muted font-heading">
                No products found.
              </p>
              <button
                onClick={() => {
                  handleCategoryChange("All");
                  navigate("/");
                }}
                className="mt-4 font-medium text-brand-primary hover:underline"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Pagination */}
          <Pagination 
            currentPage={currentPage} 
            totalItems={displayedProducts.length} 
            itemsPerPage={ITEMS_PER_PAGE} 
            onPageChange={handlePageChange} 
          />
        </>
      )}
    </Container>
  );
};

export default ProductList;