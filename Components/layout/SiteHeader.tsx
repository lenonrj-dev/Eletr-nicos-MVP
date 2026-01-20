"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  ChevronDown,
  LayoutDashboard,
  LogIn,
  LogOut,
  Package,
  ShoppingBag,
  ShoppingCart,
  UserRound,
} from "lucide-react";

import { useCart } from "../../Context/CartContext";
import { useAuth } from "../../Context/AuthContext";

type NavItem = {
  href: string;
  label: string;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/inicio", label: "Início" },
  { href: "/loja", label: "Loja" },
  { href: "/carrinho", label: "Carrinho" },
  { href: "/checkout", label: "Checkout" },
];

const ATELIUX_LOGO_URL =
  "https://res.cloudinary.com/df4wjugxk/image/upload/v1768862808/Logo_Ateliux_sem_Fundo_Preto_-_Editado_chxokm.png";

function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const { hydrated: cartHydrated, totalItems } = useCart();
  const {
    hydrated: authHydrated,
    isAuthenticated,
    user,
    logout,
  } = useAuth();

  const [open, setOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const cartCount = cartHydrated ? totalItems : 0;

  const isActive = (href: string) => {
    if (href === "/inicio") return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const cartBadge = (
    <span
      className={cn(
        "ml-2 inline-flex min-w-[20px] items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
        cartCount > 0
          ? "bg-neutral-900 text-white"
          : "bg-neutral-200 text-neutral-600"
      )}
      aria-label={`Itens no carrinho: ${cartCount}`}
      suppressHydrationWarning
    >
      {cartCount}
    </span>
  );

  const userLabel = useMemo(() => {
    if (!authHydrated) return "Conta";
    if (!isAuthenticated) return "Entrar";
    return user?.firstName ? `${user.firstName}` : "Minha conta";
  }, [authHydrated, isAuthenticated, user]);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/inicio"
          className="flex items-center gap-3 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
          aria-label="Ir para Início"
        >
          <div className="relative grid h-10 w-10 place-items-center rounded-full bg-neutral-900/5">
            <div className="relative h-9 w-9">
              <img
                src={ATELIUX_LOGO_URL}
                alt="Logo Ateliux"
                className="h-full w-full object-contain drop-shadow-[0_2px_10px_rgba(0,0,0,0.28)]"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>

          <div className="leading-tight">
            <span className="block text-sm font-semibold text-neutral-900">
              Ateliux
            </span>
            <span className="block text-[11px] text-neutral-500">
              Eletrônicos e acessórios premium
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex" aria-label="Principal">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "inline-flex items-center rounded-full border px-4 py-2 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900",
                  active
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.href === "/carrinho" ? (
                  <ShoppingCart className="mr-2 h-4 w-4" aria-hidden="true" />
                ) : item.href === "/loja" ? (
                  <ShoppingBag className="mr-2 h-4 w-4" aria-hidden="true" />
                ) : null}

                {item.label}
                {item.href === "/carrinho" ? cartBadge : null}
              </Link>
            );
          })}

          <div className="relative">
            <button
              type="button"
              onClick={() => setUserOpen((v) => !v)}
              className={cn(
                "inline-flex items-center rounded-full border px-4 py-2 text-xs font-semibold transition",
                "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
              )}
              aria-label="Menu da conta"
              aria-expanded={userOpen}
            >
              <UserRound className="mr-2 h-4 w-4" aria-hidden="true" />
              <span suppressHydrationWarning>{userLabel}</span>
              <ChevronDown className="ml-2 h-4 w-4" aria-hidden="true" />
            </button>

            {userOpen ? (
              <div
                className="absolute right-0 mt-2 w-64 overflow-hidden rounded-[22px] border border-neutral-200 bg-white shadow-[0_30px_70px_rgba(0,0,0,0.10)]"
                role="menu"
                aria-label="Opções da conta"
              >
                <div className="px-4 py-3">
                  <p className="text-xs font-semibold text-neutral-900">
                    {authHydrated && isAuthenticated
                      ? `@${user?.username}`
                      : "Área do cliente"}
                  </p>
                  <p className="mt-1 text-[11px] text-neutral-500">
                    {authHydrated && isAuthenticated
                      ? "Gerencie sua conta e pedidos"
                      : "Entre para acompanhar pedidos"}
                  </p>
                </div>

                <div className="h-px w-full bg-neutral-200" />

                {authHydrated && isAuthenticated ? (
                  <div className="p-2">
                    <Link
                      href="/minha-conta"
                      onClick={() => setUserOpen(false)}
                      className="flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
                      role="menuitem"
                    >
                      <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
                      Minha conta
                    </Link>
                    <Link
                      href="/meus-pedidos"
                      onClick={() => setUserOpen(false)}
                      className="flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
                      role="menuitem"
                    >
                      <Package className="h-4 w-4" aria-hidden="true" />
                      Meus pedidos
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setUserOpen(false);
                        router.push("/inicio");
                      }}
                      className="flex w-full items-center gap-2 rounded-2xl px-3 py-2 text-left text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
                      role="menuitem"
                    >
                      <LogOut className="h-4 w-4" aria-hidden="true" />
                      Sair
                    </button>
                  </div>
                ) : (
                  <div className="p-2">
                    <Link
                      href="/login"
                      onClick={() => setUserOpen(false)}
                      className="flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
                      role="menuitem"
                    >
                      <LogIn className="h-4 w-4" aria-hidden="true" />
                      Entrar / Criar conta
                    </Link>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/carrinho"
            className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
            aria-label={`Carrinho com ${cartCount} itens`}
          >
            <ShoppingCart className="mr-2 h-4 w-4" aria-hidden="true" />
            Carrinho
            {cartBadge}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-full border border-neutral-200 bg-white text-neutral-700 transition hover:bg-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
            aria-label="Alternar menu"
            aria-expanded={open}
            aria-controls="site-header-nav"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        id="site-header-nav"
        className={cn(
          "border-t border-neutral-200 bg-white px-6 py-4 md:hidden",
          open ? "block" : "hidden"
        )}
      >
        <nav className="flex flex-col gap-2" aria-label="Menu">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "inline-flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900",
                  active
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
                )}
                aria-current={active ? "page" : undefined}
              >
                <span className="inline-flex items-center gap-2">
                  {item.href === "/carrinho" ? (
                    <ShoppingCart className="h-4 w-4" aria-hidden="true" />
                  ) : item.href === "/loja" ? (
                    <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                  ) : null}
                  {item.label}
                </span>
                {item.href === "/carrinho" ? cartBadge : null}
              </Link>
            );
          })}

          <div className="mt-2 rounded-[22px] border border-neutral-200 bg-white p-2">
            {authHydrated && isAuthenticated ? (
              <>
                <Link
                  href="/minha-conta"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-2xl px-3 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
                >
                  <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
                  Minha conta
                </Link>
                <Link
                  href="/meus-pedidos"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-2xl px-3 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
                >
                  <Package className="h-4 w-4" aria-hidden="true" />
                  Meus pedidos
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setOpen(false);
                    router.push("/inicio");
                  }}
                  className="flex w-full items-center gap-2 rounded-2xl px-3 py-3 text-left text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
                >
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                  Sair
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-2xl px-3 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
              >
                <LogIn className="h-4 w-4" aria-hidden="true" />
                Entrar / Criar conta
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
