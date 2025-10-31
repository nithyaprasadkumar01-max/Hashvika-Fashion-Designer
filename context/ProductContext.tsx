'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/types";
import { products as initialProducts } from "@/data/products";

export type AddProductInput = Omit<Product, "id" | "rating" | "reviews"> & {
  rating?: number;
  reviews?: number;
};

interface ProductContextValue {
  products: Product[];
  addProduct: (input: AddProductInput) => Promise<Product>;
  updateProduct: (id: string | number, input: AddProductInput) => Promise<void>;
  deleteProduct: (id: string | number) => Promise<void>;
}

const ProductContext = createContext<ProductContextValue | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data.map((p: any) => ({ ...p, id: p._id })));
        }
      })
      .catch(() => {});
  }, []);

  const addProduct = useCallback(async (input: AddProductInput) => {
    const newProduct = {
      ...input,
      id: Date.now(),
      rating: input.rating ?? 0,
      reviews: input.reviews ?? 0
    };
    setProducts(prev => [...prev, newProduct]);
    
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      });
      if (res.ok) {
        const created = await res.json();
        setProducts(prev => prev.map(p => p.id === newProduct.id ? { ...created, id: created._id } : p));
      }
    } catch (error) {
      console.error('Failed to sync with API:', error);
    }
    
    return newProduct;
  }, []);

  const updateProduct = useCallback(async (id: string | number, input: AddProductInput) => {
    await fetch('/api/products', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...input })
    });
    setProducts(prev => prev.map(p => p.id === id ? { ...input, id, rating: input.rating ?? 0, reviews: input.reviews ?? 0 } : p));
  }, []);

  const deleteProduct = useCallback(async (id: string | number) => {
    await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
    setProducts(prev => prev.filter(p => p.id !== id));
  }, []);

  const value = useMemo(() => ({ products, addProduct, updateProduct, deleteProduct }), [products, addProduct, updateProduct, deleteProduct]);

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}
