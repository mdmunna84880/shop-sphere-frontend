import React, { useEffect } from 'react';
import { Link,} from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { FiArrowLeft, FiShoppingBag, FiTrash2, FiShield } from 'react-icons/fi';

// Components
import { CartItem } from '../components/cart/CartItem';

// Redux
import type { RootState, AppDispatch } from '../store';
import { clearCart, getTotals } from '../store/slices/cartSlice';

const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // 1. Get State
  const cart = useSelector((state: RootState) => state.cart);
  const { cartItems, cartTotalAmount, cartTotalQuantity } = cart;

  // 2. Calculate Totals on every change
  useEffect(() => {
    dispatch(getTotals());
  }, [cartItems, dispatch]);

  // 3. Handlers
  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your entire cart?")) {
      dispatch(clearCart());
    }
  };

  const handleCheckout = () => {
    alert("Proceeding to Checkout Integration...");
    // navigate('/checkout'); 
  };

  // --- Empty State ---
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] bg-bg-page flex flex-col items-center justify-center p-4 text-center font-body">
        <div className="w-24 h-24 bg-bg-surface rounded-full flex items-center justify-center mb-6 shadow-sm">
          <FiShoppingBag className="w-10 h-10 text-text-muted/40" />
        </div>
        <h2 className="text-2xl font-bold text-text-main font-heading mb-2">
          Your Cart is Empty
        </h2>
        <p className="text-text-muted mb-8 max-w-md">
          Looks like you haven't added anything to your cart yet.
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
          <FiArrowLeft />
          Start Shopping
        </Link>
      </div>
    );
  }

  // --- Populated State ---
  return (
    <div className="min-h-screen bg-bg-page py-8 font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-2xl md:text-3xl font-bold text-text-main font-heading mb-8">
          Shopping Cart 
          <span className="ml-3 text-base font-normal text-text-muted">
            ({cartTotalQuantity} items)
          </span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT COL: Cart Items */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-text-muted uppercase font-bold tracking-wider">Product Details</p>
              <button 
                onClick={handleClearCart}
                className="flex items-center gap-1 text-sm text-status-error hover:text-red-700 font-medium transition-colors"
              >
                <FiTrash2 /> Clear Cart
              </button>
            </div>

            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
            
            <Link to="/" className="inline-flex items-center gap-2 text-brand-primary font-medium hover:underline mt-4">
              <FiArrowLeft /> Continue Shopping
            </Link>
          </div>

          {/* RIGHT COL: Order Summary */}
          <div className="lg:w-96">
            <div className="bg-bg-surface p-6 rounded-xl border border-border-base shadow-sm sticky top-24">
              <h2 className="text-lg font-bold text-text-main mb-6 border-b border-border-base pb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-text-body">
                  <span>Subtotal</span>
                  <span className="font-medium">${cartTotalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-text-body">
                  <span>Shipping Estimate</span>
                  <span className="text-status-success font-medium">Free</span>
                </div>
                <div className="flex justify-between text-text-body">
                  <span>Tax Estimate</span>
                  <span className="font-medium">$0.00</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold text-text-main border-t border-border-base pt-4 mb-6">
                <span>Order Total</span>
                <span>${cartTotalAmount.toFixed(2)}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="
                  w-full py-3.5 rounded-xl
                  bg-brand-accent text-text-inverse
                  font-bold text-lg shadow-lg shadow-brand-accent/25
                  hover:bg-brand-accent-hover transition-all hover:scale-[1.02] active:scale-[0.98]
                "
              >
                Checkout
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-text-muted">
                <FiShield className="w-4 h-4" />
                <span>Secure Checkout Process</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;