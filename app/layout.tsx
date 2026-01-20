import type { Metadata } from "next";

import "./globals.css";
import Providers from "./providers";

import SiteHeader from "../Components/layout/SiteHeader";
import FooterMega from "../Components/layout/footerMega";

export const metadata: Metadata = {
  title: "Ateliux",
  description: "Ecommerce premium da Ateliux — eletrônicos e acessórios.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="min-h-screen bg-white text-neutral-900 antialiased overflow-x-hidden">
        <Providers>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <FooterMega variant="home" />
          </div>
        </Providers>
      </body>
    </html>
  );
}
