"use client";

import { useMemo, useState } from "react";

import ProductCard from "../shared/productCard";
import { getAllProducts, SHOP_GRID } from "../../lib/data";
import type { Product } from "../../lib/data";

function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

const PAGE_SIZE = 9;

export default function ShopPage() {
  const all = useMemo(() => getAllProducts(), []);
  const baseGrid = useMemo(() => SHOP_GRID, []);

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<
    "All" | "Home" | "Music" | "Other"
  >("All");
  const [activeBadge, setActiveBadge] = useState<
    "All" | "New Arrival" | "Best Seller" | "On Discount"
  >("All");
  const [page, setPage] = useState(1);

  const categoriesCount = useMemo(() => {
    const counts = {
      All: all.length,
      Home: all.filter((p) => p.category === "Home").length,
      Music: all.filter((p) => p.category === "Music").length,
      Other: all.filter((p) => p.category === "Other").length,
    };
    return counts;
  }, [all]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list: Product[] = all;

    // category
    if (activeCategory !== "All") {
      list = list.filter((p) => p.category === activeCategory);
    }

    // badge filters (ficcional, mas real com base no conteúdo)
    if (activeBadge !== "All") {
      if (activeBadge === "New Arrival") {
        list = list.filter((p) => p.id === "p1" || p.id === "p2" || p.id === "p8");
      }
      if (activeBadge === "Best Seller") {
        list = list.filter((p) => p.reviews >= 900);
      }
      if (activeBadge === "On Discount") {
        list = list.filter((p) => typeof p.oldPrice === "number");
      }
    }

    // search
    if (q.length) {
      list = list.filter((p) => {
        const haystack = `${p.title} ${p.slug} ${p.category}`.toLowerCase();
        return haystack.includes(q);
      });
    }

    // fallback para manter o grid idêntico no visual quando nada filtrado
    if (!q && activeCategory === "All" && activeBadge === "All") {
      return baseGrid;
    }

    return list;
  }, [all, baseGrid, query, activeCategory, activeBadge]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pages);

  const paged = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, safePage]);

  const onSelectCategory = (value: typeof activeCategory) => {
    setActiveCategory(value);
    setPage(1);
  };

  const onSelectBadge = (value: typeof activeBadge) => {
    setActiveBadge(value);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-neutral-50">

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-8">
        <div className="relative overflow-hidden rounded-[30px] border border-neutral-200 bg-white shadow-sm">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent" />
            <img
              src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80"
              alt=""
              className="h-full w-full object-cover opacity-[0.22]"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="relative p-6 sm:p-8">
            <h1 className="text-5xl font-black tracking-tight text-white drop-shadow sm:text-7xl">
              Shop
            </h1>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-neutral-900">
                  Give All You Need
                </p>
                <p className="mt-1 text-sm text-neutral-600">
                  Selecione categorias, pesquise e monte seu carrinho.
                </p>
              </div>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex w-full max-w-md items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-2 shadow-sm"
              >
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search on Ateliux"
                  className="h-9 w-full bg-transparent px-2 text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
                />

                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className={cn(
                    "rounded-full border border-neutral-200 px-3 py-2 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-50",
                    query.trim().length ? "" : "hidden"
                  )}
                >
                  Limpar
                </button>

                <button
                  type="submit"
                  className="h-9 rounded-full bg-neutral-900 px-4 text-xs font-semibold text-white transition hover:bg-neutral-800"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Main */}
      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          {/* Sidebar */}
          <aside className="rounded-[26px] border border-neutral-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-neutral-900">Category</p>

            <div className="mt-5 space-y-2">
              <button
                type="button"
                onClick={() => onSelectCategory("All")}
                className={cn(
                  "flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-xs font-semibold transition",
                  activeCategory === "All"
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
                )}
              >
                <span>All Product</span>
                <span className="text-[11px] opacity-90">
                  {categoriesCount.All}
                </span>
              </button>

              {(["Home", "Music", "Other"] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => onSelectCategory(cat)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-xs font-semibold transition",
                    activeCategory === cat
                      ? "border-neutral-900 bg-neutral-900 text-white"
                      : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
                  )}
                >
                  <span>{cat}</span>
                  <span className="text-[11px] opacity-90">
                    {categoriesCount[cat]}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-6 h-px w-full bg-neutral-200" />

            <p className="mt-6 text-sm font-semibold text-neutral-900">
              Destaques
            </p>

            <div className="mt-4 space-y-2">
              {(
                ["All", "New Arrival", "Best Seller", "On Discount"] as const
              ).map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => onSelectBadge(tag)}
                  className={cn(
                    "w-full rounded-2xl border px-4 py-3 text-left text-xs font-semibold transition",
                    activeBadge === tag
                      ? "border-neutral-900 bg-neutral-900 text-white"
                      : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </aside>

          {/* Grid */}
          <section className="rounded-[26px] border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {paged.length === 0 ? (
                <div className="col-span-full rounded-[26px] border border-neutral-200 bg-neutral-50 p-8">
                  <p className="text-sm font-semibold text-neutral-900">
                    Nenhum produto encontrado.
                  </p>
                  <p className="mt-2 text-sm text-neutral-600">
                    Tente outra palavra ou mude os filtros.
                  </p>
                </div>
              ) : (
                paged.map((p) => <ProductCard key={p.id} product={p} />)
              )}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setPage((v) => Math.max(1, v - 1))}
                className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={safePage === 1}
              >
                ← Previous
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: pages }).slice(0, 10).map((_, idx) => {
                  const num = idx + 1;
                  const active = num === safePage;

                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setPage(num)}
                      className={cn(
                        "grid h-9 w-9 place-items-center rounded-full border text-xs font-semibold transition",
                        active
                          ? "border-neutral-900 bg-neutral-900 text-white"
                          : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
                      )}
                      aria-label={`Ir para página ${num}`}
                    >
                      {num}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setPage((v) => Math.min(pages, v + 1))}
                className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={safePage === pages}
              >
                Next →
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
