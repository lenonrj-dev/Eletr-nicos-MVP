"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuth } from "../../Context/AuthContext";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { hydrated, isAuthenticated } = useAuth();

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      router.replace("/login");
    }
  }, [hydrated, isAuthenticated, router]);

  if (!hydrated) {
    return (
      <div className="rounded-[26px] border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="h-6 w-40 rounded-full bg-neutral-100" />
        <div className="mt-4 space-y-2">
          <div className="h-4 w-full rounded-full bg-neutral-100" />
          <div className="h-4 w-5/6 rounded-full bg-neutral-100" />
          <div className="h-4 w-4/6 rounded-full bg-neutral-100" />
        </div>
        <div className="mt-6 h-11 w-full rounded-full bg-neutral-100" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return <>{children}</>;
}
