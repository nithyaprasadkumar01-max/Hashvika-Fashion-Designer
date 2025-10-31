'use client';

interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function FilterBar({ categories, selectedCategory, onCategoryChange }: FilterBarProps) {
  return (
    <div className="mb-8 flex flex-wrap justify-center gap-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`rounded-full px-6 py-3 font-semibold transition-all duration-300 hover:scale-[1.02] ${
            selectedCategory === category
              ? 'bg-linear-to-r from-[#d4af37] via-[#f1d97a] to-[#c08d2b] text-[#1a1f34] shadow-lg shadow-black/30'
              : 'border border-[#2f3f73] bg-[#0e1634]/70 text-[#c9cbe4] hover:border-[#d4af37] hover:text-[#f7f2e9]'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}