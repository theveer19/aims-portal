"use client";
import { useMemo, useState } from "react";
import ReportFrame from "@/components/ReportFrame";

const rup = (n) => "₹" + Number(n || 0).toLocaleString("en-IN");

export default function FeesDueReport({ students, sessions, universities }) {
  const [f, setF] = useState({ session: "all", university: "all" });
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));

  const rows = useMemo(() => students.filter((s) =>
    s.status !== "cancelled" && s.dueFees > 0 &&
    (f.session === "all" || String(s.sessionId) === f.session) &&
    (f.university === "all" || s.university === f.university)
  ).sort((a, b) => b.dueFees - a.dueFees), [students, f]);

  const totalDue = rows.reduce((a, s) => a + s.dueFees, 0);
  const totalFee = rows.reduce((a, s) => a + s.totalFees, 0);
  const totalPaid = totalFee - totalDue;

  const filters = (
    <>
      <div>
        <label className="label">Session</label>
        <select className="input min-w-[150px]" value={f.session} onChange={(e) => set("session", e.target.value)}>
          <option value="all">All Sessions</option>
          {sessions.map((s) => <option key={s.id} value={String(s.id)}>{s.name}</option>)}
        </select>
      </div>
      <div>
        <label className="label">University</label>
        <select className="input min-w-[150px]" value={f.university} onChange={(e) => set("university", e.target.value)}>
          <option value="all">All</option>
          {universities.map((u) => <option key={u.id} value={u.name}>{u.name}</option>)}
        </select>
      </div>
    </>
  );

  return (
    <ReportFrame title="FEES DUE / PENDING REPORT" subtitle={`${rows.length} student(s) with pending fees · Total due ${rup(totalDue)}`} filters={filters}>
      <table className="rpt">
        <thead>
          <tr>
            <th>#</th><th>Student ID</th><th>Name</th><th>Mobile</th><th>University</th><th>Branch</th>
            <th>Session</th><th>Total Fee</th><th>Paid</th><th>Due</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((s, i) => (
            <tr key={s.id}>
              <td>{i + 1}</td><td>{s.id}</td><td>{s.name}</td><td>{s.mobile || "—"}</td>
              <td>{s.university}</td><td>{s.program}</td><td>{s.session}</td>
              <td>{rup(s.totalFees)}</td><td>{rup(s.totalFees - s.dueFees)}</td>
              <td style={{ fontWeight: 600 }}>{rup(s.dueFees)}</td>
            </tr>
          ))}
          {rows.length === 0 && <tr><td colSpan={10} style={{ textAlign: "center", color: "#94a3b8" }}>No pending fees. 🎉</td></tr>}
        </tbody>
        {rows.length > 0 && (
          <tfoot>
            <tr><td colSpan={7} style={{ textAlign: "right" }}>TOTAL</td><td>{rup(totalFee)}</td><td>{rup(totalPaid)}</td><td>{rup(totalDue)}</td></tr>
          </tfoot>
        )}
      </table>
    </ReportFrame>
  );
}
