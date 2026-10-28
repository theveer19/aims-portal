"use client";
import { Suspense, useEffect, useState } from "react";
import { intakeLabel, isJuly } from "@/lib/intake";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Icon from "@/components/Icon";

function Results() {
  const params = useSearchParams();
  const initial = params.get("q") || "";
  const [q, setQ] = useState(initial);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // Live search (debounced)
  useEffect(() => {
    const term = q.trim();
    if (!term) { setRows([]); setSearched(false); return; }
    setLoading(true);
    const t = setTimeout(() => {
      fetch(`/api/students?q=${encodeURIComponent(term)}`)
        .then((r) => r.json())
        .then((data) => { setRows(data); setSearched(true); })
        .finally(() => setLoading(false));
    }, 250);
    return () => clearTimeout(t);
  }, [q]);

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-ink">Search Students</h1>
        <p className="text-sm text-slate-500">Search across summer and winter admissions by any field</p>
      </div>

      <div className="card p-5">
        <div className="relative">
          <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-slate-400"
            fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M11 4a7 7 0 105.29 12.29l3.71 3.71 1.41-1.41-3.71-3.71A7 7 0 0011 4z" />
          </svg>
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Name, Student ID, Enrollment No, Form No, ya Mobile…"
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-400">
          Try: <button onClick={() => setQ("deepa")} className="rounded bg-slate-100 px-2 py-0.5 hover:bg-slate-200">deepa</button>
          <button onClick={() => setQ("7000418227")} className="rounded bg-slate-100 px-2 py-0.5 hover:bg-slate-200">7000418227</button>
          <button onClick={() => setQ("25Y")} className="rounded bg-slate-100 px-2 py-0.5 hover:bg-slate-200">25Y</button>
        </div>
      </div>

      {loading && <p className="text-sm text-slate-500">Searching…</p>}

      {searched && !loading && rows.length === 0 && (
        <div className="card p-8 text-center text-sm text-slate-500">No student found for "<b>{q}</b>".</div>
      )}

      {rows.length > 0 && (
        <div className="card overflow-hidden">
          <div className="border-b border-slate-100 px-5 py-3 text-xs text-slate-500">{rows.length} result(s)</div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs uppercase text-slate-400">
                  <th className="px-5 py-2.5">Student</th><th>ID / Enroll</th><th>Program</th>
                  <th>Session</th><th>Type</th><th>Due</th><th></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((s) => (
                  <tr key={s.id} className="border-b border-slate-50 hover:bg-slate-50/60">
                    <td className="px-5 py-3">
                      <div className="font-medium text-ink">{s.name}</div>
                      <div className="text-xs text-slate-400">{s.fatherName} · {s.mobile}</div>
                    </td>
                    <td>
                      <div className="font-mono text-xs text-slate-600">{s.id}</div>
                      <div className="font-mono text-[11px] text-slate-400">{s.enrollmentNo}</div>
                    </td>
                    <td className="text-slate-600">{s.program}<div className="text-xs text-slate-400">{s.university}</div></td>
                    <td className="text-slate-600">{s.session}</td>
                    <td>
                      <span className={`badge ${isJuly(s.admissionType) ? "bg-emerald-50 text-emerald-700" : "bg-sky-50 text-sky-700"}`}>
                        {(isJuly(s.admissionType) ? "☀ " : "❄ ") + intakeLabel(s.admissionType)}
                      </span>
                    </td>
                    <td>
                      {s.dueFees > 0
                        ? <span className="badge bg-rose-50 text-rose-600">₹{s.dueFees}</span>
                        : <span className="badge bg-emerald-50 text-emerald-600">Paid</span>}
                    </td>
                    <td className="pr-5 text-right">
                      <Link href={`/fees/${s.id}`} className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:underline"><Icon name="eye" className="h-4 w-4" /> Open</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<p className="text-sm text-slate-500">Loading…</p>}>
      <Results />
    </Suspense>
  );
}
