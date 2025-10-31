'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useMemo, useState } from 'react';
import { ArrowLeft, CheckCircle2, Sparkles } from 'lucide-react';
import { useProducts } from '@/context/ProductContext';

interface FormState {
  name: string;
  image: string;
  price: string;
  originalPrice: string;
  category: string;
  colors: string;
  sizes: string;
  description: string;
  features: string;
  rating: string;
  reviews: string;
  isNew: boolean;
  isSale: boolean;
}

const initialForm: FormState = {
  name: '',
  image: '',
  price: '',
  originalPrice: '',
  category: '',
  colors: '',
  sizes: '',
  description: '',
  features: '',
  rating: '',
  reviews: '',
  isNew: false,
  isSale: false,
};

export default function AddProductPage() {
  const router = useRouter();
  const { addProduct, products } = useProducts();
  const [form, setForm] = useState<FormState>(initialForm);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const existingCategories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((product) => set.add(product.category));
    return Array.from(set);
  }, [products]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const parsedPrice = Number.parseFloat(form.price.replace(/[^0-9.]/g, ''));
    if (Number.isNaN(parsedPrice) || parsedPrice <= 0) {
      setError('Please provide a valid price for the product.');
      return;
    }

    const parsedOriginalPrice = form.originalPrice
      ? Number.parseFloat(form.originalPrice.replace(/[^0-9.]/g, ''))
      : undefined;

    const parsedRating = form.rating ? Number.parseFloat(form.rating) : undefined;
    const parsedReviews = form.reviews ? Number.parseInt(form.reviews, 10) : undefined;

    if (parsedRating && (parsedRating < 0 || parsedRating > 5)) {
      setError('Rating must be between 0 and 5.');
      return;
    }

    setIsSubmitting(true);
    try {
      addProduct({
        name: form.name.trim(),
        image: form.image.trim(),
        price: parsedPrice,
        originalPrice: parsedOriginalPrice,
        category: (form.category || 'New Arrivals').trim(),
        colors: form.colors
          .split(',')
          .map((color) => color.trim())
          .filter(Boolean),
        sizes: form.sizes
          .split(',')
          .map((size) => size.trim().toUpperCase())
          .filter(Boolean),
        description: form.description.trim(),
        features: form.features
          .split('\n')
          .map((feature) => feature.trim())
          .filter(Boolean),
        rating: parsedRating,
        reviews: parsedReviews,
        isNew: form.isNew,
        isSale: form.isSale,
      });

      setIsSuccess(true);
      setForm(initialForm);

      setTimeout(() => {
        router.push('/');
      }, 1200);
    } catch (submissionError) {
      console.error(submissionError);
      setError('We could not save this product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderHelper = (title: string, description: string) => (
    <div className="rounded-2xl border border-[#2f3f73] bg-[#0a1230]/70 p-4 shadow-inner shadow-black/20">
      <h4 className="text-sm font-semibold text-[#f7f2e9]">{title}</h4>
      <p className="mt-1 text-xs text-[#9aa2cc]">{description}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050816] text-[#f7f2e9]">
      <div className="mx-auto max-w-5xl px-4 pb-24 pt-12 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-[#2f3f73] bg-[#0a1230]/80 px-4 py-2 text-sm font-medium text-[#f7f2e9] transition hover:border-[#d4af37] hover:text-[#f4d98f]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to collection
            </Link>
          </div>
          <span className="hidden items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 px-4 py-2 text-sm font-medium text-[#f4d98f] sm:inline-flex">
            <Sparkles className="h-4 w-4" /> New drop creator
          </span>
        </div>

        <div className="rounded-3xl border border-[#2f3f73] bg-[#060c1f]/90 p-8 shadow-[0_30px_60px_rgba(6,12,32,0.6)] backdrop-blur">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold sm:text-4xl">Add a bespoke product</h1>
              <p className="mt-2 max-w-xl text-sm text-[#9aa2cc]">
                Capture every detail of your new wardrobe hero. We will instantly surface it across the home collection and keep it ready for your clients.
              </p>
            </div>
            {isSuccess && (
              <div className="flex items-center gap-2 rounded-full border border-[#f4d98f]/40 bg-[#d4af37]/15 px-4 py-2 text-sm text-[#f4d98f]">
                <CheckCircle2 className="h-4 w-4" />
                Product saved! Redirecting…
              </div>
            )}
          </div>

          <form className="grid grid-cols-1 gap-8 lg:grid-cols-3" onSubmit={handleSubmit}>
            <div className="space-y-6 lg:col-span-2">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-[#c9cbe4]">Product name</span>
                  <input
                    required
                    value={form.name}
                    onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                    placeholder="Exquisite Silk Saree"
                    className="rounded-2xl border border-[#2f3f73] bg-[#0a1230]/80 px-4 py-3 text-sm text-[#f7f2e9] placeholder:text-[#8b92bc] focus:border-[#d4af37] focus:outline-none focus:ring-4 focus:ring-[#d4af3760]"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-[#c9cbe4]">Category</span>
                  <input
                    list="category-options"
                    value={form.category}
                    onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
                    placeholder="Dresses, Couture, Accessories…"
                    className="rounded-2xl border border-[#2f3f73] bg-[#0a1230]/80 px-4 py-3 text-sm text-[#f7f2e9] placeholder:text-[#8b92bc] focus:border-[#d4af37] focus:outline-none focus:ring-4 focus:ring-[#d4af3760]"
                  />
                  <datalist id="category-options">
                    {existingCategories.map((category) => (
                      <option key={category} value={category} />
                    ))}
                  </datalist>
                </label>
              </div>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-[#c9cbe4]">Image URL</span>
                <input
                  required
                  value={form.image}
                  onChange={(event) => setForm((prev) => ({ ...prev, image: event.target.value }))}
                  placeholder="https://images.unsplash.com/..."
                  className="rounded-2xl border border-[#2f3f73] bg-[#0a1230]/80 px-4 py-3 text-sm text-[#f7f2e9] placeholder:text-[#8b92bc] focus:border-[#d4af37] focus:outline-none focus:ring-4 focus:ring-[#d4af3760]"
                />
              </label>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-[#c9cbe4]">Price (USD)</span>
                  <input
                    required
                    value={form.price}
                    onChange={(event) => setForm((prev) => ({ ...prev, price: event.target.value }))}
                    placeholder="299"
                    inputMode="decimal"
                    className="rounded-2xl border border-[#2f3f73] bg-[#0a1230]/80 px-4 py-3 text-sm text-[#f7f2e9] placeholder:text-[#8b92bc] focus:border-[#d4af37] focus:outline-none focus:ring-4 focus:ring-[#d4af3760]"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-[#c9cbe4]">Original price</span>
                  <input
                    value={form.originalPrice}
                    onChange={(event) => setForm((prev) => ({ ...prev, originalPrice: event.target.value }))}
                    placeholder="399"
                    inputMode="decimal"
                    className="rounded-2xl border border-[#2f3f73] bg-[#0a1230]/80 px-4 py-3 text-sm text-[#f7f2e9] placeholder:text-[#8b92bc] focus:border-[#d4af37] focus:outline-none focus:ring-4 focus:ring-[#d4af3760]"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-[#c9cbe4]">Rating (0-5)</span>
                  <input
                    value={form.rating}
                    onChange={(event) => setForm((prev) => ({ ...prev, rating: event.target.value }))}
                    placeholder="4.8"
                    inputMode="decimal"
                    className="rounded-2xl border border-[#2f3f73] bg-[#0a1230]/80 px-4 py-3 text-sm text-[#f7f2e9] placeholder:text-[#8b92bc] focus:border-[#d4af37] focus:outline-none focus:ring-4 focus:ring-[#d4af3760]"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-[#c9cbe4]">Colors (comma separated)</span>
                  <input
                    value={form.colors}
                    onChange={(event) => setForm((prev) => ({ ...prev, colors: event.target.value }))}
                    placeholder="#FF6B8A, #4ECDC4"
                    className="rounded-2xl border border-[#2f3f73] bg-[#0a1230]/80 px-4 py-3 text-sm text-[#f7f2e9] placeholder:text-[#8b92bc] focus:border-[#d4af37] focus:outline-none focus:ring-4 focus:ring-[#d4af3760]"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-[#c9cbe4]">Sizes (comma separated)</span>
                  <input
                    value={form.sizes}
                    onChange={(event) => setForm((prev) => ({ ...prev, sizes: event.target.value }))}
                    placeholder="XS, S, M, L, XL"
                    className="rounded-2xl border border-[#2f3f73] bg-[#0a1230]/80 px-4 py-3 text-sm text-[#f7f2e9] placeholder:text-[#8b92bc] focus:border-[#d4af37] focus:outline-none focus:ring-4 focus:ring-[#d4af3760]"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-[#c9cbe4]">Short description</span>
                <textarea
                  required
                  rows={4}
                  value={form.description}
                  onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
                  placeholder="A statement piece crafted from..."
                  className="rounded-2xl border border-[#2f3f73] bg-[#0a1230]/80 px-4 py-3 text-sm text-[#f7f2e9] placeholder:text-[#8b92bc] focus:border-[#d4af37] focus:outline-none focus:ring-4 focus:ring-[#d4af3760]"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-[#c9cbe4]">Features (one per line)</span>
                <textarea
                  rows={4}
                  value={form.features}
                  onChange={(event) => setForm((prev) => ({ ...prev, features: event.target.value }))}
                  placeholder={'Hand embroidered\nLimited edition\nDry clean only'}
                  className="rounded-2xl border border-[#2f3f73] bg-[#0a1230]/80 px-4 py-3 text-sm text-[#f7f2e9] placeholder:text-[#8b92bc] focus:border-[#d4af37] focus:outline-none focus:ring-4 focus:ring-[#d4af3760]"
                />
              </label>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-[#2f3f73] bg-[#0a1230]/75 p-6 shadow-inner shadow-black/20">
                <h3 className="text-sm font-semibold text-[#f7f2e9]">Product visibility</h3>
                <p className="mt-1 text-xs text-[#9aa2cc]">
                  Tag the piece and we will highlight it with badges on the storefront.
                </p>
                <div className="mt-6 space-y-4">
                  <label className="flex items-center justify-between gap-4">
                    <span className="text-sm text-[#c9cbe4]">Mark as new arrival</span>
                    <input
                      type="checkbox"
                      checked={form.isNew}
                      onChange={(event) => setForm((prev) => ({ ...prev, isNew: event.target.checked }))}
                      className="h-5 w-5 rounded border-[#2f3f73] bg-[#060c1f] text-[#d4af37] focus:ring-[#d4af37]"
                    />
                  </label>
                  <label className="flex items-center justify-between gap-4">
                    <span className="text-sm text-[#c9cbe4]">Display sale badge</span>
                    <input
                      type="checkbox"
                      checked={form.isSale}
                      onChange={(event) => setForm((prev) => ({ ...prev, isSale: event.target.checked }))}
                      className="h-5 w-5 rounded border-[#2f3f73] bg-[#060c1f] text-[#d4af37] focus:ring-[#d4af37]"
                    />
                  </label>
                  <label className="flex items-center justify-between gap-4">
                    <span className="text-sm text-[#c9cbe4]">Number of reviews</span>
                    <input
                      value={form.reviews}
                      onChange={(event) => setForm((prev) => ({ ...prev, reviews: event.target.value }))}
                      placeholder="120"
                      inputMode="numeric"
                      className="w-24 rounded-xl border border-[#2f3f73] bg-[#0a1230]/80 px-3 py-2 text-sm text-[#f7f2e9] placeholder:text-[#8b92bc] focus:border-[#d4af37] focus:outline-none focus:ring-2 focus:ring-[#d4af3760]"
                    />
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                {renderHelper('Add multiple colors', 'Separate swatches with commas to generate quick-select chips for shoppers.')}
                {renderHelper('Describe the craftsmanship', 'Highlight the fabric story, embellishments, and care instructions to build trust.')}
                {renderHelper('Need inspiration?', 'Duplicate an existing piece, tweak the details, and save with a fresh image.')}
              </div>

              {error && (
                <div className="rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-linear-to-r from-[#d4af37] via-[#f1d97a] to-[#c6922d] px-6 py-3 text-sm font-semibold text-[#1a1f34] shadow-lg shadow-black/30 transition hover:scale-[1.02] hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? 'Saving product…' : 'Save product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
