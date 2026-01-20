import type { Metadata } from "next";
import { Suspense } from "react";

import LoginPage from "../../Components/auth/LoginPage";

export const metadata: Metadata = {
  title: "Login",
  description: "Acesse sua conta Ateliux.",
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="w-full px-6 py-12">
          <div className="mx-auto max-w-md rounded-[26px] border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="h-6 w-40 rounded-full bg-neutral-100" />
            <div className="mt-4 h-10 w-full rounded-2xl bg-neutral-100" />
            <div className="mt-3 h-10 w-full rounded-2xl bg-neutral-100" />
            <div className="mt-6 h-11 w-full rounded-full bg-neutral-100" />
          </div>
        </div>
      }
    >
      <LoginPage />
    </Suspense>
  );
}
