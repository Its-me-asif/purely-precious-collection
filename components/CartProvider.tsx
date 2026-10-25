"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Item = { productId: string; qty: number };

type CartValue = {
  items: Item[];
  count: number;
  add: (productId: string, qty?: number) => void;
  setQty: (productId: string, qty: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartValue | null>(null);
const KEY = "pp-bag";

function readBag(): Item[] {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as Item[]) : [];
    return Array.isArray(parsed) ? parsed.filter((item) => item.productId && item.qty > 0) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Item[] | null>(null);

  useEffect(() => {
    setItems(readBag());
  }, []);

  useEffect(() => {
    if (items) localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartValue>(
    () => ({
      items: items ?? [],
      count: (items ?? []).reduce((sum, item) => sum + item.qty, 0),
      add: (productId, qty = 1) => {
        setItems((prev) => {
          const base = prev ?? [];
          const found = base.find((item) => item.productId === productId);
          if (found) {
            return base.map((item) =>
              item.productId === productId ? { ...item, qty: Math.min(9, item.qty + qty) } : item
            );
          }
          return [...base, { productId, qty: Math.min(9, qty) }];
        });
      },
      setQty: (productId, qty) => {
        setItems((prev) => {
          const base = prev ?? [];
          return qty <= 0
            ? base.filter((item) => item.productId !== productId)
            : base.map((item) => (item.productId === productId ? { ...item, qty: Math.min(9, qty) } : item));
        });
      },
      remove: (productId) => setItems((prev) => (prev ?? []).filter((item) => item.productId !== productId)),
      clear: () => setItems([]),
    }),
    [items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used within CartProvider");
  return value;
}
