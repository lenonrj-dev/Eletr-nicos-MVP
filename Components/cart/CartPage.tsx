"use client";

import Link from "next/link";

import { useCart } from "../../Context/CartContext";

function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export default function CartPage() {
  const {
    hydrated,
    lines,
    subtotal,
    totalItems,
    increment,
    decrement,
    removeFromCart,
    clearCart,
  } = useCart();

  const shipping = subtotal > 0 ? 9.9 : 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-neutral-50">

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">
              Carrinho
            </h1>
            <p className="text-sm text-neutral-500">
              {hydrated ? (
                <>
                  {totalItems} item{totalItems === 1 ? "" : "s"} selecionado
                  {totalItems === 1 ? "" : "s"}.
                </>
              ) : (
                <>Carregando seu carrinho?I</>
              )}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/loja"
              className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-50"
            >
              Continuar comprando
            </Link>
            <Link
              href={lines.length === 0 ? "/loja" : "/checkout"}
              className={cn(
                "rounded-full px-4 py-2 text-xs font-semibold transition",
                lines.length === 0
                  ? "cursor-not-allowed bg-neutral-200 text-neutral-500"
                  : "bg-neutral-900 text-white hover:bg-neutral-800"
              )}
              aria-disabled={lines.length === 0}
              tabIndex={lines.length === 0 ? -1 : 0}
            >
              Finalizar
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          {/* Lines */}
          <section className="lg:col-span-8">
            <div className="rounded-[26px] border border-neutral-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-5">
                <p className="text-sm font-semibold text-neutral-900">Seus itens</p>

                <button
                  type="button"
                  onClick={clearCart}
                  className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-50"
                >
                  Limpar
                </button>
              </div>

              <div className="divide-y divide-neutral-200">
                {lines.length === 0 ? (
                  <div className="p-8">
                    <div className="rounded-3xl bg-neutral-50 p-8">
                      <p className="text-sm font-semibold text-neutral-900">
                        Seu carrinho estÃ¡ vazio.
                      </p>
                      <p className="mt-2 text-sm text-neutral-600">
                        Explore a loja e adicione seus itens favoritos.
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
                  </div>
                ) : (
                  lines.map((line) => (
                    <article
                      key={line.product.slug}
                      className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center"
                    >
                      <Link
                        href={`/product/${encodeURIComponent(line.product.slug)}`}
                        className="group flex items-center gap-4"
                      >
                        <div className="h-20 w-20 overflow-hidden rounded-2xl bg-neutral-100">
                          <img
                            src={line.product.image}
                            alt={line.product.title}
                            className="h-full w-full object-cover transition group-hover:scale-[1.02]"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-neutral-900">
                            {line.product.title}
                          </p>
                          <p className="mt-1 text-xs text-neutral-500">
                            {line.product.category}
                          </p>
                          <p className="mt-2 text-sm font-semibold text-neutral-900">
                            {formatPrice(line.product.price)}
                          </p>
                        </div>
                      </Link>

                      <div className="sm:ml-auto flex w-full flex-col items-start gap-3 sm:w-auto sm:items-end">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => decrement(line.product.slug)}
                            className="grid h-10 w-10 place-items-center rounded-full border border-neutral-200 bg-white text-neutral-800 transition hover:bg-neutral-50 active:scale-[0.98]"
                            aria-label="Diminuir quantidade"
                          >
                            <span className="text-lg leading-none">â</span>
                          </button>

                          <div className="min-w-[52px] rounded-full border border-neutral-200 bg-white px-4 py-2 text-center text-sm font-semibold text-neutral-900">
                            {line.qty}
                          </div>

                          <button
                            type="button"
                            onClick={() => increment(line.product.slug)}
                            className="grid h-10 w-10 place-items-center rounded-full border border-neutral-200 bg-white text-neutral-800 transition hover:bg-neutral-50 active:scale-[0.98]"
                            aria-label="Aumentar quantidade"
                          >
                            <span className="text-lg leading-none">+</span>
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => removeFromCart(line.product.slug)}
                            className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-50"
                          >
                            Remover
                          </button>

                          <p className="text-sm font-semibold text-neutral-900">
                            {formatPrice(line.product.price * line.qty)}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </div>
          </section>

          {/* Summary */}
          <aside className="lg:col-span-4">
            <div className="sticky top-6 rounded-[26px] border border-neutral-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-neutral-900">Resumo</p>

              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between text-sm text-neutral-700">
                  <span>Subtotal</span>
                  <span className="font-semibold text-neutral-900">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-neutral-700">
                  <span>Frete</span>
                  <span className="font-semibold text-neutral-900">
                    {formatPrice(shipping)}
                  </span>
                </div>

                <div className="h-px w-full bg-neutral-200" />

                <div className="flex items-center justify-between text-sm text-neutral-700">
                  <span>Total</span>
                  <span className="text-lg font-semibold text-neutral-900">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <Link
                href={lines.length === 0 ? "/loja" : "/checkout"}
                className={cn(
                  "mt-6 inline-flex h-11 w-full items-center justify-center rounded-full px-6 text-sm font-semibold transition active:scale-[0.98]",
                  lines.length === 0
                    ? "cursor-not-allowed bg-neutral-200 text-neutral-500"
                    : "bg-neutral-900 text-white hover:bg-neutral-800"
                )}
                aria-disabled={lines.length === 0}
                tabIndex={lines.length === 0 ? -1 : 0}
              >
                Finalizar compra
              </Link>

              <p className="mt-3 text-xs text-neutral-500">
                Checkout e pagamento estÃ£o prontos para plugar Stripe.
              </p>
            </div>
          </aside>
        </div>
      </main>

      <footer className="border-t border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-neutral-500">Â© {new Date().getFullYear()} Ateliux</p>
          <div className="flex items-center gap-4 text-xs text-neutral-500">
            <Link href="/" className="hover:text-neutral-900">
              Termos
            </Link>
            <Link href="/" className="hover:text-neutral-900">
              Privacidade
            </Link>
            <Link href="/" className="hover:text-neutral-900">
              Ajuda
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
