'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import FilterBar from '@/components/FilterBar';
import { ShoppingBag, Search, Menu, Heart, User, Sparkles } from 'lucide-react';
import { Product } from '@/types';
import { useProducts } from '@/context/ProductContext';

export default function Home() {
  const { products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((product) => set.add(product.category));
    return ['All', ...Array.from(set)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    return products.filter((product) => {
      if (!product || !product.name || !product.category) return false;
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = !searchQuery || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#050b20] via-[#0d1b3a] to-[#1c2f5d] text-[#f7f2e9]">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[#2b3d72] bg-[#060c1f]/90 backdrop-blur-2xl shadow-[0_10px_40px_rgba(8,14,35,0.65)]">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3">
              <span className="rounded-xl bg-linear-to-br from-[#d4af37] via-[#f1d97a] to-[#c08d2b] p-3 text-[#1a1f34] shadow-lg shadow-black/40">
                <Sparkles className="h-6 w-6" />
              </span>
              <h1 className="text-2xl font-semibold tracking-tight text-[#f7f2e9] sm:text-3xl">
                Hasvika Fashion Designer
              </h1>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="mx-8 hidden flex-1 max-w-xl lg:block">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8b92bc]" />
              <input
                type="text"
                placeholder="Search the collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-[#2f3f73] bg-[#0a1430]/80 py-3 pl-12 pr-4 text-sm text-[#f7f2e9] outline-none transition focus:border-[#d4af37] focus:ring-4 focus:ring-[#d4af3760] placeholder:text-[#8b92bc]"
              />
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center gap-4">
            <Link
              href="/add"
              className="hidden rounded-full bg-linear-to-r from-[#d4af37] via-[#f1d97a] to-[#c6922d] px-5 py-2 text-sm font-semibold text-[#1a1f34] shadow-lg shadow-black/30 transition hover:scale-[1.02] hover:shadow-xl md:inline-flex"
            >
              Add Product
            </Link>
            <button
              className="rounded-full p-3 text-[#d6d9ec] transition hover:bg-[#101b3d] hover:text-[#f7f2e9]"
              title="Profile"
              aria-label="Profile"
            >
              <User className="h-6 w-6" />
            </button>
            <button
              className="rounded-full p-3 text-[#d6d9ec] transition hover:bg-[#101b3d] hover:text-[#f7f2e9]"
              title="Favorites"
              aria-label="Favorites"
            >
              <Heart className="h-6 w-6" />
            </button>
            <button
              className="relative rounded-full p-3 text-[#d6d9ec] transition hover:bg-[#101b3d] hover:text-[#f7f2e9]"
              title="Shopping Cart"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="h-6 w-6" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-linear-to-r from-[#d4af37] to-[#f1d97a] text-[10px] font-semibold text-[#1a1f34]">
                3
              </span>
            </button>
            <button
              className="rounded-full p-3 text-[#d6d9ec] transition hover:bg-[#101b3d] hover:text-[#f7f2e9] lg:hidden"
              title="Menu"
              aria-label="Menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-[#7f5af0]/20 via-[#1e2d5b]/40 to-transparent blur-2xl" />
          <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-linear-to-br from-[#d4af37]/20 to-[#7f5af0]/25 blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-linear-to-tl from-[#f1d97a]/25 to-[#22336a]/50 blur-3xl" />
        </div>
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 text-center sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:text-left">
          <div className="flex-1 space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#3d4e83] bg-[#0c1532]/70 px-4 py-2 text-sm font-medium text-[#f4d98f] backdrop-blur-sm">
              <Sparkles className="h-4 w-4" /> Intricate Aari Work & Embroidery
            </span>
            <h2 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Handcrafted heritage meets
              <span className="block bg-linear-to-r from-[#d4af37] via-[#f4d67b] to-[#7f5af0] bg-clip-text text-transparent">
                contemporary elegance
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-[#c9cbe4] lg:mx-0">
              Experience the artistry of traditional Aari work, intricate embroidery, and luxurious silk fabrics. Each piece tells a story of heritage craftsmanship with modern sophistication.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <Link
                href="/add"
                className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-[#d4af37] via-[#f1d97a] to-[#c08d2b] px-8 py-3 text-base font-semibold text-[#1a1f34] shadow-xl shadow-black/30 transition hover:scale-[1.02] hover:shadow-2xl"
              >
                Add Product
              </Link>
              <a
                href="#collection"
                className="inline-flex items-center justify-center rounded-full border border-[#d4af37] px-8 py-3 text-base font-semibold text-[#f7f2e9] transition hover:bg-[#d4af37]/10 backdrop-blur-sm"
              >
                Explore collection
              </a>
            </div>
          </div>
          <div className="flex-1">
            <div className="relative mx-auto h-[420px] max-w-lg">
              <div className="absolute inset-0 rounded-3xl border border-[#2f3f73] bg-[#0a1430]/60" />
              <div className="absolute -left-8 top-6 h-24 w-24 rounded-full bg-linear-to-br from-[#d4af37]/35 to-[#7f5af0]/30 blur-2xl" />
              <div className="absolute -right-6 bottom-6 h-28 w-28 rounded-full bg-linear-to-tl from-[#f1d97a]/35 to-[#273773]/45 blur-2xl" />
              <div className="relative h-full w-full rounded-3xl border border-[#33447a] bg-[#0e1634]/85 p-8 backdrop-blur-sm">
                <div className="grid h-full grid-cols-2 gap-4">
                  {filteredProducts.slice(0, 4).map((product) => (
                    <div key={product.id} className="rounded-2xl border border-[#2f3f73] bg-[#121c3f]/80 p-4 shadow-sm shadow-black/30">
                      <p className="text-sm font-semibold text-[#f1d97a]">{product.category}</p>
                      <h3 className="mt-2 text-lg font-semibold text-[#f7f2e9] line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="mt-3 text-sm font-semibold text-[#f1d97a]">
                        ${product.price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="px-4 sm:px-6 lg:px-8" id="collection">
        <div className="mx-auto max-w-7xl">
          <FilterBar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-[#f7f2e9] sm:text-2xl">
              Curated collection
            </h3>
            <p className="text-sm text-[#c9cbe4]">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'piece' : 'pieces'} selected
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onViewDetails={handleViewDetails} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-2xl text-[#c9cbe4]">No products found matching your criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="mt-4 rounded-2xl bg-linear-to-r from-[#d4af37] via-[#f1d97a] to-[#c08d2b] px-8 py-3 font-semibold text-[#1a1f34] shadow-lg shadow-black/30 transition hover:scale-[1.02]"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#2b3d72] bg-[#060c1f]/80 py-16 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="space-y-4 md:col-span-2">
              <h3 className="text-2xl font-semibold text-[#f7f2e9]">Hasvika Fashion Designer</h3>
              <p className="text-[#c9cbe4]">
                Your destination for premium fashion and style. Curate limited-edition drops, track your iconic pieces, and keep clients inspired with a digital showroom.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-[#f7f2e9]">Quick Links</h4>
              <ul className="mt-4 space-y-2 text-[#c9cbe4]">
                <li><a href="#" className="transition hover:text-[#d4af37]">About Us</a></li>
                <li><a href="#" className="transition hover:text-[#d4af37]">Contact</a></li>
                <li><a href="#" className="transition hover:text-[#d4af37]">Size Guide</a></li>
                <li><a href="#" className="transition hover:text-[#d4af37]">Returns</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-[#f7f2e9]">Follow Us</h4>
              <ul className="mt-4 space-y-2 text-[#c9cbe4]">
                <li><a href="#" className="transition hover:text-[#d4af37]">Instagram</a></li>
                <li><a href="#" className="transition hover:text-[#d4af37]">Facebook</a></li>
                <li><a href="#" className="transition hover:text-[#d4af37]">Twitter</a></li>
                <li><a href="#" className="transition hover:text-[#d4af37]">Pinterest</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-[#2b3d72] pt-8 text-center text-sm text-[#8b92bc]">
            <p>&copy; 2025 Hasvika Fashion Designer. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Product Modal */}
      <ProductModal product={selectedProduct} isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
