'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useProducts } from '@/context/ProductContext';
import { categories as allCategories } from '@/data/products';

const getCategoryPrefix = (category: string): string => {
  const prefixMap: Record<string, string> = {
    'Blouse': 'BLS',
    'Kids Frock': 'KFR',
    'Chudithar': 'CHU',
    'Boutique Gown': 'BGW',
    'Aari Work': 'ARI',
    'Embroidery': 'EMB'
  };
  return prefixMap[category] || 'PRD';
};

export default function AddProduct() {
  const router = useRouter();
  const { addProduct, products } = useProducts();
  const [form, setForm] = useState({
    id: '',
    name: '',
    price: '',
    category: allCategories.filter(c => c !== 'All')[0] || '',
    description: '',
    image: ''
  });

  const generatedId = useMemo(() => {
    const prefix = getCategoryPrefix(form.category);
    const categoryProducts = products.filter(p => p.category === form.category);
    const nextNumber = categoryProducts.length + 1;
    return `${prefix}${String(nextNumber).padStart(3, '0')}`;
  }, [form.category, products]);
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
        setForm({...form, image: reader.result as string});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addProduct({
        name: form.name,
        price: parseFloat(form.price),
        category: form.category,
        image: form.image,
        colors: ['#64748B'],
        sizes: ['One Size'],
        description: form.description || 'New product',
        features: ['Handcrafted'],
        isNew: true,
        isSale: false
      });
      router.push('/');
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] p-8 text-[#f7f2e9]">
      <div className="max-w-md mx-auto">
        <Link href="/" className="mb-4 inline-block text-[#f4d98f] transition hover:text-[#d4af37]">
          ← Back
        </Link>
        
        <h1 className="mb-6 text-2xl font-bold">Add Product</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#c9cbe4]">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({...form, category: e.target.value})}
              className="w-full rounded bg-[#0a1230]/80 p-3 text-[#f7f2e9] border border-[#2f3f73] focus:border-[#d4af37] focus:outline-none"
              aria-label="Product Category"
              title="Select Product Category"
              required
            >
              {allCategories.filter(c => c !== 'All').map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#c9cbe4]">Product ID (Auto-generated)</label>
            <input
              type="text"
              value={generatedId}
              readOnly
              title="Auto-generated Product ID"
              className="w-full cursor-not-allowed rounded border border-[#38487f] bg-[#101a3f] p-3 font-mono font-semibold text-[#f4d98f]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#c9cbe4]">Product Name</label>
            <input
              type="text"
              placeholder="Product Name"
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
              className="w-full rounded border border-[#2f3f73] bg-[#0a1230]/80 p-3 text-[#f7f2e9] placeholder:text-[#8b92bc] focus:border-[#d4af37] focus:outline-none"
              required
            />
          </div>
          
          <div>
            <label className="mb-2 block text-sm font-medium text-[#c9cbe4]">Price</label>
            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({...form, price: e.target.value})}
              className="w-full rounded border border-[#2f3f73] bg-[#0a1230]/80 p-3 text-[#f7f2e9] placeholder:text-[#8b92bc] focus:border-[#d4af37] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#c9cbe4]">Description</label>
            <textarea
              placeholder="Product Description"
              value={form.description}
              onChange={(e) => setForm({...form, description: e.target.value})}
              rows={4}
              className="w-full rounded border border-[#2f3f73] bg-[#0a1230]/80 p-3 text-[#f7f2e9] placeholder:text-[#8b92bc] focus:border-[#d4af37] focus:outline-none"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#c9cbe4]">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full rounded border border-[#2f3f73] bg-[#0a1230]/80 p-3 text-[#f7f2e9] file:mr-4 file:rounded file:border-0 file:bg-[#d4af37] file:px-4 file:py-2 file:text-[#1a1f34] hover:file:bg-[#cfa433]"
              aria-label="Upload Product Image"
              title="Upload Product Image"
              required
            />
            {imagePreview && (
              <div className="mt-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imagePreview} alt="Preview" className="h-48 w-full rounded border border-[#38487f] object-cover" />
              </div>
            )}
          </div>
          
          <button
            type="submit"
            className="w-full rounded-lg bg-linear-to-r from-[#d4af37] via-[#f1d97a] to-[#c6922d] p-3 font-semibold text-[#1a1f34] shadow-lg shadow-black/30 transition hover:from-[#cfa433] hover:to-[#e5cb63]"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}