import { useClickAway } from "react-use";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Squash as Hamburger } from "hamburger-react";
import { NavLink } from "react-router";
import { routes } from "../../../constants/navigation";
import { itemVariants, menuVariants } from "../../../constants/animations";
import BadgeIcon from "./BadgeIcon";

function NavMobile() {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);

  useClickAway(ref, () => setOpen(false));

  return (
    <div ref={ref} className="lg:hidden">
      <div className="relative z-30">
        <Hamburger
          toggled={isOpen}
          size={24}
          toggle={setOpen}
          color="var(--color-text-main)"
          rounded
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="
                fixed top-0 right-0 h-screen w-70 
                bg-bg-surface 
                shadow-2xl shadow-shadow-base
                z-20 pt-24 px-6
                border-l border-border-base
              "
            >
              <ul className="grid gap-3">
                {routes.map((route) => {
                  const { Icon, title, href } = route;
                  const isDisabled = title === "Notifications";

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
                        className={({ isActive }) => `
                          relative flex items-center gap-4 p-4 rounded-xl
                          transition-all duration-300 ease-out
                          font-heading text-lg font-medium
                          ${
                            isDisabled
                              ? "opacity-50 cursor-not-allowed grayscale text-text-muted"
                              : isActive
                              ? "bg-brand-primary/5 text-brand-primary"
                              : "text-text-body hover:bg-bg-interactive-hover hover:text-text-main"
                          }
                        `}
                      >
                        {({ isActive }) => (
                          <>
                            {!isDisabled && isActive && (
                              <motion.div
                                layoutId="activeStrip"
                                className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-brand-primary rounded-r-full"
                              />
                            )}
                            <BadgeIcon icon={Icon} title={title} className="text-[22px]" />

                            <span>{title}</span>
                          </>
                        )}
                      </NavLink>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default NavMobile;