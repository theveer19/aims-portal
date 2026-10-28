"use client";
import { useMemo, useState } from "react";
import ReportFrame from "@/components/ReportFrame";
import { intakeLabel } from "@/lib/intake";

const rup = (n) => "₹" + Number(n || 0).toLocaleString("en-IN");

export default function StudentRegister({ students, sessions, universities, programs }) {
  const [f, setF] = useState({ session: "all", university: "all", program: "all", status: "active" });
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));

  const rows = useMemo(() => students.filter((s) =>
    (f.session === "all" || String(s.sessionId) === f.session) &&
    (f.university === "all" || s.university === f.university) &&
    (f.program === "all" || s.program === f.program) &&
    (f.status === "all" || s.status === f.status)
  ), [students, f]);

  const tot = rows.reduce((a, s) => ({
    total: a.total + s.totalFees, paid: a.paid + (s.totalFees - s.dueFees), due: a.due + s.dueFees,
  }), { total: 0, paid: 0, due: 0 });

  const Sel = ({ k, label, options }) => (
    <div>
      <label className="label">{label}</label>
      <select className="input min-w-[150px]" value={f[k]} onChange={(e) => set(k, e.target.value)}>
        <option value="all">All</option>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );

  const filters = (
    <>
      <Sel k="session" label="Session" options={sessions.map((s) => ({ value: String(s.id), label: s.name }))} />
      <Sel k="university" label="University" options={universities.map((u) => ({ value: u.name, label: u.name }))} />
      <Sel k="program" label="Branch" options={programs.map((p) => ({ value: p.name, label: p.name }))} />
      <div>
        <label className="label">Status</label>
        <select className="input" value={f.status} onChange={(e) => set("status", e.target.value)}>
          <option value="active">Active</option>
          <option value="cancelled">Cancelled</option>
          <option value="all">All</option>
        </select>
      </div>
    </>
  );

  return (
    <ReportFrame title="STUDENT REGISTER" subtitle={`${rows.length} student(s)`} filters={filters}>
      <table className="rpt">
        <thead>
          <tr>
            <th>#</th><th>Student ID</th><th>Form No</th><th>Name</th><th>Father's Name</th><th>Mobile</th>
            <th>University</th><th>Branch</th><th>Session</th><th>Intake</th><th>Batch</th><th>Admission Date</th>
            <th>Total</th><th>Paid</th><th>Due</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((s, i) => (
            <tr key={s.id}>
              <td>{i + 1}</td>
              <td>{s.id}</td>
              <td>{s.formNo}</td>
              <td>{s.name}</td>
              <td>{s.fatherName || "—"}</td>
              <td>{s.mobile || "—"}</td>
              <td>{s.university}</td>
              <td>{s.program}</td>
              <td>{s.session}</td>
              <td>{intakeLabel(s.admissionType)}</td>
              <td>{s.batchYear || "—"}</td>
              <td>{s.createdAt || "—"}</td>
              <td>{rup(s.totalFees)}</td>
              <td>{rup(s.totalFees - s.dueFees)}</td>
              <td>{s.dueFees > 0 ? rup(s.dueFees) : "—"}</td>
              <td>{s.status}</td>
            </tr>
          ))}
          {rows.length === 0 && <tr><td colSpan={16} style={{ textAlign: "center", color: "#94a3b8" }}>No students match the filters.</td></tr>}
        </tbody>
        {rows.length > 0 && (
          <tfoot>
            <tr>
              <td colSpan={12} style={{ textAlign: "right" }}>TOTAL</td>
              <td>{rup(tot.total)}</td><td>{rup(tot.paid)}</td><td>{rup(tot.due)}</td><td></td>
            </tr>
          </tfoot>
        )}
      </table>
    </ReportFrame>
  );
}
