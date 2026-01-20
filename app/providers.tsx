"use client";

import { CartProvider } from "../Context/CartContext";
import { AuthProvider } from "../Context/AuthContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
}
