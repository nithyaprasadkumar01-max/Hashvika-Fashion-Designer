'use client';

import Link from 'next/link';
import { useProducts } from '@/context/ProductContext';
import { Edit, Trash2 } from 'lucide-react';

export default function ManageProducts() {
  const { products, deleteProduct } = useProducts();

  const handleDelete = (id: string | number, name: string) => {
    if (confirm(`Delete "${name}"?`)) {
      deleteProduct(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] p-8 text-[#f7f2e9]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Manage Products</h1>
          <Link href="/" className="text-[#f4d98f] transition hover:text-[#d4af37]">
            ← Back to Store
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div key={product.id} className="rounded-2xl border border-[#2f3f73] bg-[#0a1230]/80 p-4 shadow-[0_20px_45px_rgba(6,12,32,0.55)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={product.image} 
                alt={product.name}
                className="mb-4 h-48 w-full rounded-lg object-cover"
              />
              
              <h3 className="mb-2 text-lg font-semibold">{product.name}</h3>
              <p className="mb-2 text-[#f4d98f] font-semibold">${product.price}</p>
              <p className="mb-4 text-sm text-[#9aa2cc]">{product.category}</p>
              
              <div className="flex gap-2">
                <Link
                  href={`/edit?id=${product.id}`}
                  className="flex-1 rounded bg-linear-to-r from-[#7f5af0] to-[#9b7dff] px-4 py-2 text-white shadow-lg shadow-black/30 transition hover:from-[#6b4deb] hover:to-[#8f73ff] flex items-center justify-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </Link>
                
                <button
                  onClick={() => handleDelete(product.id, product.name)}
                  className="flex-1 rounded bg-linear-to-r from-red-500 to-rose-500 px-4 py-2 text-white shadow-lg shadow-black/30 transition hover:from-red-500 hover:to-red-600 flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-lg text-[#9aa2cc]">No products found</p>
            <Link href="/add" className="mt-4 inline-block text-[#f4d98f] transition hover:text-[#d4af37]">
              Add your first product
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}