/** @format */

import { createContext } from "react";

interface SearchUIType {
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;
  isTabletOrDesktop: boolean;
}

export const SearchUIContext = createContext<SearchUIType | undefined>(
  undefined
);
