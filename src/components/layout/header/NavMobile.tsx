import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useClickAway } from "react-use";
import { AnimatePresence, motion } from "framer-motion";
import { Squash as Hamburger } from "hamburger-react";
import { NavLink } from "react-router";
import { FiUser, FiLogOut } from "react-icons/fi";

import { routes } from "@/constants/navigation";
import { itemVariants, menuVariants } from "./header-animation-variants";
import type { RootState } from "@/store";
import { logout } from "@/store/slices/authSlice";
import { cn } from "@/utils/cn";

// Shared Components
import IconBadge from "@/components/common/IconBadge";

function NavMobile() {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);
  const dispatch = useDispatch();

  // Get Store Data
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const cartCount = useSelector((state: RootState)=> state.cart.cartTotalQuantity);
  const wishlistCount = useSelector((state: RootState) => state.wishlist.items).length;

  useClickAway(ref, () => setOpen(false));

  // Base class for links
  const getLinkClass = (isActive: boolean, isDisabled: boolean) => cn(
    "relative flex items-center gap-4 p-4 rounded-xl",
    "transition-all duration-300 ease-out",
    "font-heading text-lg font-medium",
    isDisabled
      ? "opacity-50 cursor-not-allowed grayscale text-text-muted"
      : isActive
        ? "bg-brand-primary/5 text-brand-primary"
        : "text-text-body hover:bg-bg-interactive-hover hover:text-text-main"
  );

  return (
    <div ref={ref} className="lg:hidden">
      <div className="relative z-30">
        <Hamburger
          toggled={isOpen}
          size={20}
          toggle={setOpen}
          color="var(--color-text-main)"
          rounded
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20"
              onClick={() => setOpen(false)}
            />

            {/* Sidebar Menu */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className={cn(
                "fixed top-0 right-0 h-screen w-70",
                "bg-bg-surface shadow-2xl shadow-shadow-base",
                "z-20 pt-24 px-6",
                "border-l border-border-base",
                "flex flex-col h-full"
              )}
            >
              <ul className="grid gap-3">
                {routes.map((route) => {
                  const { Icon, title, href } = route;
                  const isDisabled = title === "Notifications";

                  let badgeCount = 0;
                  if (title === "Cart") badgeCount = cartCount;
                  if (title === "Wishlist") badgeCount = wishlistCount;

                  return (
                    <motion.li
                      key={title}
                      variants={itemVariants}
                      className="w-full"
                    >
                      <NavLink
                        to={isDisabled ? "#" : href}
                        onClick={(e) => {
                          if (isDisabled) e.preventDefault();
                          else setOpen(false);
                        }}
                        className={({ isActive }) => getLinkClass(isActive, isDisabled)}
                      >
                        {({ isActive }) => (
                          <>
                            {!isDisabled && isActive && (
                              <motion.div
                                layoutId="activeStripMobile"
                                className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-brand-primary rounded-r-full"
                              />
                            )}
                            <IconBadge 
                                icon={Icon} 
                                title={title} 
                                iconClassName="text-[22px]" 
                                count={badgeCount} 
                            />
                            <span>{title}</span>
                          </>
                        )}
                      </NavLink>
                    </motion.li>
                  );
                })}

                {/* --- SEPARATOR --- */}
                <motion.div variants={itemVariants} className="h-px bg-border-base my-2" />

                {/* --- AUTH BUTTON (Login / Logout) --- */}
                <motion.li variants={itemVariants} className="w-full">
                  {isAuthenticated ? (
                    <button
                      onClick={() => {
                        dispatch(logout());
                        setOpen(false);
                      }}
                      className={getLinkClass(false, false) + " w-full"}
                    >
                      <IconBadge icon={FiLogOut} title="Logout" iconClassName="text-[22px]" />
                      <span>Logout</span>
                    </button>
                  ) : (
                    <NavLink
                      to="/login"
                      onClick={() => setOpen(false)}
                      className={({ isActive }) => getLinkClass(isActive, false)}
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && (
                            <motion.div
                              layoutId="activeStripMobile"
                              className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-brand-primary rounded-r-full"
                            />
                          )}
                          <IconBadge icon={FiUser} title="Login" iconClassName="text-[22px]" />
                          <span>Login</span>
                        </>
                      )}
                    </NavLink>
                  )}
                </motion.li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default NavMobile;