"use client";

import Link from "next/link";
import { PackageCheck, Truck, Clock3, ArrowLeft } from "lucide-react";

import Shell from "../layout/shell";
import FooterMega from "../layout/footerMega";
import RequireAuth from "../auth/RequireAuth";

function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

const MOCK_ORDERS = [
  {
    id: "#ATX-10294",
    status: "Em separação",
    date: "Hoje",
    total: "$129.90",
    items: 2,
  },
  {
    id: "#ATX-10211",
    status: "Enviado",
    date: "Ontem",
    total: "$59.90",
    items: 1,
  },
  {
    id: "#ATX-10098",
    status: "Entregue",
    date: "Semana passada",
    total: "$249.00",
    items: 4,
  },
];

export default function MyOrdersPage() {
  return (
    <Shell>
      <main className="bg-neutral-50">
        <div className="px-6 py-10 md:px-10">
          <RequireAuth>
            <section className="rounded-[26px] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold tracking-wide text-neutral-500">
                    HISTÓRICO
                  </p>
                  <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900">
                    Meus pedidos
                  </h1>
                  <p className="mt-2 text-sm text-neutral-600">
                    Status e atualização dos pedidos em tempo real (demo).
                  </p>
                </div>

                <Link
                  href="/minha-conta"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-neutral-200 bg-white px-6 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50 active:scale-[0.98]"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
                  Minha conta
                </Link>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <StatCard
                  icon={Clock3}
                  title="Em andamento"
                  value="2"
                  desc="Pedidos em separação ou enviados"
                />
                <StatCard
                  icon={Truck}
                  title="Em rota"
                  value="1"
                  desc="Entrega estimada e rastreio"
                />
                <StatCard
                  icon={PackageCheck}
                  title="Concluídos"
                  value="1"
                  desc="Pedidos entregues com sucesso"
                />
              </div>

              <div className="mt-8 overflow-hidden rounded-[22px] border border-neutral-200">
                <div className="grid grid-cols-12 gap-2 bg-neutral-50 px-5 py-3 text-[11px] font-semibold text-neutral-500">
                  <span className="col-span-5">Pedido</span>
                  <span className="col-span-3">Status</span>
                  <span className="col-span-2">Itens</span>
                  <span className="col-span-2 text-right">Total</span>
                </div>

                <div className="divide-y divide-neutral-200">
                  {MOCK_ORDERS.map((o) => (
                    <div
                      key={o.id}
                      className="grid grid-cols-12 items-center gap-2 px-5 py-4"
                    >
                      <div className="col-span-5 min-w-0">
                        <p className="truncate text-sm font-semibold text-neutral-900">
                          {o.id}
                        </p>
                        <p className="mt-1 text-xs text-neutral-500">{o.date}</p>
                      </div>

                      <div className="col-span-3">
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold",
                            o.status === "Entregue"
                              ? "bg-emerald-50 text-emerald-700"
                              : o.status === "Enviado"
                              ? "bg-sky-50 text-sky-700"
                              : "bg-amber-50 text-amber-700"
                          )}
                        >
                          {o.status}
                        </span>
                      </div>

                      <div className="col-span-2 text-sm font-semibold text-neutral-900">
                        {o.items}
                      </div>

                      <div className="col-span-2 text-right text-sm font-semibold text-neutral-900">
                        {o.total}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 rounded-2xl bg-neutral-50 p-4">
                <p className="text-xs font-semibold text-neutral-900">Pronto para backend</p>
                <p className="mt-1 text-xs text-neutral-600">
                  Quando conectar a Stripe e o servidor, esta página vai listar pedidos reais e rastreio real.
                </p>
              </div>
            </section>
          </RequireAuth>
        </div>
      </main>

      <FooterMega variant="home" />
    </Shell>
  );
}

function StatCard({
  icon: Icon,
  title,
  value,
  desc,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  desc: string;
}) {
  return (
    <div className="rounded-[22px] border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold tracking-wide text-neutral-500">{title}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900">
            {value}
          </p>
        </div>
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-neutral-900 text-white">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
      <p className="mt-3 text-xs text-neutral-600">{desc}</p>
    </div>
  );
}
