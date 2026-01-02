/** @format */

import cn from "@/utils/cn";
import Button from "@/components/ui/Button";

interface CategoryHeaderProps {
  searchQuery: string;
  activeCategory: string;
  totalItems: number;
  onSelectCategory: (category: string) => void;
  categories: string[];
}

export function CategoryHeader({
  searchQuery,
  activeCategory,
  totalItems,
  onSelectCategory,
  categories,
}: CategoryHeaderProps) {
  return (
    <div className="p-4 mb-6 border shadow-sm bg-bg-surface rounded-xl shadow-shadow-base border-border-base">
      <div className="flex flex-col justify-between gap-4 sm:flex-row md:items-center">
        {/* Title Section */}
        <div>
          <h2 className="text-xl font-bold text-text-main font-heading">
            {searchQuery ? (
              `Results for "${searchQuery}"`
            ) : activeCategory === "All" ? (
              "All Products"
            ) : (
              <span className="capitalize">{activeCategory}</span>
            )}
          </h2>
          <p className="mt-1 text-sm text-text-muted">
            {totalItems} Items found
          </p>
        </div>

        {/* Category Buttons */}
        <div className="hidden lg:flex gap-4 pb-2 overflow-hidden md:pb-0">
          <Button
            onClick={() => onSelectCategory("All")}
            className={cn(
              activeCategory === "All"
                ? "bg-brand-primary text-text-inverse border-brand-primary shadow-md"
                : "bg-bg-surface text-text-body border-border-base hover:bg-bg-subtle hover:border-border-strong"
            )}
          >
            All
          </Button>

          {categories.map((cat) => (
            <Button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={cn(
                activeCategory === cat
                  ? "bg-brand-primary text-text-inverse border-brand-primary shadow-md"
                  : "bg-bg-surface text-text-body border-border-base hover:bg-bg-subtle hover:border-border-strong"
              )}
            >
              {cat}
            </Button>
          ))}
        </div>
        <div className="lg:hidden">
          <select
            value={activeCategory}
            onChange={(e) => onSelectCategory(e?.target?.value)}
            className="
                border
              border-border-base
                rounded-md
                px-2 py-2
                text-sm
                outline-none
                focus:ring-1
                focus:ring-brand-primary capitalize"
          >
            <option defaultValue={"All"}>All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
