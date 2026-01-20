import type { Metadata } from "next";

import ShopPage from "../../Components/shop/shopPage";

export const metadata: Metadata = {
  title: "Loja",
  description: "Todos os produtos disponíveis na loja Ateliux.",
};

export default function Page() {
  return <ShopPage />;
}
