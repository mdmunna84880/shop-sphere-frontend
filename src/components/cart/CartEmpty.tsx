import { Link } from 'react-router';
import { FiShoppingBag, FiArrowLeft } from 'react-icons/fi';

export const CartEmpty = () => {
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
};