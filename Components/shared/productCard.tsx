"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import type { Product } from "../../lib/data";
import { useCart } from "../../Context/CartContext";
import Stars from "./stars";

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export default function ProductCard({
  product,
  variant = "shop",
}: {
  product: Product;
  variant?: "shop" | "mini";
}) {
  const router = useRouter();
  const { addToCart } = useCart();
  const isMini = variant === "mini";

  const href = `/product/${encodeURIComponent(product.slug)}`;

  const onAdd = () => addToCart(product, 1);

  const onBuyNow = () => {
    addToCart(product, 1);
    router.push("/carrinho");
  };

  return (
    <div
      className={`relative rounded-[26px] border border-neutral-200 bg-white shadow-sm transition hover:shadow-md ${
        isMini ? "p-3" : "p-4"
      }`}
    >
      {product.badge ? (
        <div className="absolute right-4 top-4 z-10 rounded-full border border-neutral-200 bg-white px-3 py-1 text-[11px] font-semibold text-neutral-700">
          {product.badge}
        </div>
      ) : null}

      <Link href={href} className="block">
        <div className="overflow-hidden rounded-[22px] bg-neutral-100">
          <img
            src={product.image}
            alt={product.title}
            className={`w-full object-cover transition hover:scale-[1.02] ${
              isMini ? "h-36" : "h-44"
            }`}
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="mt-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-neutral-900">
              {product.title}
            </p>

            <div className="mt-2 flex items-center gap-2">
              <Stars rating={product.rating} />
              <span className="text-[11px] text-neutral-500">
                {product.rating.toFixed(1)} ({product.reviews.toLocaleString()}{" "}
                reviews)
              </span>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm font-semibold text-neutral-900">
              {formatPrice(product.price)}
            </p>
            {product.oldPrice ? (
              <p className="mt-1 text-xs text-neutral-400 line-through">
                {formatPrice(product.oldPrice)}
              </p>
            ) : null}
          </div>
        </div>
      </Link>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={onAdd}
          className="h-10 rounded-full border border-neutral-200 bg-white text-xs font-semibold text-neutral-700 transition hover:bg-neutral-50 active:scale-[0.98]"
        >
          Add to Cart
        </button>

        <button
          type="button"
          onClick={onBuyNow}
          className="h-10 rounded-full bg-neutral-900 text-xs font-semibold text-white transition hover:bg-neutral-800 active:scale-[0.98]"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
