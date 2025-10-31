'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { Heart, Eye, ShoppingBag, Edit, Trash2, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  isAdmin?: boolean;
}

export default function ProductCard({ product, onViewDetails, isAdmin = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const productImages = useMemo(
    () => (product.images && product.images.length > 0 ? product.images : [product.image]),
    [product.images, product.image]
  );

  useEffect(() => {
    if (isHovered || productImages.length <= 1) return;

    const rotation = window.setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
    }, 3500);

    return () => window.clearInterval(rotation);
  }, [productImages, isHovered]);

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className="group relative overflow-hidden rounded-3xl border border-[#313f74] bg-[#0e1634]/80 shadow-xl shadow-black/40 transition-all duration-500 hover:-translate-y-2 hover:border-[#d4af37]/60 hover:shadow-2xl hover:shadow-black/60"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.isNew && (
          <span className="rounded-full bg-linear-to-r from-[#d4af37] via-[#f1d97a] to-[#c08d2b] px-3 py-1 text-xs font-bold text-[#1a1f34] shadow-md shadow-black/30 animate-pulse">
            NEW
          </span>
        )}
        {product.isSale && discountPercentage > 0 && (
          <span className="rounded-full bg-linear-to-r from-[#7f5af0] to-[#d4af37] px-3 py-1 text-xs font-bold text-[#1a1f34] shadow-md shadow-black/30">
            -{discountPercentage}%
          </span>
        )}
      </div>

      {/* Admin Actions or Heart Icon */}
      {isAdmin ? (
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <button
            onClick={() => window.location.href = `/edit?id=${product.id}`}
            className="rounded-full border border-[#7f5af0]/50 bg-[#0a1230]/80 p-2 backdrop-blur-sm transition-all duration-300 hover:bg-[#7f5af0]/70"
            title="Edit product"
            aria-label="Edit product"
          >
            <Edit className="w-5 h-5 text-[#c8b6ff]" />
          </button>
          <button
            onClick={() => confirm('Delete this product?') && alert('Delete functionality')}
            className="rounded-full border border-red-500/50 bg-[#0a1230]/80 p-2 backdrop-blur-sm transition-all duration-300 hover:bg-red-600"
            title="Delete product"
            aria-label="Delete product"
          >
            <Trash2 className="w-5 h-5 text-red-400" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-4 right-4 z-10 rounded-full border border-[#2f3f73] bg-[#0a1230]/80 p-2 backdrop-blur-sm text-[#c9cbe4] transition-all duration-300 hover:border-[#d4af37] hover:bg-[#0e1634]"
          title={isLiked ? "Remove from favorites" : "Add to favorites"}
          aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart 
            className={`w-5 h-5 transition-colors duration-300 ${
              isLiked ? 'fill-red-500 text-red-500' : 'text-[#c9cbe4] hover:text-red-500'
            }`}
          />
        </button>
      )}

      {/* Product Image */}
      <div 
        className="relative h-80 overflow-hidden rounded-t-3xl"
      >
        <Image
          src={productImages[currentImageIndex]}
          alt={product.name}
          fill
          className={`object-cover transition-all duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        {productImages.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
              }}
              className={`absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-[#2f3f73] bg-[#060c1f]/70 p-2 text-[#f7f2e9] transition-opacity ${
                isHovered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              } hover:border-[#d4af37] hover:text-[#f4d98f]`}
              title="Previous image"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
              }}
              className={`absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-[#2f3f73] bg-[#060c1f]/70 p-2 text-[#f7f2e9] transition-opacity ${
                isHovered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              } hover:border-[#d4af37] hover:text-[#f4d98f]`}
              title="Next image"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
        {productImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {productImages.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
        {productImages.length > 1 && (
          <div className={`absolute bottom-4 right-4 flex gap-3 transition-opacity ${
            isHovered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}>
            {productImages.map((imageUrl, index) => (
              <button
                key={imageUrl}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
                className={`relative h-12 w-12 overflow-hidden rounded-lg border border-[#2f3f73] bg-[#0a1230]/80 transition hover:border-[#d4af37] ${
                  index === currentImageIndex ? 'ring-2 ring-[#d4af37]/40' : ''
                }`}
                title={`View image ${index + 1}`}
                aria-label={`View image ${index + 1}`}
              >
                <Image
                  src={imageUrl}
                  alt={`${product.name} preview ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
        
        {/* Overlay with actions */}
        <div
          className={`absolute inset-0 flex items-center justify-center gap-4 bg-[#060c1f]/50 transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            onClick={() => onViewDetails(product)}
            className="rounded-full border border-[#d4af37]/30 bg-[#060c1f]/90 p-3 text-[#f4d98f] shadow-lg shadow-black/30 transition-all duration-300 hover:scale-110 hover:border-[#d4af37]/60 hover:shadow-2xl"
            title="View product details"
            aria-label="View product details"
          >
            <Eye className="w-5 h-5" />
          </button>
          {!isAdmin && (
            <button 
              className="rounded-full border border-[#d4af37]/30 bg-[#060c1f]/90 p-3 text-[#f4d98f] shadow-lg shadow-black/30 transition-all duration-300 hover:scale-110 hover:border-[#d4af37]/60 hover:shadow-2xl"
              title="Add to cart"
              aria-label="Add to cart"
            >
              <ShoppingBag className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        {/* ID and Category */}
        <div className="flex items-center justify-between mb-2">
          <span className="rounded bg-[#d4af37]/15 px-2 py-1 text-xs font-mono font-semibold text-[#f4d98f]">
            {product.id}
          </span>
          <span className="text-sm font-medium uppercase tracking-wide text-[#f4d98f]">
            {product.category}
          </span>
        </div>
        
        {/* Product Name */}
        <h3 className="mt-2 mb-3 line-clamp-2 text-xl font-bold text-[#f7f2e9]">
          {product.name}
        </h3>

        {/* Description */}
        <p className="mb-4 line-clamp-2 text-sm text-[#c9cbe4]">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-[#f4d98f]">
            ${product.price}
          </span>
          
          <button 
            onClick={() => onViewDetails(product)}
            className="transform rounded-full bg-linear-to-r from-[#d4af37] via-[#f1d97a] to-[#c08d2b] px-6 py-2 font-semibold text-[#1a1f34] shadow-lg shadow-black/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            View Details
          </button>
        </div>

        {/* Enquiry Button */}
        <button
          onClick={() => {
            const message = `Hi, I'm interested in Product ID: ${product.id} - ${product.name}`;
            window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, '_blank');
          }}
          className="w-full flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 font-semibold text-white shadow-lg shadow-black/30 transition-all duration-300 hover:scale-105 hover:bg-[#20BA5A]"
        >
          <MessageCircle className="w-4 h-4" />
          Enquiry on WhatsApp
        </button>
      </div>


    </div>
  );
}