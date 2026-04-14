import Link from "next/link";
import { getAllRadars } from "@/lib/radars";

export default async function ArchivePage() {
  const weeks = await getAllRadars();

  return (
    <main className="min-h-screen bg-white px-6 py-10 text-[#333333] md:px-12">
      <header className="border-b border-[#e0e0e0] pb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-[#888888] [font-family:Arial,Helvetica,sans-serif]">
          The Needle Radar
        </p>
        <h1 className="mt-3 text-4xl font-bold text-[#1a1a1a]">Archive</h1>
        <p className="mt-4 text-lg [font-family:Georgia,Times,'Times_New_Roman',serif]">
          All past weekly selections.
        </p>
      </header>

      <section className="mt-10 [font-family:Georgia,Times,'Times_New_Roman',serif]">
        {weeks.length === 0 ? (
          <p className="text-lg">No archived radars found.</p>
        ) : (
          <ul className="divide-y divide-[#e0e0e0]">
            {weeks.map((week) => (
              <li key={week} className="py-5">
                <Link className="text-2xl font-bold text-[#1a1a1a] underline underline-offset-4" href={`/archive/${week}`}>
                  {week}
                </Link>
                <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-[#888888] [font-family:Arial,Helvetica,sans-serif]">
                  Weekly radar issue
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <footer className="mt-10 border-t border-[#e0e0e0] pt-6">
        <Link className="text-xs uppercase tracking-[0.12em] text-[#888888] [font-family:Arial,Helvetica,sans-serif]" href="/">
          Back to latest radar
        </Link>
      </footer>
    </main>
  );
}
