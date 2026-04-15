"use client";

import { FormEvent, useState } from "react";

type HeaderWithSubscribeProps = {
  description: string;
};

export default function HeaderWithSubscribe({ description }: HeaderWithSubscribeProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error ?? "Subscription failed.");
      }

      setIsSuccess(true);
      setEmail("");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to subscribe right now.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <header className="border-b-4 border-[#0a0a0a] pb-5">
      <h1 className="[font-family:Georgia,Times,'Times_New_Roman',serif] text-[72px] font-black leading-[0.95] tracking-[-3px] text-[#0a0a0a]">
        <span className="block">The Needle</span>
        <span className="block">Weekly</span>
      </h1>
      <p className="mb-[14px] mt-4 max-w-[520px] text-[15px] leading-[1.5] text-[#444444] [font-family:Georgia,Times,'Times_New_Roman',serif]">
        {description}
      </p>

      <div className="mt-2">
        {isSuccess ? (
          <p className="text-[12px] italic text-[#888888] [font-family:Georgia,Times,'Times_New_Roman',serif]">You&apos;re in.</p>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-wrap items-center gap-2">
            <span className="text-[12px] text-[#888888] [font-family:Arial,Helvetica,sans-serif]">
              Get it in your inbox.
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="border border-[#0a0a0a] px-[10px] py-[6px] text-[11px] text-[#1a1a1a] [font-family:Arial,Helvetica,sans-serif] focus:outline-none"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#0a0a0a] px-3 py-[6px] text-[11px] text-white [font-family:Arial,Helvetica,sans-serif] disabled:opacity-60"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        )}
        {error ? (
          <p className="mt-2 text-[12px] text-[#888888] [font-family:Arial,Helvetica,sans-serif]">{error}</p>
        ) : null}
      </div>
    </header>
  );
}

