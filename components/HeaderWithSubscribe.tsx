"use client";

import { FormEvent, useState } from "react";

type HeaderWithSubscribeProps = {
  title: string;
  description: string;
};

export default function HeaderWithSubscribe({ title, description }: HeaderWithSubscribeProps) {
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
    <header className="border-b-2 border-[#1a1a1a] pb-5">
      <h1 className="text-[32px] font-black tracking-[-2px] text-[#1a1a1a] [font-family:Georgia,Times,'Times_New_Roman',serif] md:text-[48px]">
        {title}
      </h1>
      <p className="mt-3 text-[16px] leading-[1.6] text-[#444444] [font-family:Georgia,Times,'Times_New_Roman',serif]">
        {description}
      </p>

      <div className="mt-4">
        {isSuccess ? (
          <p className="text-[12px] italic text-[#888888] [font-family:Georgia,Times,'Times_New_Roman',serif]">You&apos;re in.</p>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-wrap items-center gap-2">
            <span className="text-[12px] text-[#888888] [font-family:Arial,Helvetica,sans-serif]">
              Get it in your inbox every Sunday.
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="border border-[#e0e0e0] px-[10px] py-[6px] text-[12px] text-[#1a1a1a] [font-family:Arial,Helvetica,sans-serif] focus:outline-none"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#1a1a1a] px-3 py-[6px] text-[12px] text-white [font-family:Arial,Helvetica,sans-serif] disabled:opacity-60"
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

