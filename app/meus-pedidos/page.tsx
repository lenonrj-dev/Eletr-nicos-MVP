import type { Metadata } from "next";

import MyOrdersPage from "../../Components/orders/MyOrdersPage";

export const metadata: Metadata = {
  title: "Meus Pedidos • Ateliux",
  description: "Acompanhe seus pedidos e o andamento das entregas.",
};

export default function Page() {
  return <MyOrdersPage />;
}
