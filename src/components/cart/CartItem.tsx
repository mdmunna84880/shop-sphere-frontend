import React from 'react';
import { useDispatch } from 'react-redux';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router';
import type { CartItem as CartItemType } from '../../store/slices/cartSlice';
import { 
  removeFromCart, 
  decreaseCart, 
  increaseCart,
  updateCartQuantity 
} from '../../store/slices/cartSlice';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useDispatch();

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(item.price);

  const formattedSubtotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(item.price * item.cartQuantity);

  // Handle manual input change (e.g., typing "10" directly)
  const handleQuantityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val > 0) {
      dispatch(updateCartQuantity({ id: Number(item.id), quantity: val }));
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 bg-bg-surface p-4 rounded-xl border border-border-base shadow-sm mb-4">
      
      {/* 1. Image & Title */}
      <Link to={`/product/${item.id}`} className="flex items-center gap-4 flex-1 w-full sm:w-auto">
        <div className="w-20 h-20 bg-bg-subtle rounded-lg p-2 flex-shrink-0">
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-contain mix-blend-multiply" 
          />
        </div>
        <div>
          <h3 className="text-sm font-bold text-text-main line-clamp-1">{item.title}</h3>
          <p className="text-xs text-text-muted uppercase font-bold mt-1">{item.category}</p>
          <p className="text-sm font-medium text-brand-primary mt-1">{formattedPrice}</p>
        </div>
      </Link>

      {/* 2. Quantity Controls */}
      <div className="flex items-center gap-3">
        <div className="flex items-center border border-border-base rounded-lg overflow-hidden">
          <button 
            onClick={() => dispatch(decreaseCart({ id: Number(item.id) }))}
            className="p-2 hover:bg-bg-subtle text-text-body transition-colors"
          >
            <FiMinus className="w-4 h-4" />
          </button>
          
          <input
            type="number"
            min="1"
            value={item.cartQuantity}
            onChange={handleQuantityInput}
            className="w-12 text-center text-sm font-medium text-text-main focus:outline-none"
          />

          <button 
            onClick={() => dispatch(increaseCart({ id: Number(item.id) }))}
            className="p-2 hover:bg-bg-subtle text-text-body transition-colors"
          >
            <FiPlus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. Subtotal & Remove */}
      <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-6">
        <div className="text-right">
          <p className="text-xs text-text-muted">Subtotal</p>
          <p className="text-base font-bold text-text-main">{formattedSubtotal}</p>
        </div>
        
        <button 
          onClick={() => dispatch(removeFromCart({ id: Number(item.id) }))}
          className="p-2 text-text-muted hover:text-status-error hover:bg-status-error/10 rounded-lg transition-colors"
          title="Remove Item"
        >
          <FiTrash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};