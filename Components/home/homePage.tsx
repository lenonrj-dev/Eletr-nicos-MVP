import Link from "next/link";

import Shell from "../layout/shell";
import ProductCard from "../shared/productCard";

import { HOME_PAGE } from "../../lib/data";

function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export default function HomePage() {
  const hero = HOME_PAGE.hero;

  return (
    <Shell variant="full">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-6 focus:z-50 focus:rounded-full focus:bg-neutral-900 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Pular para o conteúdo
      </a>

      <main id="conteudo" className="w-full bg-neutral-50">
        {/* HERO FULL WIDTH (1920x1080 no 2xl) */}
        <section className="relative w-full overflow-hidden bg-neutral-900 h-[560px] sm:h-[640px] lg:h-[760px] 2xl:h-[1080px]">
          <img
            src={hero.image}
            alt="Destaque da loja"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          <div className="relative z-10 flex h-full w-full items-end">
            <div className="w-full px-4 pb-10 sm:px-6 sm:pb-12 lg:px-10 lg:pb-14 2xl:px-16">
              <div className="grid w-full items-end gap-8 lg:grid-cols-12">
                {/* Left copy */}
                <div className="lg:col-span-6">
                  <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-white/85 backdrop-blur">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                    HOME PAGE
                  </p>

                  <h1 className="mt-4 max-w-[22ch] whitespace-pre-line text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                    {hero.title}
                  </h1>

                  <p className="mt-4 max-w-[58ch] text-sm leading-relaxed text-white/80 sm:text-base">
                    {hero.subtitle}
                  </p>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Link
                      href="/loja"
                      className="inline-flex h-11 w-full items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-100 active:scale-[0.98] sm:w-auto"
                    >
                      {hero.cta}
                    </Link>

                    <Link
                      href={`/product/${encodeURIComponent("loose-fit-hoodie")}`}
                      className="inline-flex h-11 w-full items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15 active:scale-[0.98] sm:w-auto"
                    >
                      Ver produto
                    </Link>
                  </div>

                  <div className="mt-7 flex w-full max-w-[520px] items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-neutral-900">
                      <span className="text-xs font-semibold">%</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-white">
                        {hero.priceTag.title}
                      </p>
                      <p className="text-xs text-white/75">
                        {formatPrice(hero.priceTag.price)}{" "}
                        <span className="text-white/35 line-through">
                          {formatPrice(hero.priceTag.oldPrice)}
                        </span>
                        <span className="ml-2 rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-neutral-900">
                          {hero.priceTag.badge}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right product + mini categories */}
                <div className="lg:col-span-6">
                  <div className="grid gap-4">
                    <div className="relative overflow-hidden rounded-[26px] border border-white/15 bg-white/10 p-3 backdrop-blur">
                      <div className="relative overflow-hidden rounded-[22px] bg-white">
                        <img
                          src={hero.image}
                          alt="Preview do produto"
                          className="h-[260px] w-full object-cover sm:h-[320px] lg:h-[360px] 2xl:h-[420px]"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-neutral-900 shadow-sm">
                          {hero.priceTag.badge}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {HOME_PAGE.categories.map((c) => (
                        <Link
                          key={c.title}
                          href="/loja"
                          className="group rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur transition hover:bg-white/15"
                        >
                          <div className="overflow-hidden rounded-2xl bg-neutral-900/20">
                            <img
                              src={c.image}
                              alt={c.title}
                              className="h-20 w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                          <p className="mt-2 text-xs font-semibold text-white">
                            {c.title}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Conteúdo FULL WIDTH (sem container comprimido) */}
        <div className="w-full px-4 py-10 sm:px-6 lg:px-10 lg:py-12 2xl:px-16">
          {/* Categorias */}
          <section>
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-neutral-900">
                Compre por categorias
              </h2>
              <Link
                href="/loja"
                className="text-xs text-neutral-500 hover:text-neutral-900"
              >
                Ver tudo
              </Link>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5">
              {HOME_PAGE.categories.map((cat) => (
                <Link
                  key={cat.title}
                  href="/loja"
                  className="group relative overflow-hidden rounded-[22px] border border-neutral-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="overflow-hidden rounded-[18px] bg-neutral-100">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="h-40 w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <p className="mt-3 text-sm font-semibold text-neutral-900">
                    {cat.title}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* Promo delivery */}
          <section className="mt-10 overflow-hidden rounded-[26px] border border-neutral-200 bg-white">
            <div className="grid gap-6 p-6 md:grid-cols-12 md:p-10">
              <div className="md:col-span-5">
                <p className="text-xs font-semibold tracking-wide text-neutral-500">
                  DELIVERY
                </p>
                <h3 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-neutral-900">
                  A Ateliux entrega
                  <br />
                  na sua casa
                </h3>
                <p className="mt-3 text-sm text-neutral-600">
                  Experiência rápida e organizada — do clique à entrega.
                </p>

                <Link
                  href="/loja"
                  className="mt-5 inline-flex h-11 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 px-6 text-sm font-semibold text-neutral-900 transition hover:bg-white active:scale-[0.98]"
                >
                  Explorar agora
                </Link>
              </div>

              <div className="md:col-span-7">
                <div className="relative overflow-hidden rounded-[22px] bg-neutral-100">
                  <img
                    src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1400&q=80"
                    alt="Entrega rápida"
                    className="h-[240px] w-full object-cover md:h-[260px]"
                    loading="lazy"
                    decoding="async"
                  />

                  <div className="absolute -bottom-8 left-6 hidden w-[210px] rounded-[28px] border border-neutral-200 bg-white shadow-[0_30px_60px_rgba(0,0,0,0.15)] md:block">
                    <div className="px-4 py-3">
                      <p className="text-[11px] font-semibold text-neutral-900">Ateliux</p>
                      <p className="mt-1 text-[10px] text-neutral-500">
                        Recomendado pra você
                      </p>
                    </div>
                    <div className="space-y-2 px-4 pb-4">
                      <div className="h-14 rounded-2xl bg-neutral-100" />
                      <div className="h-14 rounded-2xl bg-neutral-100" />
                      <div className="h-14 rounded-2xl bg-neutral-100" />
                    </div>
                  </div>

                  <div className="absolute -right-6 bottom-8 hidden w-[220px] rounded-[28px] border border-neutral-200 bg-white shadow-[0_30px_60px_rgba(0,0,0,0.15)] md:block">
                    <div className="px-4 py-3">
                      <p className="text-[11px] font-semibold text-neutral-900">SHOP</p>
                      <p className="mt-1 text-[10px] text-neutral-500">
                        Computadores & acessórios
                      </p>
                    </div>
                    <div className="px-4 pb-4">
                      <div className="h-36 rounded-2xl bg-neutral-100" />
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-[10px] text-neutral-500">A partir de</span>
                        <span className="text-[10px] font-semibold text-neutral-900">$125</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Listas de produtos */}
          <section className="mt-10">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-neutral-900">
                {HOME_PAGE.quickPicks[0].title}
              </h3>
              <Link
                href="/loja"
                className="text-xs text-neutral-500 hover:text-neutral-900"
              >
                Ver mais
              </Link>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6">
              {HOME_PAGE.quickPicks[0].products.map((p) => (
                <ProductCard key={p.id} product={p} variant="mini" />
              ))}
            </div>
          </section>

          <section className="mt-10">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-neutral-900">
                {HOME_PAGE.quickPicks[1].title}
              </h3>
              <Link
                href="/loja"
                className="text-xs text-neutral-500 hover:text-neutral-900"
              >
                Ver mais
              </Link>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6">
              {HOME_PAGE.quickPicks[1].products.map((p) => (
                <ProductCard key={p.id} product={p} variant="mini" />
              ))}
            </div>
          </section>

          {/* Comfy styles */}
          <section className="mt-10">
            <div className="grid gap-4 md:grid-cols-2">
              {HOME_PAGE.comfy.map((card) => (
                <Link
                  key={card.title}
                  href="/loja"
                  className="group relative overflow-hidden rounded-[26px] border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="relative overflow-hidden rounded-[22px] bg-neutral-100">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="h-56 w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                  </div>

                  <div className="mt-4">
                    <p className="text-lg font-semibold text-neutral-900">
                      {card.title}
                    </p>
                    <p className="mt-1 text-sm text-neutral-600">
                      {card.subtitle}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Must have */}
          <section className="mt-10">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-neutral-900">
                {HOME_PAGE.mustHave.title}
              </h3>
              <Link
                href="/loja"
                className="text-xs text-neutral-500 hover:text-neutral-900"
              >
                Ver mais
              </Link>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6">
              {HOME_PAGE.mustHave.products.map((p) => (
                <ProductCard key={p.id} product={p} variant="mini" />
              ))}
            </div>
          </section>

          {/* Subscribe */}
          <section className="mt-12 overflow-hidden rounded-[26px] border border-neutral-200 bg-white">
            <div className="grid gap-6 p-6 md:grid-cols-12 md:p-10">
              <div className="md:col-span-6">
                <p className="text-xs font-semibold tracking-wide text-neutral-500">
                  SUBSCRIBE
                </p>
                <h3 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900">
                  Inscreva-se nas novidades
                </h3>
                <p className="mt-3 text-sm text-neutral-600">
                  Receba ofertas, lançamentos e recomendações do nosso time.
                </p>

                <form className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <label className="sr-only" htmlFor="email-home">
                    Seu e-mail
                  </label>
                  <input
                    id="email-home"
                    type="email"
                    required
                    placeholder="Seu e-mail"
                    className={cn(
                      "h-11 w-full rounded-full border border-neutral-200 bg-white px-4 text-sm outline-none",
                      "placeholder:text-neutral-400 focus:border-neutral-900"
                    )}
                  />
                  <button
                    type="submit"
                    className="h-11 rounded-full bg-neutral-900 px-6 text-sm font-semibold text-white transition hover:bg-neutral-800 active:scale-[0.98]"
                  >
                    Inscrever
                  </button>
                </form>
              </div>

              <div className="md:col-span-6">
                <div className="relative overflow-hidden rounded-[22px] bg-neutral-100">
                  <img
                    src="https://images.unsplash.com/photo-1520975682064-6d7f66d5e7a6?auto=format&fit=crop&w=1400&q=80"
                    alt="Assinatura de novidades"
                    className="h-64 w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      
    </Shell>
  );
}
