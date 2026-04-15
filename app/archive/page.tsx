import Link from "next/link";
import { getAllRadars } from "@/lib/radars";

function formatIsoDate(value: string) {
  const d = new Date(`${value}T00:00:00`);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function ArchivePage() {
  const weeks = await getAllRadars();

  return (
    <main className="min-h-screen bg-white px-6 py-10 text-[#333333] md:px-12">
      <div className="pb-2">
        <Link
          href="/"
          className="[font-family:Arial,Helvetica,sans-serif] text-[11px] uppercase text-[#888888] no-underline"
        >
          THE NEEDLE WEEKLY
        </Link>
      </div>
      <section className="border-b border-[#e0e0e0] pb-6">
        <h1 className="text-4xl font-bold text-[#1a1a1a] [font-family:Georgia,Times,'Times_New_Roman',serif]">
          Archive
        </h1>
        <p className="mt-4 text-lg [font-family:Georgia,Times,'Times_New_Roman',serif]">
          All past weekly selections.
        </p>
      </section>

      <section className="mt-10 [font-family:Georgia,Times,'Times_New_Roman',serif]">
        {weeks.length === 0 ? (
          <p className="text-lg">No archived radars found.</p>
        ) : (
          <ul className="divide-y divide-[#e0e0e0]">
            {weeks.map((week) => (
              <li key={week} className="py-5">
                <Link className="text-2xl font-bold text-[#1a1a1a] underline underline-offset-4" href={`/archive/${week}`}>
                  {formatIsoDate(week)}
                </Link>
                <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-[#888888] [font-family:Arial,Helvetica,sans-serif]">
                  Weekly radar issue
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
