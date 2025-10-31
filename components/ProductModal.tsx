'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { X, ShoppingBag, Heart, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  if (!isOpen || !product) return null;

  return <ModalContent key={product.id} product={product} onClose={onClose} />;
}

function ModalContent({ product, onClose }: { product: Product; onClose: () => void }) {
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const productImages = useMemo(
    () => (product.images && product.images.length > 0 ? product.images : [product.image]),
    [product.images, product.image]
  );
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  useEffect(() => {
    if (productImages.length <= 1) return;

    const rotation = window.setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
    }, 4000);

    return () => window.clearInterval(rotation);
  }, [productImages]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#040714]/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-h-[90vh] max-w-4xl overflow-y-auto rounded-3xl border border-[#2f3f73] bg-[#060c1f]/90 shadow-[0_25px_60px_rgba(6,12,32,0.6)]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-10 rounded-full border border-[#2f3f73] bg-[#0a1230]/80 p-2 backdrop-blur-sm text-[#c9cbe4] transition-all duration-300 hover:border-[#d4af37] hover:bg-[#0e1634]"
          title="Close modal"
          aria-label="Close modal"
        >
          <X className="h-6 w-6 text-slate-200" />
        </button>

        <div className="grid grid-cols-1 gap-8 p-8 lg:grid-cols-2">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-2xl border border-[#2f3f73] bg-[#0a1230]/80">
              <Image
                src={productImages[currentImageIndex]}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
              {productImages.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-[#2f3f73] bg-[#060c1f]/80 p-2 text-[#f7f2e9] transition hover:border-[#d4af37] hover:text-[#f4d98f]"
                    title="Previous image"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev + 1) % productImages.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-[#2f3f73] bg-[#060c1f]/80 p-2 text-[#f7f2e9] transition hover:border-[#d4af37] hover:text-[#f4d98f]"
                    title="Next image"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
            {productImages.length > 1 && (
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                {productImages.map((imageUrl, index) => (
                  <button
                    key={imageUrl}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative h-20 w-20 overflow-hidden rounded-xl border transition ${
                      index === currentImageIndex
                        ? 'border-[#d4af37] ring-2 ring-[#d4af37]/40'
                        : 'border-[#2f3f73] hover:border-[#d4af37]'
                    }`}
                    title={`View image ${index + 1}`}
                    aria-label={`View image ${index + 1}`}
                  >
                    <Image
                      src={imageUrl}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isNew && (
                <span className="rounded-full bg-linear-to-r from-[#d4af37] via-[#f1d97a] to-[#c6922d] px-4 py-2 text-sm font-bold text-[#1a1f34] shadow-md shadow-black/30">
                  NEW
                </span>
              )}
              {product.isSale && discountPercentage > 0 && (
                <span className="rounded-full bg-linear-to-r from-[#7f5af0] to-[#d4af37] px-4 py-2 text-sm font-bold text-[#1a1f34] shadow-md shadow-black/30">
                  -{discountPercentage}% OFF
                </span>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col text-[#f7f2e9]">
            {/* Category */}
            <span className="mb-2 text-sm font-medium uppercase tracking-wide text-[#f4d98f]">
              {product.category}
            </span>

            {/* Product Name */}
            <h1 className="mb-4 text-4xl font-bold">
              {product.name}
            </h1>

            {/* Product ID */}
            <div className="mb-4 inline-block rounded-lg bg-[#d4af37]/15 px-4 py-2">
              <span className="text-sm font-mono font-semibold text-[#f4d98f]">ID: {product.id}</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <span className="text-4xl font-bold text-[#f4d98f]">
                ${product.price}
              </span>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="mb-3 text-lg font-semibold text-[#f7f2e9]">Description</h3>
              <p className="leading-relaxed text-[#c9cbe4]">
                {product.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-[#d4af37] via-[#f1d97a] to-[#c6922d] px-8 py-4 text-lg font-semibold text-[#1a1f34] shadow-xl shadow-black/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                <ShoppingBag className="h-5 w-5" />
                Add to Cart
              </button>
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`rounded-2xl border-2 p-4 text-[#c9cbe4] transition-all duration-300 ${
                  isLiked
                    ? 'border-[#f4d98f] bg-[#d4af37]/15 text-[#f4d98f]'
                    : 'border-[#2f3f73] hover:border-[#f4d98f] hover:text-[#f4d98f]'
                }`}
                title="Add to favorites"
                aria-label="Add to favorites"
              >
                <Heart className={`h-6 w-6 ${isLiked ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}