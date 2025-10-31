'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useProducts } from '@/context/ProductContext';

function DeleteProductForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');
  const { products, deleteProduct } = useProducts();
  const product = productId ? products.find((item) => item.id === Number.parseInt(productId, 10)) : null;

  const handleDelete = () => {
    if (productId) {
      deleteProduct(Number.parseInt(productId, 10));
      router.push('/');
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-[#050816] flex flex-col items-center justify-center gap-6 p-8 text-center text-[#f7f2e9]">
        <h1 className="text-3xl font-semibold">Product not found</h1>
        <Link href="/" className="rounded-full bg-linear-to-r from-[#d4af37] via-[#f1d97a] to-[#c6922d] px-6 py-3 font-semibold text-[#1a1f34] shadow-lg shadow-black/40 transition hover:from-[#cfa433] hover:to-[#e0c85e]">
          Back to collection
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] p-8 text-[#f7f2e9]">
      <div className="max-w-2xl mx-auto space-y-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-[#f4d98f] transition hover:text-[#d4af37]">
          <span>←</span> Back
        </Link>
        <div className="space-y-6 rounded-2xl border border-[#2f3f73] bg-[#0a1230]/75 p-8 shadow-[0_25px_50px_rgba(6,12,32,0.55)]">
          <h1 className="text-3xl font-bold">Delete Product</h1>
          <p className="text-[#c9cbe4]">Are you sure you want to delete <span className="font-semibold text-[#f7f2e9]">{product.name}</span>?</p>
          <div className="flex gap-4">
            <Link href="/" className="rounded-full border border-[#2f3f73] px-6 py-3 font-semibold text-[#c9cbe4] transition hover:border-[#d4af37] hover:text-[#f7f2e9]">
              Cancel
            </Link>
            <button onClick={handleDelete} className="rounded-full bg-linear-to-r from-red-500 to-rose-500 px-6 py-3 font-semibold text-white shadow-lg shadow-black/40 transition hover:from-red-500 hover:to-red-600">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DeleteProduct() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050816] flex items-center justify-center text-[#f4d98f]">Loading...</div>}>
      <DeleteProductForm />
    </Suspense>
  );
}
