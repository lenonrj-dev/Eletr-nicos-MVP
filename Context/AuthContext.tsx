"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type AuthUser = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
};

type RegisterPayload = {
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
};

type LoginPayload = {
  username: string;
  password: string;
};

type StoredUser = AuthUser & {
  passwordHashLike: string;
};

type AuthContextValue = {
  hydrated: boolean;
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<{ ok: true } | { ok: false; message: string }>;
  register: (payload: RegisterPayload) => Promise<{ ok: true } | { ok: false; message: string }>;
  logout: () => void;
};

const STORAGE_KEYS = {
  session: "ateliux_auth_session_v1",
  users: "ateliux_auth_users_v1",
};

const AuthContext = createContext<AuthContextValue>({
  hydrated: false,
  user: null,
  isAuthenticated: false,
  login: async () => ({ ok: false, message: "Provider não inicializado." }),
  register: async () => ({ ok: false, message: "Provider não inicializado." }),
  logout: () => {},
});

function safeJsonParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function toHashLike(password: string) {
  // ⚠️ Placeholder proposital (sem backend). Mantém estrutura pronta para evoluir.
  // Futuro: trocar por hash real no servidor (bcrypt/argon2) + sessão via cookie httpOnly.
  return `hashlike_${password.trim().toLowerCase()}`;
}

function normalizeUsername(username: string) {
  return username.trim().toLowerCase();
}

function generateId() {
  return `u_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const session = safeJsonParse<AuthUser | null>(
      typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEYS.session) : null,
      null
    );

    setUser(session);
    setHydrated(true);
  }, []);

  const value = useMemo<AuthContextValue>(() => {
    const isAuthenticated = Boolean(user);

    const login: AuthContextValue["login"] = async ({ username, password }) => {
      const uname = normalizeUsername(username);
      const pwd = password.trim();

      if (!uname || !pwd) {
        return { ok: false, message: "Preencha usuário e senha." };
      }

      // Futuro (backend):
      // const res = await fetch("/api/auth/login", { method: "POST", body: JSON.stringify({ username, password }) })
      // if (!res.ok) ...

      const users = safeJsonParse<StoredUser[]>(
        typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEYS.users) : null,
        []
      );

      const found = users.find((u) => normalizeUsername(u.username) === uname);
      if (!found) {
        return { ok: false, message: "Usuário não encontrado." };
      }

      if (found.passwordHashLike !== toHashLike(pwd)) {
        return { ok: false, message: "Senha incorreta." };
      }

      const sessionUser: AuthUser = {
        id: found.id,
        username: found.username,
        firstName: found.firstName,
        lastName: found.lastName,
        phone: found.phone,
      };

      localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(sessionUser));
      setUser(sessionUser);

      return { ok: true };
    };

    const register: AuthContextValue["register"] = async ({
      username,
      firstName,
      lastName,
      phone,
      password,
    }) => {
      const uname = normalizeUsername(username);
      const f = firstName.trim();
      const l = lastName.trim();
      const p = phone.trim();
      const pwd = password.trim();

      if (!uname || !f || !l || !p || !pwd) {
        return { ok: false, message: "Preencha todos os campos para criar a conta." };
      }

      if (pwd.length < 6) {
        return { ok: false, message: "A senha deve ter no mínimo 6 caracteres." };
      }

      // Futuro (backend):
      // const res = await fetch("/api/auth/register", { method: "POST", body: JSON.stringify(payload) })
      // if (!res.ok) ...

      const users = safeJsonParse<StoredUser[]>(
        typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEYS.users) : null,
        []
      );

      const exists = users.some((u) => normalizeUsername(u.username) === uname);
      if (exists) {
        return { ok: false, message: "Esse nome de usuário já está em uso." };
      }

      const newUser: StoredUser = {
        id: generateId(),
        username: uname,
        firstName: f,
        lastName: l,
        phone: p,
        passwordHashLike: toHashLike(pwd),
      };

      const nextUsers = [newUser, ...users];
      localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(nextUsers));

      const sessionUser: AuthUser = {
        id: newUser.id,
        username: newUser.username,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        phone: newUser.phone,
      };

      localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(sessionUser));
      setUser(sessionUser);

      return { ok: true };
    };

    const logout = () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem(STORAGE_KEYS.session);
      }
      setUser(null);
    };

    return {
      hydrated,
      user,
      isAuthenticated,
      login,
      register,
      logout,
    };
  }, [hydrated, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
