"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Lock,
  Phone,
  ShieldCheck,
  UserRound,
  UserSquare2,
} from "lucide-react";

import Shell from "../layout/shell";
import { useAuth } from "../../Context/AuthContext";

function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

type Tab = "login" | "register";

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initial = (searchParams.get("tab") as Tab | null) ?? "login";

  const { hydrated, isAuthenticated } = useAuth();
  const [tab, setTab] = useState<Tab>(initial === "register" ? "register" : "login");

  useEffect(() => {
    if (hydrated && isAuthenticated) {
      router.replace("/minha-conta");
    }
  }, [hydrated, isAuthenticated, router]);

  const hero = useMemo(
    () => ({
      title: "Entre na sua conta",
      subtitle:
        "Acompanhe seus pedidos, salve favoritos e finalize compras com mais rapidez.",
      bullets: [
        {
          icon: ShieldCheck,
          title: "Checkout mais rápido",
          desc: "Dados do cliente e histórico prontos para a próxima compra.",
        },
        {
          icon: CheckCircle2,
          title: "Rastreamento e status",
          desc: "Veja a evolução dos seus pedidos em um só lugar.",
        },
        {
          icon: Lock,
          title: "Conta protegida",
          desc: "Estrutura preparada para autenticação real no backend.",
        },
      ],
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
    }),
    []
  );

  return (
    <Shell>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-6 focus:z-50 focus:rounded-full focus:bg-neutral-900 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Pular para o conteúdo
      </a>

      <main id="conteudo" className="bg-neutral-50">
        <div className="px-6 py-10 md:px-10">
          <section className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-[26px] border border-neutral-200 bg-white">
                <div className="absolute inset-0">
                  <img
                    src={hero.image}
                    alt="Ateliux Store"
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/35 to-transparent" />
                </div>

                <div className="relative p-7 md:p-10">
                  <p className="text-xs font-semibold tracking-wide text-white/70">
                    ATELIUX • CONTA DO CLIENTE
                  </p>
                  <h1 className="mt-3 max-w-[18ch] text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-5xl">
                    {hero.title}
                  </h1>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80">
                    {hero.subtitle}
                  </p>

                  <div className="mt-8 space-y-3">
                    {hero.bullets.map((b) => (
                      <div
                        key={b.title}
                        className="flex items-start gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur"
                      >
                        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/15 text-white">
                          <b.icon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-white">{b.title}</p>
                          <p className="mt-1 text-xs text-white/75">{b.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Link
                      href="/inicio"
                      className="inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-100 active:scale-[0.98]"
                    >
                      Voltar para a loja
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-[26px] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">
                      {tab === "login" ? "Entrar" : "Criar conta"}
                    </p>
                    <p className="mt-1 text-xs text-neutral-500">
                      {tab === "login"
                        ? "Acesse com seu nome de usuário e senha."
                        : "Cadastre-se para acompanhar pedidos e finalizar compras."}
                    </p>
                  </div>

                  <div className="flex rounded-full border border-neutral-200 bg-neutral-50 p-1">
                    <button
                      type="button"
                      onClick={() => setTab("login")}
                      className={cn(
                        "inline-flex h-9 items-center justify-center rounded-full px-4 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900",
                        tab === "login"
                          ? "bg-neutral-900 text-white"
                          : "text-neutral-700 hover:bg-white"
                      )}
                      aria-pressed={tab === "login"}
                    >
                      Entrar
                    </button>
                    <button
                      type="button"
                      onClick={() => setTab("register")}
                      className={cn(
                        "inline-flex h-9 items-center justify-center rounded-full px-4 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900",
                        tab === "register"
                          ? "bg-neutral-900 text-white"
                          : "text-neutral-700 hover:bg-white"
                      )}
                      aria-pressed={tab === "register"}
                    >
                      Criar conta
                    </button>
                  </div>
                </div>

                <div className="mt-6">
                  {tab === "login" ? <LoginForm /> : <RegisterForm onDone={() => setTab("login")} />}
                </div>

                <div className="mt-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-neutral-900 text-white">
                      <UserRound className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-neutral-900">
                        Área do cliente
                      </p>
                      <p className="mt-1 text-xs text-neutral-600">
                        Aqui você verá seus pedidos, dados básicos e status de entrega.
                      </p>
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-xs text-neutral-500">
                  Ao continuar, você concorda com os termos e políticas da loja.
                </p>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[22px] border border-neutral-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="grid h-9 w-9 place-items-center rounded-2xl bg-neutral-900 text-white">
                      <UserSquare2 className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <p className="text-xs font-semibold text-neutral-900">Cadastro rápido</p>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                    Nome, usuário, senha e telefone por enquanto — pronto para integrar backend depois.
                  </p>
                </div>

                <div className="rounded-[22px] border border-neutral-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="grid h-9 w-9 place-items-center rounded-2xl bg-neutral-900 text-white">
                      <Phone className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <p className="text-xs font-semibold text-neutral-900">Suporte</p>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                    Em breve: suporte via WhatsApp e atualizações automáticas de entrega.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

    </Shell>
  );
}

function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = username.trim().length > 0 && password.trim().length > 0;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!canSubmit || submitting) return;

    setSubmitting(true);
    const res = await login({ username, password });
    setSubmitting(false);

    if (!res.ok) {
      setError(res.message);
      return;
    }

    router.push("/minha-conta");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="text-xs font-semibold text-neutral-700" htmlFor="login-username">
          Nome de usuário
        </label>
        <div className="mt-2 flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-3 py-2 focus-within:border-neutral-900">
          <UserRound className="h-4 w-4 text-neutral-500" aria-hidden="true" />
          <input
            id="login-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="ex: lenon"
            className="h-9 w-full bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
            autoComplete="username"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-neutral-700" htmlFor="login-password">
          Senha
        </label>
        <div className="mt-2 flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-3 py-2 focus-within:border-neutral-900">
          <Lock className="h-4 w-4 text-neutral-500" aria-hidden="true" />
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha"
            className="h-9 w-full bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
            autoComplete="current-password"
          />
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
          {error}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={!canSubmit || submitting}
        className={cn(
          "inline-flex h-11 w-full items-center justify-center rounded-full px-6 text-sm font-semibold transition active:scale-[0.98]",
          !canSubmit || submitting
            ? "bg-neutral-200 text-neutral-500"
            : "bg-neutral-900 text-white hover:bg-neutral-800"
        )}
        aria-label="Entrar na conta"
      >
        {submitting ? "Entrando..." : "Entrar"}
      </button>

      <p className="text-center text-xs text-neutral-500">
        Ainda não tem conta?{" "}
        <button
          type="button"
          onClick={() => router.push("/login?tab=register")}
          className="font-semibold text-neutral-900 hover:underline"
        >
          Criar agora
        </button>
      </p>
    </form>
  );
}

