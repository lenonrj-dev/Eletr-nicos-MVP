"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type { Product } from "../lib/data";

export type CartLine = {
  product: Product;
  qty: number;
};

type CartState = {
  hydrated: boolean;
  lines: CartLine[];
  totalItems: number;
  subtotal: number;
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (slug: string) => void;
  increment: (slug: string) => void;
  decrement: (slug: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartState | null>(null);

function clampQty(value: number) {
  if (Number.isNaN(value)) return 1;
  if (value < 1) return 1;
  if (value > 99) return 99;
  return value;
}

function calcSubtotal(lines: CartLine[]) {
  return lines.reduce((acc, l) => acc + l.product.price * l.qty, 0);
}

function calcTotalItems(lines: CartLine[]) {
  return lines.reduce((acc, l) => acc + l.qty, 0);
}

const STORAGE_KEY = "ateliux_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [lines, setLines] = useState<CartLine[]>([]);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    let nextLines: CartLine[] = [];

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { lines?: CartLine[] };
        if (parsed?.lines && Array.isArray(parsed.lines)) {
          nextLines = parsed.lines
            .filter((l) => l?.product?.slug && typeof l.qty === "number")
            .map((l) => ({ ...l, qty: clampQty(l.qty) }));
        }
      }
    } catch {
      // ignore
    }

    setLines(nextLines);
    setHydrated(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Persist
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ lines })
      );
    } catch {
      // ignore
    }
  }, [hydrated, lines]);

  const addToCart = useCallback((product: Product, qty: number = 1) => {
    const addQty = clampQty(qty);

    setLines((prev) => {
      const idx = prev.findIndex((l) => l.product.slug === product.slug);
      if (idx === -1) return [...prev, { product, qty: addQty }];

      const next = [...prev];
      next[idx] = { ...next[idx], qty: clampQty(next[idx].qty + addQty) };
      return next;
    });
  }, []);

  const removeFromCart = useCallback((slug: string) => {
    setLines((prev) => prev.filter((l) => l.product.slug !== slug));
  }, []);

  const increment = useCallback((slug: string) => {
    setLines((prev) =>
      prev.map((l) =>
        l.product.slug === slug ? { ...l, qty: clampQty(l.qty + 1) } : l
      )
    );
  }, []);

  const decrement = useCallback((slug: string) => {
    setLines((prev) =>
      prev
        .map((l) =>
          l.product.slug === slug ? { ...l, qty: clampQty(l.qty - 1) } : l
        )
        .filter((l) => l.qty >= 1)
    );
  }, []);

  const clearCart = useCallback(() => {
    setLines([]);
  }, []);

  const subtotal = useMemo(() => calcSubtotal(lines), [lines]);
  const totalItems = useMemo(() => calcTotalItems(lines), [lines]);

  const value: CartState = useMemo(
    () => ({
      hydrated,
      lines,
      subtotal,
      totalItems,
      addToCart,
      removeFromCart,
      increment,
      decrement,
      clearCart,
    }),
    [
      hydrated,
      lines,
      subtotal,
      totalItems,
      addToCart,
      removeFromCart,
      increment,
      decrement,
      clearCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
}
