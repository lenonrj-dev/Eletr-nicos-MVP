"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  KeyRound,
  LogIn,
  Phone,
  User,
  UserPlus,
  ShieldCheck,
} from "lucide-react";

type Mode = "login" | "register";

type RegisterForm = {
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  password: string;
};

type LoginForm = {
  username: string;
  password: string;
};

function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

function safeTrim(v: string) {
  return v.trim();
}

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [loading, setLoading] = useState(false);

  const [register, setRegister] = useState<RegisterForm>({
    firstName: "",
    lastName: "",
    username: "",
    phone: "",
    password: "",
  });

  const [login, setLogin] = useState<LoginForm>({
    username: "",
    password: "",
  });

  const canRegister = useMemo(() => {
    return (
      safeTrim(register.firstName).length >= 2 &&
      safeTrim(register.lastName).length >= 2 &&
      safeTrim(register.username).length >= 3 &&
      safeTrim(register.phone).length >= 8 &&
      safeTrim(register.password).length >= 6
    );
  }, [register]);

  const canLogin = useMemo(() => {
    return safeTrim(login.username).length >= 3 && safeTrim(login.password).length >= 6;
  }, [login]);

  function persistUser(payload: RegisterForm) {
    const user = {
      id: "demo-user",
      firstName: payload.firstName,
      lastName: payload.lastName,
      username: payload.username.toLowerCase(),
      phone: payload.phone,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("ateliux_user_demo", JSON.stringify(user));
    localStorage.setItem(
      "ateliux_session_demo",
      JSON.stringify({
        loggedIn: true,
        username: user.username,
        updatedAt: new Date().toISOString(),
      })
    );
  }

  function readUser() {
    try {
      const raw = localStorage.getItem("ateliux_user_demo");
      if (!raw) return null;
      return JSON.parse(raw) as {
        username: string;
        firstName: string;
        lastName: string;
        phone: string;
      };
    } catch {
      return null;
    }
  }

  function setSession(loggedIn: boolean, username?: string) {
    localStorage.setItem(
      "ateliux_session_demo",
      JSON.stringify({
        loggedIn,
        username: username ?? null,
        updatedAt: new Date().toISOString(),
      })
    );
  }

  async function onSubmitRegister(e: React.FormEvent) {
    e.preventDefault();
    if (!canRegister) return;

    setLoading(true);
    try {
      // PREPARADO PARA BACKEND:
      // - aqui no futuro você chama /api/auth/register
      // - recebe token/sessão e salva de forma segura
      persistUser({
        firstName: safeTrim(register.firstName),
        lastName: safeTrim(register.lastName),
        username: safeTrim(register.username),
        phone: safeTrim(register.phone),
        password: safeTrim(register.password),
      });

      router.push("/inicio");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  async function onSubmitLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!canLogin) return;

    setLoading(true);
    try {
      // PREPARADO PARA BACKEND:
      // - aqui no futuro você chama /api/auth/login
      // - recebe token/sessão e salva de forma segura
      const user = readUser();
      const inputUser = safeTrim(login.username).toLowerCase();

      if (!user || user.username !== inputUser) {
        alert("Usuário não encontrado. Crie uma conta primeiro.");
        setMode("register");
        return;
      }

      setSession(true, inputUser);

      router.push("/inicio");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full bg-neutral-50">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-6 focus:z-50 focus:rounded-full focus:bg-neutral-900 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Pular para o conteúdo
      </a>

      <main id="conteudo" className="w-full px-4 py-10 sm:px-6 lg:px-10 2xl:px-16">
        <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-12">
          {/* Left: Info */}
          <section className="lg:col-span-5">
            <div className="rounded-[26px] border border-neutral-200 bg-white p-6 shadow-sm">
              <p className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-3 py-1 text-[11px] font-semibold text-white">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                Área do Cliente
              </p>

              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900">
                {mode === "login" ? "Entrar na sua conta" : "Criar sua conta"}
              </h1>

              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                Faça login para acompanhar pedidos, salvar itens e concluir compras com mais rapidez.
                <span className="block mt-2 text-xs text-neutral-500">
                  (Demo sem backend: dados são salvos localmente para simulação.)
                </span>
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className={cn(
                    "inline-flex h-11 items-center justify-center gap-2 rounded-full border px-4 text-sm font-semibold transition",
                    mode === "login"
                      ? "border-neutral-900 bg-neutral-900 text-white"
                      : "border-neutral-200 bg-white text-neutral-800 hover:bg-neutral-50"
                  )}
                >
                  <LogIn className="h-4 w-4" aria-hidden="true" />
                  Login
                </button>

                <button
                  type="button"
                  onClick={() => setMode("register")}
                  className={cn(
                    "inline-flex h-11 items-center justify-center gap-2 rounded-full border px-4 text-sm font-semibold transition",
                    mode === "register"
                      ? "border-neutral-900 bg-neutral-900 text-white"
                      : "border-neutral-200 bg-white text-neutral-800 hover:bg-neutral-50"
                  )}
                >
                  <UserPlus className="h-4 w-4" aria-hidden="true" />
                  Criar conta
                </button>
              </div>

              <div className="mt-6 rounded-2xl bg-neutral-50 p-4">
                <p className="text-xs font-semibold text-neutral-900">Pronto para integrar no backend</p>
                <p className="mt-1 text-xs text-neutral-600">
                  Esta tela já está estruturada para conectar com autenticação real (JWT/session/Stripe checkout).
                </p>
              </div>

              <div className="mt-6 text-xs text-neutral-500">
                <Link href="/inicio" className="hover:text-neutral-900 underline underline-offset-4">
                  Voltar para a loja
                </Link>
              </div>
            </div>
          </section>

          {/* Right: Form */}
          <section className="lg:col-span-7">
            <div className="rounded-[26px] border border-neutral-200 bg-white p-6 shadow-sm">
              {mode === "login" ? (
                <form onSubmit={onSubmitLogin} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-neutral-700" htmlFor="login-username">
                      Nome de usuário
                    </label>
                    <div className="mt-2 flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-3 focus-within:border-neutral-900">
                      <User className="h-4 w-4 text-neutral-500" aria-hidden="true" />
                      <input
                        id="login-username"
                        value={login.username}
                        onChange={(e) => setLogin((s) => ({ ...s, username: e.target.value }))}
                        className="w-full bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
                        placeholder="ex: lenonrj"
                        autoComplete="username"
                        required
                        minLength={3}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-700" htmlFor="login-password">
                      Senha
                    </label>
                    <div className="mt-2 flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-3 focus-within:border-neutral-900">
                      <KeyRound className="h-4 w-4 text-neutral-500" aria-hidden="true" />
                      <input
                        id="login-password"
                        type="password"
                        value={login.password}
                        onChange={(e) => setLogin((s) => ({ ...s, password: e.target.value }))}
                        className="w-full bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
                        placeholder="••••••••"
                        autoComplete="current-password"
                        required
                        minLength={6}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!canLogin || loading}
                    className={cn(
                      "mt-2 inline-flex h-11 w-full items-center justify-center rounded-full px-6 text-sm font-semibold transition",
                      !canLogin || loading
                        ? "bg-neutral-200 text-neutral-500 cursor-not-allowed"
                        : "bg-neutral-900 text-white hover:bg-neutral-800 active:scale-[0.98]"
                    )}
                  >
                    {loading ? "Entrando..." : "Entrar"}
                  </button>

                  <p className="text-xs text-neutral-500">
                    Não tem conta?{" "}
                    <button
                      type="button"
                      onClick={() => setMode("register")}
                      className="font-semibold text-neutral-900 underline underline-offset-4"
                    >
                      Criar conta agora
                    </button>
                  </p>
                </form>
              ) : (
                <form onSubmit={onSubmitRegister} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-semibold text-neutral-700" htmlFor="reg-firstname">
                        Nome
                      </label>
                      <div className="mt-2 flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-3 focus-within:border-neutral-900">
                        <User className="h-4 w-4 text-neutral-500" aria-hidden="true" />
                        <input
                          id="reg-firstname"
                          value={register.firstName}
                          onChange={(e) => setRegister((s) => ({ ...s, firstName: e.target.value }))}
                          className="w-full bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
                          placeholder="Lenon"
                          autoComplete="given-name"
                          required
                          minLength={2}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-neutral-700" htmlFor="reg-lastname">
                        Sobrenome
                      </label>
                      <div className="mt-2 flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-3 focus-within:border-neutral-900">
                        <User className="h-4 w-4 text-neutral-500" aria-hidden="true" />
                        <input
                          id="reg-lastname"
                          value={register.lastName}
                          onChange={(e) => setRegister((s) => ({ ...s, lastName: e.target.value }))}
                          className="w-full bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
                          placeholder="Alexandre"
                          autoComplete="family-name"
                          required
                          minLength={2}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-700" htmlFor="reg-username">
                      Nome de usuário
                    </label>
                    <div className="mt-2 flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-3 focus-within:border-neutral-900">
                      <User className="h-4 w-4 text-neutral-500" aria-hidden="true" />
                      <input
                        id="reg-username"
                        value={register.username}
                        onChange={(e) => setRegister((s) => ({ ...s, username: e.target.value }))}
                        className="w-full bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
                        placeholder="ex: lenonrj"
                        autoComplete="username"
                        required
                        minLength={3}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-700" htmlFor="reg-phone">
                      Telefone
                    </label>
                    <div className="mt-2 flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-3 focus-within:border-neutral-900">
                      <Phone className="h-4 w-4 text-neutral-500" aria-hidden="true" />
                      <input
                        id="reg-phone"
                        value={register.phone}
                        onChange={(e) => setRegister((s) => ({ ...s, phone: e.target.value }))}
                        className="w-full bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
                        placeholder="(24) 9xxxx-xxxx"
                        autoComplete="tel"
                        required
                        minLength={8}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-700" htmlFor="reg-password">
                      Senha
                    </label>
                    <div className="mt-2 flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-3 focus-within:border-neutral-900">
                      <KeyRound className="h-4 w-4 text-neutral-500" aria-hidden="true" />
                      <input
                        id="reg-password"
                        type="password"
                        value={register.password}
                        onChange={(e) => setRegister((s) => ({ ...s, password: e.target.value }))}
                        className="w-full bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
                        placeholder="mínimo 6 caracteres"
                        autoComplete="new-password"
                        required
                        minLength={6}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!canRegister || loading}
                    className={cn(
                      "mt-2 inline-flex h-11 w-full items-center justify-center rounded-full px-6 text-sm font-semibold transition",
                      !canRegister || loading
                        ? "bg-neutral-200 text-neutral-500 cursor-not-allowed"
                        : "bg-neutral-900 text-white hover:bg-neutral-800 active:scale-[0.98]"
                    )}
                  >
                    {loading ? "Criando..." : "Criar conta"}
                  </button>

                  <p className="text-xs text-neutral-500">
                    Já tem conta?{" "}
                    <button
                      type="button"
                      onClick={() => setMode("login")}
                      className="font-semibold text-neutral-900 underline underline-offset-4"
                    >
                      Fazer login
                    </button>
                  </p>
                </form>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
