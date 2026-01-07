import { useContext } from "react";
import { SearchUIContext } from "./SearchUIContext";

// Custom Hook for consuming the context and dissabling the to export only component
export function useSearchUI() {
  const context = useContext(SearchUIContext);
  if (context === undefined) {
    throw new Error("useSearchUI must be used within a SearchUIProvider");
  }
  return context;
}