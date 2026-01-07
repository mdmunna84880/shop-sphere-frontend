import { NavLink } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { FiUser, FiLogOut } from "react-icons/fi";

import { routes } from "@/constants/navigation";
import { logout } from "@/store/slices/authSlice";
import type { RootState } from "@/store";
import { cn } from "@/utils/cn";
import IconBadge from "@/components/common/IconBadge";

function NavDesktop() {
  const dispatch = useDispatch();
  
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const cartCount = useSelector((state:RootState)=>state.cart.cartTotalQuantity);
  const wishlistCount = useSelector((state: RootState) => state.wishlist.items).length;

  // Base class for links to ensure consistency
  const baseLinkClass = cn(
    "group flex items-center gap-2 px-3 py-2 rounded-lg",
    "font-body text-sm font-medium tracking-wide",
    "transition-all duration-300 ease-in-out relative",
    "text-text-body hover:text-text-hover hover:bg-bg-interactive-hover cursor-pointer"
  );

  return (
    <nav>
      <ul className="hidden lg:flex items-center gap-2"> 
        {/* Main Navigation Loop */}
        {routes.map(({ Icon, href, title }) => {
          const isDisabled = title === "Notifications"; 
          
          let badgeCount = 0;
          if (title === "Cart") badgeCount = cartCount;
          if (title === "Wishlist") badgeCount = wishlistCount;

          return (
            <li key={title} className="h-full flex items-center">
              <NavLink
                to={isDisabled ? "#" : href}
                onClick={(e) => isDisabled && e.preventDefault()}
                className={({ isActive }) => cn(
                  baseLinkClass,
                  isDisabled && "opacity-50 cursor-not-allowed grayscale text-text-muted",
                  isActive && "text-brand-primary cursor-default bg-transparent"
                )}
              >
                {({ isActive }) => (
                  <>
                    <span className="text-lg relative z-10">
                      <IconBadge icon={Icon} title={title} count={badgeCount} />
                    </span>
                    
                    <span className="hidden xl:block whitespace-nowrap relative z-10 text-md">
                      {title}
                    </span>
                    
                    {/* Active Indicator Line */}
                    {!isDisabled && (
                      <span 
                        className={cn(
                          "absolute bottom-0 left-0 h-0.5 w-full rounded-full",
                          "bg-brand-primary origin-left transition-transform duration-300 ease-out",
                          isActive ? "scale-x-100" : "scale-x-0"
                        )} 
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          );
        })}

        {/* Auth Section (Login / Logout) */}
        <li className="h-full flex items-center ml-2 pl-2 border-l border-border-base">
          {isAuthenticated ? (
            <button 
              onClick={() => dispatch(logout())} 
              className={baseLinkClass}
            >
              <span className="text-lg relative z-10">
                <IconBadge icon={FiLogOut} title="Logout" />
              </span>
              <span className="hidden xl:block whitespace-nowrap relative z-10 text-md">
                Logout
              </span>
            </button>
          ) : (
            <NavLink 
              to="/login" 
              className={({ isActive }) => cn(
                baseLinkClass,
                isActive && "text-brand-primary"
              )}
            >
               {({ isActive }) => (
                  <>
                    <span className="text-lg relative z-10">
                      <IconBadge icon={FiUser} title="Login" />
                    </span>
                    <span className="hidden xl:block whitespace-nowrap relative z-10 text-md">
                      Login
                    </span>
                    <span
                      className={cn(
                        "absolute bottom-0 left-0 h-0.5 w-full rounded-full",
                        "bg-brand-primary origin-left transition-transform duration-300 ease-out",
                        isActive ? "scale-x-100" : "scale-x-0"
                      )} 
                    />
                  </>
               )}
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default NavDesktop;