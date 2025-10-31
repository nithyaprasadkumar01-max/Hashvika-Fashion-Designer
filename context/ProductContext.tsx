'use client';

import { createContext, useCallback, useContext, useMemo, useState } from "react";
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

  const addProduct = useCallback(async (input: AddProductInput) => {
    const newProduct = {
      ...input,
      id: Date.now(),
      rating: input.rating ?? 0,
      reviews: input.reviews ?? 0
    };
    setProducts(prev => [...prev, newProduct]);
    return newProduct;
  }, []);

  const updateProduct = useCallback(async (id: string | number, input: AddProductInput) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...input, id, rating: input.rating ?? 0, reviews: input.reviews ?? 0 } : p));
  }, []);

  const deleteProduct = useCallback(async (id: string | number) => {
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
