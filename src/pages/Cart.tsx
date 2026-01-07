import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { FiArrowLeft, FiTrash2 } from 'react-icons/fi';

import { CartItem } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import { CartEmpty } from '@/components/cart/CartEmpty';
import type { RootState, AppDispatch } from '@/store';
import { clearCart} from '@/store/slices/cartSlice';
import Container from '@/components/ui/Container';

function Cart(){
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  // 1. Get cart state
  const cart = useSelector((state: RootState) => state.cart);
  const { cartItems, cartTotalAmount, cartTotalQuantity } = cart;

  // 3. Handle clear cart.
  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your entire cart?")) {
      dispatch(clearCart());
    }
  };

  
  const handleCheckout = () => {
    // Go to checkout page.
    navigate("/checkout");
  };

  // --- Empty State ---
  if (cartItems.length === 0) {
    return <CartEmpty />;
  }

  // --- Populated State ---
  return (
    <div className="min-h-screen py-8 bg-bg-page font-body mt-16 sm:mt-20">
      <Container>
        
        {/* Page Title */}
        <h1 className="mb-8 text-2xl text-center font-bold md:text-3xl text-text-main font-heading">
          Shopping Cart 
          <span className="ml-3 text-base font-normal text-text-muted">
            ({cartTotalQuantity} items)
          </span>
        </h1>

        <div className="flex flex-col gap-8 lg:flex-row">
          
          {/* LEFT COL: Cart Items List */}
          <div className="flex-1">
            
            {/* List Header & Clear Button */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-bold tracking-wider uppercase text-text-muted">
                Product Details
              </p>
              <button 
                onClick={handleClearCart}
                className="flex items-center gap-1 text-sm font-medium transition-colors text-status-error hover:text-red-700"
              >
                <FiTrash2 /> Clear Cart
              </button>
            </div>

            {/* Render Items */}
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
            
            {/* Continue Shopping Link */}
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 mt-4 font-medium text-brand-primary hover:underline"
            >
              <FiArrowLeft /> Continue Shopping
            </Link>
          </div>

          {/* RIGHT COL: Order Summary */}
          <CartSummary 
            cartTotalAmount={cartTotalAmount} 
            onCheckout={handleCheckout} 
          />

        </div>
      </Container>
    </div>
  );
};

export default Cart;