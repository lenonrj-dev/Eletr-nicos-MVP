import { notFound } from "next/navigation";

import ProductPage from "../../../Components/product/productPage";
import { getProductBySlug } from "../../../lib/data";

type PageProps = {
  params: { slug: string } | Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const normalizedSlug = (() => {
    try {
      return decodeURIComponent(slug).trim().toLowerCase();
    } catch {
      return slug.trim().toLowerCase();
    }
  })();
  const product = getProductBySlug(normalizedSlug);

  if (!product) return notFound();

  return <ProductPage product={product} />;
}
