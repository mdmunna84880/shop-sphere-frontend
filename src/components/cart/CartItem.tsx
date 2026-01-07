import {useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';

import { 
  removeFromCart, 
  decreaseCart, 
  increaseCart,
  updateCartQuantity
} from '@/store/slices/cartSlice';
import { formatCurrencyToUS } from '@/utils/formateCurrency';
import { type CartItem as CartItemType } from '@/types';
interface CartItemProps {
  item: CartItemType;
}

export const CartItem = ({ item }:CartItemProps) => {
  const dispatch = useDispatch();

  // 1. LOCAL STATE
  const [inputValue, setInputValue] = useState(item.cartQuantity.toString());
  
  // 2. TRACK PREVIOUS PROP (To detect external changes)
  const [lastQuantity, setLastQuantity] = useState(item.cartQuantity);

  // 3. SYNC PATTERN (State from Props)
  // If the Redux prop has changed (e.g., via + button), update local state immediately.
  if (item.cartQuantity !== lastQuantity) {
    setLastQuantity(item.cartQuantity);
    setInputValue(item.cartQuantity.toString());
  }

  const handleQuantityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    // Allow digits only or empty string
    if (val === '' || /^[0-9]+$/.test(val)) {
      setInputValue(val);

      const numVal = parseInt(val);
      if (!isNaN(numVal) && numVal > 0) {
        dispatch(updateCartQuantity({ id: Number(item.id), quantity: numVal }));
      }
    }
  };

  const handleBlur = () => {
    if (inputValue === "" || parseInt(inputValue) === 0) {
      setInputValue(item.cartQuantity.toString());
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 bg-bg-surface p-4 rounded-xl border border-border-base shadow-sm mb-4">
      
      {/* 1. Image & Title */}
      <Link to={`/product/${item.id}`} className="flex items-center gap-4 flex-1 w-full sm:w-auto group">
        <div className="w-20 h-20 bg-bg-subtle rounded-lg p-2 shrink-0">
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-contain mix-blend-multiply transition-transform group-hover:scale-105" 
          />
        </div>
        <div>
          <h3 className="text-sm font-bold text-text-main line-clamp-1 group-hover:text-brand-primary transition-colors">
            {item.title}
          </h3>
          <p className="text-xs text-text-muted uppercase font-bold mt-1">{item.category}</p>
          <p className="text-sm font-medium text-brand-primary mt-1">{formatCurrencyToUS(item.price)}</p>
        </div>
      </Link>

      {/* 2. Quantity Controls */}
      <div className="flex items-center gap-3">
        <div className="flex items-center border border-border-base rounded-lg overflow-hidden bg-bg-subtle/30">
          <button 
            onClick={() => dispatch(decreaseCart({ id: Number(item.id) }))}
            className="p-2 hover:bg-bg-subtle text-text-body transition-colors"
            aria-label="Decrease quantity"
          >
            <FiMinus className="w-4 h-4" />
          </button>
          
          <input
            type="text" 
            inputMode="numeric"
            value={inputValue}
            onChange={handleQuantityInput}
            onBlur={handleBlur}
            className="w-12 text-center text-sm font-medium text-text-main bg-transparent focus:outline-none"
          />

          <button 
            onClick={() => dispatch(increaseCart({ id: Number(item.id) }))}
            className="p-2 hover:bg-bg-subtle text-text-body transition-colors"
            aria-label="Increase quantity"
          >
            <FiPlus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. Subtotal & Remove */}
      <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-6">
        <div className="text-right">
          <p className="text-xs text-text-muted">Subtotal</p>
          <p className="text-base font-bold text-text-main">{formatCurrencyToUS(item.price * item.cartQuantity)}</p>
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