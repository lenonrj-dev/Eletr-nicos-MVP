import type { Metadata } from "next";

import AuthPage from "../../Components/auth/AuthPage";

export const metadata: Metadata = {
  title: "Entrar • Ateliux",
  description: "Acesse sua conta Ateliux ou crie um novo cadastro.",
};

export default function Page() {
  return <AuthPage />;
}
