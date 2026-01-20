import { NextResponse } from "next/server";

type CheckoutLine = {
  slug?: string;
  qty?: number;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { lines?: CheckoutLine[] } | null;
    const lines = body?.lines;

    const isValid =
      Array.isArray(lines) &&
      lines.length > 0 &&
      lines.every(
        (line) => typeof line?.slug === "string" && typeof line?.qty === "number"
      );

    if (!isValid) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    return NextResponse.json({ url: "/checkout/success" }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}