function RegisterForm({ onDone }: { onDone: () => void }) {
  const router = useRouter();
  const { register } = useAuth();

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit =
    username.trim().length > 0 &&
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    phone.trim().length > 0 &&
    password.trim().length >= 6;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!canSubmit || submitting) return;

    setSubmitting(true);
    const res = await register({ username, firstName, lastName, phone, password });
    setSubmitting(false);

    if (!res.ok) {
      setError(res.message);
      return;
    }

    onDone();
    router.push("/minha-conta");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Nome"
          icon={UserRound}
          id="reg-first"
          value={firstName}
          onChange={setFirstName}
          placeholder="Seu nome"
          autoComplete="given-name"
        />
        <Field
          label="Sobrenome"
          icon={UserRound}
          id="reg-last"
          value={lastName}
          onChange={setLastName}
          placeholder="Seu sobrenome"
          autoComplete="family-name"
        />
      </div>

      <Field
        label="Nome de usuário"
        icon={UserSquare2}
        id="reg-username"
        value={username}
        onChange={setUsername}
        placeholder="ex: lenon"
        autoComplete="username"
      />

      <Field
        label="Telefone"
        icon={Phone}
        id="reg-phone"
        value={phone}
        onChange={setPhone}
        placeholder="(00) 00000-0000"
        autoComplete="tel"
      />

      <Field
        label="Senha (mín. 6 caracteres)"
        icon={Lock}
        id="reg-password"
        value={password}
        onChange={setPassword}
        placeholder="Crie uma senha"
        type="password"
        autoComplete="new-password"
      />

      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
          {error}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={!canSubmit || submitting}
        className={cn(
          "inline-flex h-11 w-full items-center justify-center rounded-full px-6 text-sm font-semibold transition active:scale-[0.98]",
          !canSubmit || submitting
            ? "bg-neutral-200 text-neutral-500"
            : "bg-neutral-900 text-white hover:bg-neutral-800"
        )}
        aria-label="Criar conta"
      >
        {submitting ? "Criando conta..." : "Criar conta"}
      </button>

      <p className="text-center text-xs text-neutral-500">
        Já tem conta?{" "}
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="font-semibold text-neutral-900 hover:underline"
        >
          Entrar
        </button>
      </p>
    </form>
  );
}

function Field({
  label,
  icon: Icon,
  id,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
}: {
  label: string;
  icon: React.ElementType;
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-neutral-700" htmlFor={id}>
        {label}
      </label>
      <div className="mt-2 flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-3 py-2 focus-within:border-neutral-900">
        <Icon className="h-4 w-4 text-neutral-500" aria-hidden="true" />
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-9 w-full bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
          autoComplete={autoComplete}
        />
      </div>
    </div>
  );
}
