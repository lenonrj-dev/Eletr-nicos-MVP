import Link from "next/link";

type FooterMegaProps = {
  variant?: "shop" | "product" | "home";
};

const ATELIUX_LOGO_URL =
  "https://res.cloudinary.com/df4wjugxk/image/upload/v1768862808/Logo_Ateliux_sem_Fundo_Preto_-_Editado_chxokm.png";

export default function FooterMega({ variant = "home" }: FooterMegaProps) {
  const showPayments = variant === "product";

  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="px-6 py-10 md:px-10">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="flex items-start gap-3">
              <div className="relative grid h-10 w-10 place-items-center rounded-full bg-neutral-900/5">
                <div className="relative h-8 w-8">
                  <img
                src={ATELIUX_LOGO_URL}
                alt="Logo Ateliux"
                className="h-full w-full object-contain drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]"
                loading="eager"
                decoding="async"
              />
                </div>
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold text-neutral-900">Ateliux</p>
                <p className="mt-1 text-xs leading-relaxed text-neutral-500">
                  Produtos do dia a dia, com curadoria e experiência premium.
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2">
              <Link
                href="/"
                className="grid h-9 w-9 place-items-center rounded-full border border-neutral-200 text-neutral-700 transition hover:bg-neutral-50"
                aria-label="Facebook"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v3H7v3h3v7h3v-7h3l1-3h-4v-3c0-.6.4-1 1-1Z"
                    fill="currentColor"
                  />
                </svg>
              </Link>
              <Link
                href="/"
                className="grid h-9 w-9 place-items-center rounded-full border border-neutral-200 text-neutral-700 transition hover:bg-neutral-50"
                aria-label="Instagram"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm-5 4.5A5.5 5.5 0 1 1 6.5 14 5.5 5.5 0 0 1 12 8.5Zm0 2A3.5 3.5 0 1 0 15.5 14 3.5 3.5 0 0 0 12 10.5ZM18 7.25a1 1 0 1 1-1-1 1 1 0 0 1 1 1Z"
                    fill="currentColor"
                  />
                </svg>
              </Link>
              <Link
                href="/"
                className="grid h-9 w-9 place-items-center rounded-full border border-neutral-200 text-neutral-700 transition hover:bg-neutral-50"
                aria-label="LinkedIn"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M6 6.5A1.5 1.5 0 1 1 4.5 5 1.5 1.5 0 0 1 6 6.5ZM5 8.5h2V20H5V8.5Zm6 0h2v1.5c.4-.9 1.6-1.8 3.2-1.8 3 0 3.8 1.9 3.8 4.7V20h-2v-6c0-1.6-.3-3-2.1-3-1.8 0-2.4 1.3-2.4 2.9V20h-2V8.5Z"
                    fill="currentColor"
                  />
                </svg>
              </Link>
            </div>
          </div>

          <div className="md:col-span-8">
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
              <div>
                <p className="text-xs font-semibold tracking-wide text-neutral-500">COMPANY</p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <Link href="/" className="text-neutral-700 hover:text-neutral-900">
                      Sobre
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="text-neutral-700 hover:text-neutral-900">
                      Recursos
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="text-neutral-700 hover:text-neutral-900">
                      Carreiras
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-xs font-semibold tracking-wide text-neutral-500">HELP</p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <Link href="/" className="text-neutral-700 hover:text-neutral-900">
                      Suporte
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="text-neutral-700 hover:text-neutral-900">
                      Entregas
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="text-neutral-700 hover:text-neutral-900">
                      Trocas e devoluções
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-xs font-semibold tracking-wide text-neutral-500">FAQ</p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <Link href="/" className="text-neutral-700 hover:text-neutral-900">
                      Conta
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="text-neutral-700 hover:text-neutral-900">
                      Pedidos
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="text-neutral-700 hover:text-neutral-900">
                      Pagamentos
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-xs font-semibold tracking-wide text-neutral-500">RESOURCES</p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <Link href="/" className="text-neutral-700 hover:text-neutral-900">
                      Conteúdos
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="text-neutral-700 hover:text-neutral-900">
                      Tutoriais
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="text-neutral-700 hover:text-neutral-900">
                      YouTube
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {showPayments ? (
              <div className="mt-10 flex items-center justify-end gap-3 text-neutral-400">
                <span className="text-xs">Visa</span>
                <span className="text-xs">Mastercard</span>
                <span className="text-xs">PayPal</span>
                <span className="text-xs">Apple Pay</span>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-10 border-t border-neutral-200 pt-6 text-xs text-neutral-500">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Ateliux. Todos os direitos reservados.</p>
            <p className="text-neutral-400">Design UI demo • Next + Tailwind</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
