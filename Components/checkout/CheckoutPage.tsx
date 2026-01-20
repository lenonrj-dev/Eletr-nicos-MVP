"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { useCart } from "../../Context/CartContext";
import CheckoutForm from "./CheckoutForm";
import OrderSummary from "./OrderSummary";

function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

export default function CheckoutPage() {
  const router = useRouter();
  const { hydrated, lines, subtotal, totalItems } = useCart();

  const [shipping, setShipping] = useState<"standard" | "express">("standard");
  const [coupon, setCoupon] = useState<string>("");
  const [isPaying, setIsPaying] = useState(false);

  const shippingValue = useMemo(() => {
    if (subtotal <= 0) return 0;
    return shipping === "express" ? 19.9 : 9.9;
  }, [subtotal, shipping]);

  const couponDiscount = useMemo(() => {
    const code = coupon.trim().toUpperCase();
    if (!code) return 0;

    // descontos fictÃ­cios (sÃ³ UI)
    if (code === "ATELIUX10") return Math.min(subtotal * 0.1, 35);
    if (code === "FRETEGRATIS") return Math.min(shippingValue, 19.9);

    return 0;
  }, [coupon, subtotal, shippingValue]);

  const total = Math.max(0, subtotal + shippingValue - couponDiscount);

  const onPay = async () => {
    if (lines.length === 0 || isPaying) return;

    setIsPaying(true);

    let nextUrl = "/checkout/success";

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lines: lines.map((line) => ({
            slug: line.product.slug,
            qty: line.qty,
          })),
        }),
      });

      if (res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { url?: string }
          | null;
        if (data?.url) {
          nextUrl = data.url;
        }
      }
    } catch {
      // ignore
    }

    router.push(nextUrl);
  };

  return (
    <div className="min-h-screen bg-neutral-50">

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">
              Checkout
            </h1>
            <p className="text-sm text-neutral-600">
              {hydrated ? (
                <>
                  Revise seus dados e finalize o pagamento. ({totalItems} item
                  {totalItems === 1 ? "" : "s"})
                </>
              ) : (
                <>Carregando checkout?I</>
              )}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/carrinho"
              className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-50"
            >
              Carrinho
            </Link>
            <Link
              href="/loja"
              className="rounded-full bg-neutral-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-neutral-800 active:scale-[0.98]"
            >
              Loja
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <section className="lg:col-span-8">
            {lines.length === 0 ? (
              <div className="rounded-[26px] border border-neutral-200 bg-white p-8 shadow-sm">
                <p className="text-sm font-semibold text-neutral-900">
                  Seu carrinho estÃ¡ vazio.
                </p>
                <p className="mt-2 text-sm text-neutral-600">
                  Adicione produtos antes de prosseguir para o checkout.
                </p>
                <div className="mt-5">
                  <Link
                    href="/loja"
                    className="inline-flex h-11 items-center justify-center rounded-full bg-neutral-900 px-6 text-sm font-semibold text-white transition hover:bg-neutral-800 active:scale-[0.98]"
                  >
                    Ir para a loja
                  </Link>
                </div>
              </div>
            ) : (
              <CheckoutForm
                shipping={shipping}
                onChangeShipping={setShipping}
              />
            )}

            {/* Stripe placeholder */}
            {lines.length > 0 ? (
              <div className="mt-6 rounded-[26px] border border-neutral-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">
                      Pagamento
                    </p>
                    <p className="mt-1 text-sm text-neutral-600">
                      Frontend pronto para plugar Stripe quando o backend estiver no ar.
                    </p>
                  </div>

                  <div className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-[11px] font-semibold text-neutral-700">
                    Stripe-ready
                  </div>
                </div>

                <div className="mt-5 rounded-3xl border border-dashed border-neutral-200 bg-neutral-50 p-5">
                  <p className="text-xs font-semibold text-neutral-900">
                    Stripe Elements (placeholder)
                  </p>
                  <p className="mt-1 text-xs text-neutral-600">
                    Aqui entra o CardElement / PaymentElement do Stripe.
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-white p-4">
                      <p className="text-xs font-semibold text-neutral-900">CartÃ£o</p>
                      <p className="mt-1 text-xs text-neutral-500">
                        Visa, Master, Amex
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white p-4">
                      <p className="text-xs font-semibold text-neutral-900">Wallets</p>
                      <p className="mt-1 text-xs text-neutral-500">
                        Apple Pay, Google Pay
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex w-full items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-2 sm:max-w-md">
                    <input
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="Cupom (ex: ATELIUX10)"
                      className="h-9 w-full bg-transparent px-2 text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
                      aria-label="Cupom de desconto"
                    />
                    <button
                      type="button"
                      onClick={() => setCoupon("")}
                      className={cn(
                        "rounded-full border border-neutral-200 px-3 py-2 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-50",
                        coupon.trim().length ? "" : "hidden"
                      )}
                    >
                      Limpar
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={onPay}
                    disabled={lines.length === 0 || isPaying}
                    className={cn(
                      "h-11 w-full rounded-full px-6 text-sm font-semibold transition active:scale-[0.98] sm:w-auto",
                      lines.length === 0
                        ? "cursor-not-allowed bg-neutral-200 text-neutral-500"
                        : isPaying
                        ? "cursor-wait bg-neutral-800 text-white"
                        : "bg-neutral-900 text-white hover:bg-neutral-800"
                    )}
                  >
                    {isPaying ? "Processandoâ¦" : "Pagar"}
                  </button>
                </div>

                <p className="mt-3 text-xs text-neutral-500">
                  Ao pagar, vocÃª aceita nossos termos e polÃ­tica de privacidade.
                </p>
              </div>
            ) : null}
          </section>

          <aside className="lg:col-span-4">
            <OrderSummary
              lines={lines}
              subtotal={subtotal}
              shipping={shippingValue}
              discount={couponDiscount}
              total={total}
            />
          </aside>
        </div>
      </main>

    </div>
  );
}
