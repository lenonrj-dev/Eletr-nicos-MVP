import type { Metadata } from "next";

import HomePage from "../../Components/home/homePage";

export const metadata: Metadata = {
  title: "Início",
  description: "Vitrine e destaques do e-commerce da Ateliux.",
};

export default function Page() {
  return <HomePage />;
}
