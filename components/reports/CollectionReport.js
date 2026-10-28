"use client";
import { useMemo, useState } from "react";
import ReportFrame from "@/components/ReportFrame";

const rup = (n) => "₹" + Number(n || 0).toLocaleString("en-IN");

export default function CollectionReport({ ledger, sessions }) {
  const [session, setSession] = useState("all");
  const [mode, setMode] = useState("all");

  const rows = useMemo(() => ledger.filter((r) =>
    (session === "all" || String(r.sessionId) === session) &&
    (mode === "all" || r.mode === mode)
  ), [ledger, session, mode]);

  const total = rows.reduce((a, r) => a + r.amount, 0);
  const modes = [...new Set(ledger.map((r) => r.mode))];

  const filters = (
    <>
      <div>
        <label className="label">Session</label>
        <select className="input min-w-[150px]" value={session} onChange={(e) => setSession(e.target.value)}>
          <option value="all">All Sessions</option>
          {sessions.map((s) => <option key={s.id} value={String(s.id)}>{s.name}</option>)}
        </select>
      </div>
      <div>
        <label className="label">Mode</label>
        <select className="input" value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="all">All</option>
          {modes.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>
    </>
  );

  return (
    <ReportFrame title="FEE COLLECTION REPORT" subtitle={`${rows.length} receipt(s) · Total ${rup(total)}`} filters={filters}>
      <table className="rpt">
        <thead>
          <tr><th>#</th><th>Date</th><th>Receipt No</th><th>Student</th><th>Branch</th><th>Session</th><th>Mode</th><th>Amount</th></tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.id}>
              <td>{i + 1}</td><td>{r.date}</td><td>{r.receiptNo}</td><td>{r.name}</td>
              <td>{r.program || "—"}</td><td>{r.session || "—"}</td><td>{r.mode}</td>
              <td style={{ fontWeight: 600 }}>{rup(r.amount)}</td>
            </tr>
          ))}
          {rows.length === 0 && <tr><td colSpan={8} style={{ textAlign: "center", color: "#94a3b8" }}>No collections for this filter.</td></tr>}
        </tbody>
        {rows.length > 0 && (
          <tfoot><tr><td colSpan={7} style={{ textAlign: "right" }}>TOTAL COLLECTION</td><td>{rup(total)}</td></tr></tfoot>
        )}
      </table>
    </ReportFrame>
  );
}
