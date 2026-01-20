"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import type { Product } from "../../lib/data";
import { ALSO_LIKE } from "../../lib/data";
import ProductCard from "../shared/productCard";
import Stars from "../shared/stars";
import { useCart } from "../../Context/CartContext";

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export default function ProductPage({ product }: { product: Product }) {
  const router = useRouter();
  const { addToCart } = useCart();

  const gallery = useMemo(() => {
    const base = product.gallery?.length ? product.gallery : [product.image];
    return base.slice(0, 4);
  }, [product]);

  const [active, setActive] = useState(0);
  const brand = product.brand ?? "Ateliux";
  const model = product.model ?? product.slug.replace(/-/g, " ").toUpperCase();
  const warrantyMonths = product.warrantyMonths ?? 12;
  const stockStatus = product.stockStatus ?? "in_stock";
  const stockMeta =
    stockStatus === "out_of_stock"
      ? {
          label: "Esgotado",
          className: "border-red-200 bg-red-50 text-red-700",
        }
      : stockStatus === "low_stock"
      ? {
          label: "Ultimas unidades",
          className: "border-amber-200 bg-amber-50 text-amber-700",
        }
      : {
          label: "Em estoque",
          className: "border-emerald-200 bg-emerald-50 text-emerald-700",
        };
  const highlights = product.highlights?.length
    ? product.highlights
    : ["Bluetooth 5.3", "Noise canceling", "20h battery", "USB-C charging"];
  const specs = {
    connectivity: product.specs?.connectivity ?? "Bluetooth 5.3",
    battery: product.specs?.battery ?? "20h",
    weight: product.specs?.weight ?? "220g",
    dimensions: product.specs?.dimensions ?? "18 x 8 x 6 cm",
    color: product.specs?.color ?? "Black",
    power: product.specs?.power ?? "USB-C",
    material: product.specs?.material ?? "Polycarbonate",
  };
  const inTheBox = product.inTheBox?.length
    ? product.inTheBox
    : ["Produto", "Cabo USB-C", "Manual rapido", "Garantia"];

  const onAdd = () => addToCart(product, 1);

  const onBuyNow = () => {
    addToCart(product, 1);
    router.push("/carrinho");
  };

  return (
    <div className="min-h-screen bg-neutral-50">

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="text-xs text-neutral-500">
          Home • Product details •{" "}
          <span className="text-neutral-900">{product.title}</span>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          {/* Gallery */}
          <section className="lg:col-span-7 rounded-[26px] border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="overflow-hidden rounded-[26px] bg-neutral-100">
              <img
                src={gallery[active]}
                alt={product.title}
                className="h-[420px] w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="mt-4 grid grid-cols-4 gap-3">
              {gallery.map((img, idx) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setActive(idx)}
                  className={`overflow-hidden rounded-2xl border ${
                    active === idx
                      ? "border-neutral-900"
                      : "border-neutral-200"
                  } bg-neutral-100 transition hover:opacity-90`}
                  aria-label={`Selecionar imagem ${idx + 1}`}
                >
                  <img
                    src={img}
                    alt=""
                    className="h-20 w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              ))}
            </div>
          </section>

          {/* Info */}
          <aside className="lg:col-span-5 rounded-[26px] border border-neutral-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold text-neutral-500">
              {product.badge ?? "Man Fashion"}
            </p>

            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900">
              {product.title}
            </h1>

            <p className="mt-3 text-lg font-semibold text-neutral-900">
              {formatPrice(product.price)}
            </p>

            <div className="mt-3 flex items-center gap-2">
              <Stars rating={product.rating} />
              <span className="text-xs text-neutral-500">
                {product.rating.toFixed(1)} ({product.reviews.toLocaleString()}{" "}
                reviews)
              </span>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-[11px] font-semibold text-neutral-700">
                {brand}
              </span>
              <span className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-[11px] font-semibold text-neutral-700">
                {model}
              </span>
              <span
                className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${stockMeta.className}`}
              >
                {stockMeta.label}
              </span>
              <span className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-[11px] font-semibold text-neutral-700">
                Garantia {warrantyMonths} meses
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={onAdd}
                className="h-11 rounded-full border border-neutral-200 bg-white text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 active:scale-[0.98]"
              >
                Add to Cart
              </button>

              <button
                type="button"
                onClick={onBuyNow}
                className="h-11 rounded-full bg-neutral-900 text-sm font-semibold text-white transition hover:bg-neutral-800 active:scale-[0.98]"
              >
                Buy Now
              </button>
            </div>
            <div className="mt-6 space-y-3">
              <div className="rounded-2xl border border-neutral-200 bg-white p-4">
                <p className="text-xs font-semibold text-neutral-900">
                  Destaques
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {highlights.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-[11px] font-semibold text-neutral-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-4">
                <p className="text-xs font-semibold text-neutral-900">
                  Especificacoes tecnicas
                </p>
                <div className="mt-3 space-y-2 text-xs text-neutral-600">
                  {[
                    ["Conectividade", specs.connectivity],
                    ["Bateria", specs.battery],
                    ["Peso", specs.weight],
                    ["Dimensoes", specs.dimensions],
                    ["Cor", specs.color],
                    ["Energia", specs.power],
                    ["Material", specs.material],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between gap-4"
                    >
                      <span>{label}</span>
                      <span className="font-semibold text-neutral-900">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-4">
                <p className="text-xs font-semibold text-neutral-900">
                  Conteudo da caixa
                </p>
                <ul className="mt-3 list-disc space-y-1 pl-4 text-xs text-neutral-600">
                  {inTheBox.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-4">
                <p className="text-xs font-semibold text-neutral-900">
                  Entrega e devolucao
                </p>
                <div className="mt-3 grid gap-2 text-xs text-neutral-600">
                  <p>Entrega: 3-5 dias uteis apos despacho.</p>
                  <p>Devolucao: ate 7 dias apos recebimento.</p>
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-4">
                <p className="text-xs font-semibold text-neutral-900">
                  Detalhes
                </p>
                <p className="mt-2 text-sm text-neutral-600">
                  {product.description ??
                    "Produto premium com acabamento limpo e desempenho consistente para o dia a dia."}
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* Also like */}
        <section className="mt-10">
          <h2 className="text-3xl font-semibold tracking-tight text-neutral-900">
            You might also like
          </h2>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ALSO_LIKE.map((p) => (
              <ProductCard key={p.id} product={p} variant="mini" />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
