import { useState, useRef, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";
import { useClickAway, useMedia } from "react-use";

import Logo from "../../ui/Logo";
import NavDesktop from "./NavDesktop";
import NavMobile from "./NavMobile";
import HeaderSearchMobile from "./HeaderSearchMobile";
import HeaderSearchDesktop from "./HeaderSearchDesktop";
import Container from "../../ui/Container";

function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const desktopInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isTabletOrDesktop = useMedia("(min-width: 768px)", false);

  useClickAway(containerRef, () => {
    if (isTabletOrDesktop && isSearchOpen) setIsSearchOpen(false);
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        if (isTabletOrDesktop) desktopInputRef.current?.focus();
        else mobileInputRef.current?.focus();
      }, 100);
    }
  }, [isSearchOpen, isTabletOrDesktop]);

  return (
    <header className="w-full h-20 bg-bg-surface shadow-sm px-6 fixed top-0 z-30 border-b border-border-base">
      <Container className="relative flex items-center justify-between w-full h-full mx-auto gap-4">
        {!isTabletOrDesktop && (
          <HeaderSearchMobile
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            inputRef={mobileInputRef}
          />
        )}
        <div
          className={`shrink-0 transition-opacity duration-200 ${
            !isTabletOrDesktop && isSearchOpen ? "opacity-0" : "opacity-100"
          }`}
        >
          <Logo />
        </div>
        <HeaderSearchDesktop
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          inputRef={desktopInputRef}
          containerRef={containerRef}
        />

        <div
          className={`flex items-center gap-1 md:gap-2 shrink-0 transition-opacity duration-200 ${
            !isTabletOrDesktop && isSearchOpen ? "opacity-0" : "opacity-100"
          }`}
        >
          {!isSearchOpen && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setIsSearchOpen(true)}
              className="group flex items-center gap-2 px-4 py-3 rounded-lg font-body text-sm font-medium tracking-wide transition-all duration-300 ease-in-out relative text-text-body hover:text-text-hover hover:bg-bg-interactive-hover cursor-pointer"
              aria-label="Open Search"
            >
              <FiSearch size={20} />
              <span className="hidden xl:block text-md">Search</span>
            </motion.button>
          )}
          <NavDesktop />
          <NavMobile />
        </div>
      </Container>
    </header>
  );
}

export default Header;