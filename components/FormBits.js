"use client";
import { useState } from "react";

export function Field({ label, required, hint, children, className = "" }) {
  return (
    <div className={className}>
      <label className="mb-1 flex items-center gap-1 text-xs font-medium text-slate-600">
        {label}
        {required && <span className="text-rose-500">*</span>}
        {hint && <span className="ml-1 font-normal text-slate-400">{hint}</span>}
      </label>
      {children}
    </div>
  );
}

export function Section({ id, no, title, desc, icon, children }) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="card overflow-hidden">
        <div className="flex items-start gap-3 border-b border-slate-100 bg-slate-50/60 px-6 py-4">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-teal-600 text-sm font-semibold text-white">
            {icon || no}
          </div>
          <div>
            <h2 className="text-sm font-semibold text-ink">{title}</h2>
            {desc && <p className="text-xs text-slate-500">{desc}</p>}
          </div>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </section>
  );
}

// Styled file upload — hides the default input and shows the chosen filename
export function Upload({ label, required, accept = "image/*,.pdf" }) {
  const [name, setName] = useState("");
  return (
    <div>
      <label className="mb-1 flex items-center gap-1 text-xs font-medium text-slate-600">
        {label}{required && <span className="text-rose-500">*</span>}
      </label>
      <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-3 py-2.5 text-sm transition hover:border-brand-400 hover:bg-brand-50/40">
        <span className="grid h-8 w-8 place-items-center rounded-md bg-white text-brand-600 shadow-sm">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 16V4m0 0L8 8m4-4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="min-w-0 flex-1 truncate">
          {name ? <span className="text-ink">{name}</span> : <span className="text-slate-400">Choose file (JPG / PNG / PDF)</span>}
        </span>
        {name && <span className="badge bg-emerald-50 text-emerald-600">✓</span>}
        <input type="file" accept={accept} className="hidden"
          onChange={(e) => setName(e.target.files?.[0]?.name || "")} />
      </label>
    </div>
  );
}
