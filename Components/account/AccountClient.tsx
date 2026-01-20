"use client";

import Link from "next/link";
import { LayoutDashboard, Package, UserRound } from "lucide-react";

import RequireAuth from "../auth/RequireAuth";
import { useAuth } from "../../Context/AuthContext";

export default function AccountClient() {
  const { user } = useAuth();

  return (
    <main className="bg-neutral-50">
      <div className="px-6 py-10 md:px-10">
        <RequireAuth>
          <section className="rounded-[26px] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold tracking-wide text-neutral-500">
                  DASHBOARD DO CLIENTE
                </p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900">
                  Minha Conta
                </h1>
                <p className="mt-2 text-sm text-neutral-600">
                  Bem-vindo, <span className="font-semibold">{user?.firstName}</span>. Aqui você gerencia seu acesso e pedidos.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-neutral-900 text-white shadow-sm">
                  <UserRound className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-neutral-900">
                    @{user?.username}
                  </p>
                  <p className="truncate text-xs text-neutral-500">
                    {user?.firstName} {user?.lastName} • {user?.phone}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <Link
                href="/meus-pedidos"
                className="group rounded-[22px] border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-2xl bg-neutral-900 text-white">
                    <Package className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-neutral-900">Meus pedidos</p>
                    <p className="mt-1 text-xs text-neutral-600">
                      Acompanhe status, entrega e histórico de compras.
                    </p>
                  </div>
                </div>
                <div className="mt-4 h-px w-full bg-neutral-200" />
                <p className="mt-4 text-xs font-semibold text-neutral-900">Ver pedidos</p>
              </Link>

              <Link
                href="/loja"
                className="group rounded-[22px] border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-2xl bg-neutral-900 text-white">
                    <LayoutDashboard className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-neutral-900">
                      Continuar comprando
                    </p>
                    <p className="mt-1 text-xs text-neutral-600">
                      Volte para a vitrine e descubra novos produtos.
                    </p>
                  </div>
                </div>
                <div className="mt-4 h-px w-full bg-neutral-200" />
                <p className="mt-4 text-xs font-semibold text-neutral-900">Ir para loja</p>
              </Link>
            </div>

            <div className="mt-8 rounded-2xl bg-neutral-50 p-4">
              <p className="text-xs font-semibold text-neutral-900">Em breve</p>
              <p className="mt-1 text-xs text-neutral-600">
                Área para endereços, dados de pagamento e suporte — pronta para integrar com autenticação real no backend.
              </p>
            </div>
          </section>
        </RequireAuth>
      </div>
    </main>
  );
}
