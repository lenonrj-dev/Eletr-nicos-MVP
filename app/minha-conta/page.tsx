import type { Metadata } from "next";

import AccountPage from "../../Components/account/AccountPage";

export const metadata: Metadata = {
  title: "Minha Conta • Ateliux",
  description: "Dashboard do cliente com informações e atalhos.",
};

export default function Page() {
  return <AccountPage />;
}
