import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="w-full border-b-2 border-[#1a1a1a] py-6">
      <h1 className="[font-family:Georgia,Times,'Times_New_Roman',serif] text-[28px] font-black text-[#1a1a1a]">
        <Link href="/" className="text-[#1a1a1a] no-underline">
          The Needle Weekly
        </Link>
      </h1>
      <nav className="mt-3 flex items-center gap-4">
        <Link
          href="/archive"
          className="[font-family:Arial,Helvetica,sans-serif] text-[11px] uppercase tracking-[0.08em] text-[#888888] no-underline"
        >
          Archive
        </Link>
        <Link
          href="/my-needle"
          className="[font-family:Arial,Helvetica,sans-serif] text-[11px] uppercase tracking-[0.08em] text-[#888888] no-underline"
        >
          My Needle
        </Link>
      </nav>
    </header>
  );
}

