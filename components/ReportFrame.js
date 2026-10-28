"use client";
import Icon from "@/components/Icon";

// Printable report wrapper: college header + title + content, with a
// Print / Save-as-PDF button and filters that are hidden in the printout.
export default function ReportFrame({ title, subtitle, filters, children }) {
  const today = new Date().toLocaleDateString("en-GB");
  return (
    <div>
      <div className="no-print mb-4 flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-wrap items-end gap-3">{filters}</div>
        <button onClick={() => window.print()} className="btn-primary">
          <Icon name="printer" /> Print / Save as PDF
        </button>
      </div>

      <div className="print-area card p-6">
        <div className="mb-4 text-center">
          <div className="text-lg font-bold text-brand-700">AYUSHI WELFARE AND EDUCATION SOCIETY, BHIND</div>
          <div className="text-xs text-slate-500">Indira Gandhi Chowk, Etawah Road, Bhind (MP)-477001 · Mob. 9926201971</div>
          <div className="mt-2 inline-block rounded border border-slate-400 px-3 py-0.5 text-sm font-semibold">{title}</div>
          <div className="mt-1 text-xs text-slate-500">{subtitle ? subtitle + " · " : ""}Generated: {today}</div>
        </div>
        <div className="overflow-x-auto">{children}</div>
      </div>
    </div>
  );
}
