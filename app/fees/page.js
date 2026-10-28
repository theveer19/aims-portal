"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";

export default function FeesSearch() {
  const [q, setQ] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const term = q.trim();
    if (!term) { setRows([]); return; }
    setLoading(true);
    const t = setTimeout(() => {
      fetch(`/api/students?q=${encodeURIComponent(term)}`)
        .then((r) => r.json())
        .then(setRows)
        .finally(() => setLoading(false));
    }, 250);
    return () => clearTimeout(t);
  }, [q]);

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-ink">Fees Master</h1>
        <p className="text-sm text-slate-500">Find a student, open the fee detail, and record an installment</p>
      </div>

      <div className="card p-5">
        <div className="relative">
          <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-slate-400"
            fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M11 4a7 7 0 105.29 12.29l3.71 3.71 1.41-1.41-3.71-3.71A7 7 0 0011 4z" />
          </svg>
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Student — naam, ID, enrollment, mobile…"
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100" />
        </div>
      </div>

      {loading && <p className="text-sm text-slate-500">Searching…</p>}

      {rows.length > 0 && (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs uppercase text-slate-400">
                <th className="px-5 py-2.5">Student</th><th>Program</th><th>Due</th><th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((s) => (
                <tr key={s.id} className="border-b border-slate-50 hover:bg-slate-50/60">
                  <td className="px-5 py-3">
                    <div className="font-medium text-ink">{s.name}</div>
                    <div className="font-mono text-xs text-slate-400">{s.id} · {s.mobile}</div>
                  </td>
                  <td className="text-slate-600">{s.program}<div className="text-xs text-slate-400">{s.session}</div></td>
                  <td>
                    {s.dueFees > 0
                      ? <span className="badge bg-rose-50 text-rose-600">₹{s.dueFees} due</span>
                      : <span className="badge bg-emerald-50 text-emerald-600">Paid</span>}
                  </td>
                  <td className="pr-5 text-right">
                    <Link href={`/fees/${s.id}`} className="btn-primary px-3 py-1.5 text-xs"><Icon name="rupee" className="h-3.5 w-3.5" /> Fees Detail</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
