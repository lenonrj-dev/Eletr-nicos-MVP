"use client";

import Link from "next/link";

import type { CartLine } from "../../Context/CartContext";

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export default function OrderSummary({
  lines,
  subtotal,
  shipping,
  discount,
  total,
}: {
  lines: CartLine[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
}) {
  return (
    <div className="sticky top-6 rounded-[26px] border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-neutral-900">Resumo do pedido</p>
          <p className="mt-1 text-xs text-neutral-500">Itens do carrinho e total final.</p>
        </div>

        <Link
          href="/carrinho"
          className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-[11px] font-semibold text-neutral-700 transition hover:bg-neutral-50"
        >
          Editar
        </Link>
      </div>

      <div className="mt-5 space-y-4">
        {lines.map((l) => (
          <div key={l.product.slug} className="flex items-center gap-3">
            <div className="h-12 w-12 overflow-hidden rounded-2xl bg-neutral-100">
              <img
                src={l.product.image}
                alt={l.product.title}
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-neutral-900">{l.product.title}</p>
              <p className="mt-1 text-[11px] text-neutral-500">Qty: {l.qty} • {l.product.category}</p>
            </div>

            <p className="text-xs font-semibold text-neutral-900">{formatPrice(l.product.price * l.qty)}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 h-px w-full bg-neutral-200" />

      <div className="mt-5 space-y-3">
        <div className="flex items-center justify-between text-sm text-neutral-700">
          <span>Subtotal</span>
          <span className="font-semibold text-neutral-900">{formatPrice(subtotal)}</span>
        </div>

        <div className="flex items-center justify-between text-sm text-neutral-700">
          <span>Frete</span>
          <span className="font-semibold text-neutral-900">{formatPrice(shipping)}</span>
        </div>

        {discount > 0 ? (
          <div className="flex items-center justify-between text-sm text-neutral-700">
            <span>Desconto</span>
            <span className="font-semibold text-neutral-900">− {formatPrice(discount)}</span>
          </div>
        ) : null}

        <div className="h-px w-full bg-neutral-200" />

        <div className="flex items-center justify-between text-sm text-neutral-700">
          <span>Total</span>
          <span className="text-lg font-semibold text-neutral-900">{formatPrice(total)}</span>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-neutral-50 p-4">
        <p className="text-xs font-semibold text-neutral-900">Proteção de compra</p>
        <p className="mt-1 text-xs text-neutral-600">Você verá o pagamento no Stripe quando o backend estiver conectado.</p>
      </div>

      <p className="mt-4 text-xs text-neutral-500">Seus dados serão usados apenas para processar o pedido.</p>
    </div>
  );
}
