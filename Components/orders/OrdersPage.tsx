import Link from "next/link";

type OrderStatus = "Pago" | "Processando" | "Enviado";

type Order = {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: number;
};

const orders: Order[] = [
  { id: "ATL-1092", date: "12 Jan 2026", status: "Pago", total: 219.9, items: 3 },
  { id: "ATL-1091", date: "08 Jan 2026", status: "Processando", total: 89.9, items: 1 },
  { id: "ATL-1087", date: "02 Jan 2026", status: "Enviado", total: 410.5, items: 6 },
];

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function statusClass(status: OrderStatus) {
  if (status === "Pago") return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (status === "Processando") return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-blue-50 text-blue-700 border-blue-200";
}

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">
              Meus pedidos
            </h1>
            <p className="mt-2 text-sm text-neutral-600">
              Acompanhe seus pedidos e o status de cada entrega.
            </p>
          </div>

          <Link
            href="/loja"
            className="inline-flex h-11 items-center justify-center rounded-full border border-neutral-200 bg-white px-6 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
          >
            Ir para a loja
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="mt-8 rounded-[26px] border border-neutral-200 bg-white p-8 text-center shadow-sm">
            <h2 className="text-lg font-semibold text-neutral-900">
              Voce ainda nao tem pedidos
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              Quando finalizar uma compra, seus pedidos aparecerao aqui.
            </p>
            <Link
              href="/loja"
              className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-neutral-900 px-6 text-sm font-semibold text-white transition hover:bg-neutral-800 active:scale-[0.98]"
            >
              Explorar produtos
            </Link>
          </div>
        ) : (
          <section className="mt-8 grid gap-5 lg:grid-cols-2">
            {orders.map((order) => (
              <article
                key={order.id}
                className="rounded-[26px] border border-neutral-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-neutral-500">Pedido</p>
                    <p className="mt-1 text-lg font-semibold text-neutral-900">
                      {order.id}
                    </p>
                  </div>
                  <span
                    className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${statusClass(order.status)}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-xs text-neutral-500">Data</p>
                    <p className="mt-1 text-sm font-semibold text-neutral-900">
                      {order.date}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">Itens</p>
                    <p className="mt-1 text-sm font-semibold text-neutral-900">
                      {order.items}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">Total</p>
                    <p className="mt-1 text-sm font-semibold text-neutral-900">
                      {formatPrice(order.total)}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    className="inline-flex h-10 items-center justify-center rounded-full border border-neutral-200 bg-white px-4 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-50"
                  >
                    Ver detalhes
                  </button>
                  <Link
                    href="/loja"
                    className="inline-flex h-10 items-center justify-center rounded-full bg-neutral-900 px-4 text-xs font-semibold text-white transition hover:bg-neutral-800"
                  >
                    Comprar novamente
                  </Link>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}