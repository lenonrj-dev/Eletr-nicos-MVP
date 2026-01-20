import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <main className="mx-auto flex max-w-6xl flex-col items-center px-6 py-12">
        <div className="w-full max-w-lg rounded-[30px] border border-neutral-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-neutral-900 text-white">
            <span className="text-sm font-semibold">OK</span>
          </div>

          <h1 className="mt-5 text-2xl font-semibold tracking-tight text-neutral-900">
            Checkout concluido (demo)
          </h1>

          <p className="mt-2 text-sm text-neutral-600">
            Esta pagina e o destino ideal para conectar o fluxo do Stripe quando o backend estiver pronto.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link
              href="/carrinho"
              className="inline-flex h-11 items-center justify-center rounded-full border border-neutral-200 bg-white px-6 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
            >
              Ver carrinho
            </Link>
            <Link
              href="/loja"
              className="inline-flex h-11 items-center justify-center rounded-full bg-neutral-900 px-6 text-sm font-semibold text-white transition hover:bg-neutral-800 active:scale-[0.98]"
            >
              Continuar comprando
            </Link>
          </div>

          <div className="mt-6 rounded-2xl bg-neutral-50 p-4 text-left">
            <p className="text-xs font-semibold text-neutral-900">
              Proximos passos Stripe
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-neutral-600">
              <li>Criar Checkout Session no backend</li>
              <li>Redirecionar para Stripe Hosted Checkout</li>
              <li>Confirmar pagamento via Webhook</li>
              <li>Persistir pedido no banco</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}