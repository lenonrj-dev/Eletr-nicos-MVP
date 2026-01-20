"use client";

import { useMemo, useState } from "react";

function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

type Props = {
  shipping: "standard" | "express";
  onChangeShipping: (value: "standard" | "express") => void;
};

export default function CheckoutForm({ shipping, onChangeShipping }: Props) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("Brasil");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [notes, setNotes] = useState("");

  const [billingSame, setBillingSame] = useState(true);
  const [billingName, setBillingName] = useState("");
  const [billingZip, setBillingZip] = useState("");
  const [billingAddress, setBillingAddress] = useState("");

  const contactValid = useMemo(() => {
    const e = email.trim();
    return e.includes("@") && e.length >= 6;
  }, [email]);

  const shippingValid = useMemo(() => {
    return (
      firstName.trim().length >= 2 &&
      lastName.trim().length >= 2 &&
      phone.trim().length >= 8 &&
      state.trim().length >= 2 &&
      city.trim().length >= 2 &&
      zip.trim().length >= 5 &&
      address.trim().length >= 5 &&
      number.trim().length >= 1
    );
  }, [
    firstName,
    lastName,
    phone,
    state,
    city,
    zip,
    address,
    number,
  ]);

  const billingValid = useMemo(() => {
    if (billingSame) return true;
    return (
      billingName.trim().length >= 3 &&
      billingZip.trim().length >= 5 &&
      billingAddress.trim().length >= 5
    );
  }, [billingSame, billingName, billingZip, billingAddress]);

  const formOk = contactValid && shippingValid && billingValid;

  return (
    <div className="rounded-[26px] border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-neutral-900">Dados de entrega</p>
          <p className="mt-1 text-sm text-neutral-600">
            Preencha seus dados para calcular envio e finalizar o pagamento.
          </p>
        </div>

        <div
          className={cn(
            "rounded-full border px-3 py-1 text-[11px] font-semibold",
            formOk
              ? "border-neutral-900 bg-neutral-900 text-white"
              : "border-neutral-200 bg-neutral-50 text-neutral-700"
          )}
        >
          {formOk ? "Tudo certo" : "Revisar"}
        </div>
      </div>

      {/* Contact */}
      <div className="mt-6">
        <p className="text-xs font-semibold text-neutral-700">Contato</p>

        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-neutral-700" htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="voce@exemplo.com"
              className={cn(
                "mt-2 h-11 w-full rounded-2xl border bg-white px-4 text-sm text-neutral-900 outline-none placeholder:text-neutral-400",
                contactValid || email.length === 0
                  ? "border-neutral-200 focus:border-neutral-900"
                  : "border-red-300 focus:border-red-400"
              )}
              inputMode="email"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-neutral-700" htmlFor="firstName">
              Nome
            </label>
            <input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Seu nome"
              className="mt-2 h-11 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-neutral-900"
              autoComplete="given-name"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-neutral-700" htmlFor="lastName">
              Sobrenome
            </label>
            <input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Seu sobrenome"
              className="mt-2 h-11 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-neutral-900"
              autoComplete="family-name"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-neutral-700" htmlFor="phone">
              Telefone
            </label>
            <input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(00) 00000-0000"
              className="mt-2 h-11 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-neutral-900"
              inputMode="tel"
              autoComplete="tel"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-neutral-700" htmlFor="country">
              País
            </label>
            <input
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Brasil"
              className="mt-2 h-11 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-neutral-900"
              autoComplete="country-name"
            />
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="mt-7">
        <p className="text-xs font-semibold text-neutral-700">Endereço</p>

        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold text-neutral-700" htmlFor="state">
              Estado
            </label>
            <input
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="RJ"
              className="mt-2 h-11 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-neutral-900"
              autoComplete="address-level1"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-neutral-700" htmlFor="city">
              Cidade
            </label>
            <input
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Volta Redonda"
              className="mt-2 h-11 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-neutral-900"
              autoComplete="address-level2"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-neutral-700" htmlFor="zip">
              CEP
            </label>
            <input
              id="zip"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              placeholder="00000-000"
              className="mt-2 h-11 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-neutral-900"
              inputMode="numeric"
              autoComplete="postal-code"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-neutral-700" htmlFor="address">
              Rua
            </label>
            <input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Rua Exemplo"
              className="mt-2 h-11 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-neutral-900"
              autoComplete="street-address"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-neutral-700" htmlFor="number">
              Número
            </label>
            <input
              id="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="123"
              className="mt-2 h-11 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-neutral-900"
              inputMode="numeric"
              autoComplete="address-line2"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-neutral-700" htmlFor="complement">
              Complemento
            </label>
            <input
              id="complement"
              value={complement}
              onChange={(e) => setComplement(e.target.value)}
              placeholder="Apto, bloco, referência"
              className="mt-2 h-11 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-neutral-900"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-neutral-700" htmlFor="notes">
              Observações
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: deixar na portaria"
              className="mt-2 min-h-[96px] w-full resize-none rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-neutral-900"
            />
          </div>
        </div>
      </div>

      {/* Shipping method */}
      <div className="mt-7">
        <p className="text-xs font-semibold text-neutral-700">Frete</p>

        <div className="mt-3 grid gap-3">
          <button
            type="button"
            onClick={() => onChangeShipping("standard")}
            className={cn(
              "flex items-center justify-between rounded-2xl border px-4 py-4 text-left text-sm transition",
              shipping === "standard"
                ? "border-neutral-900 bg-neutral-900 text-white"
                : "border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50"
            )}
            aria-pressed={shipping === "standard"}
          >
            <div>
              <p className="text-sm font-semibold">Standard</p>
              <p className={cn("mt-1 text-xs", shipping === "standard" ? "text-white/80" : "text-neutral-500")}>
                3–5 dias úteis
              </p>
            </div>
            <span className="text-sm font-semibold">$ 9.90</span>
          </button>

          <button
            type="button"
            onClick={() => onChangeShipping("express")}
            className={cn(
              "flex items-center justify-between rounded-2xl border px-4 py-4 text-left text-sm transition",
              shipping === "express"
                ? "border-neutral-900 bg-neutral-900 text-white"
                : "border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50"
            )}
            aria-pressed={shipping === "express"}
          >
            <div>
              <p className="text-sm font-semibold">Express</p>
              <p className={cn("mt-1 text-xs", shipping === "express" ? "text-white/80" : "text-neutral-500")}>
                1–2 dias úteis
              </p>
            </div>
            <span className="text-sm font-semibold">$ 19.90</span>
          </button>

          <div className="rounded-2xl bg-neutral-50 p-4">
            <p className="text-xs font-semibold text-neutral-900">Dica</p>
            <p className="mt-1 text-xs text-neutral-600">
              No backend você poderá calcular frete real (Correios / Melhor Envio).
            </p>
          </div>
        </div>
      </div>

      {/* Billing */}
      <div className="mt-7">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-neutral-700">Cobrança</p>
            <p className="mt-1 text-xs text-neutral-500">
              Defina se o endereço de cobrança é o mesmo da entrega.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setBillingSame((v) => !v)}
            className={cn(
              "rounded-full border px-4 py-2 text-xs font-semibold transition",
              billingSame
                ? "border-neutral-900 bg-neutral-900 text-white"
                : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
            )}
            aria-pressed={billingSame}
          >
            {billingSame ? "Mesmo endereço" : "Endereço diferente"}
          </button>
        </div>

        {!billingSame ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-neutral-700" htmlFor="billingName">
                Nome completo
              </label>
              <input
                id="billingName"
                value={billingName}
                onChange={(e) => setBillingName(e.target.value)}
                placeholder="Nome para cobrança"
                className="mt-2 h-11 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-neutral-900"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-700" htmlFor="billingZip">
                CEP
              </label>
              <input
                id="billingZip"
                value={billingZip}
                onChange={(e) => setBillingZip(e.target.value)}
                placeholder="00000-000"
                className="mt-2 h-11 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-neutral-900"
                inputMode="numeric"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-700" htmlFor="billingAddress">
                Endereço
              </label>
              <input
                id="billingAddress"
                value={billingAddress}
                onChange={(e) => setBillingAddress(e.target.value)}
                placeholder="Rua e número"
                className="mt-2 h-11 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-neutral-900"
              />
            </div>
          </div>
        ) : null}
      </div>

      {!formOk ? (
        <div className="mt-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
          <p className="text-xs font-semibold text-neutral-900">Atenção</p>
          <p className="mt-1 text-xs text-neutral-600">
            Preencha os campos obrigatórios para liberar o pagamento.
          </p>
        </div>
      ) : null}
    </div>
  );
}
