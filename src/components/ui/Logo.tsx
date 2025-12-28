import { FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router";

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 select-none group cursor-pointer">
      <div
        className="
          flex items-center justify-center w-10 h-10 
          bg-brand-primary 
          rounded-xl 
          shadow-lg shadow-brand-primary/20
          transition-all duration-300 ease-out
          group-hover:bg-brand-hover 
          group-hover:scale-105 group-hover:rotate-3
        "
      >
        <FaShoppingBag className="text-text-inverse text-lg drop-shadow-sm" />
      </div>
      <div className="font-logo font-bold text-xl tracking-tight leading-none">
        <span className="text-text-main transition-colors duration-300">
          Shop
        </span>
        <span className="text-brand-primary group-hover:text-brand-hover transition-colors duration-300">
          Sphere
        </span>
      </div>
    </Link>
  );
}

export default Logo;