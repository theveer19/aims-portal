"use client";
import { useState } from "react";
import { Badge } from "@/components/DataTable";
import Icon from "@/components/Icon";

export default function StudentsMove({ students, years }) {
  const [checked, setChecked] = useState({});
  const [toYear, setToYear] = useState("");
  const selected = Object.values(checked).filter(Boolean).length;

  function toggle(id) { setChecked((c) => ({ ...c, [id]: !c[id] })); }
  function toggleAll() {
    const all = selected < students.length;
    const next = {};
    students.forEach((s) => (next[s.id] = all));
    setChecked(next);
  }
  function promote() {
    if (!selected || !toYear) { alert("Select students and a target year."); return; }
    alert(`${selected} student(s) promoted to "${years.find((y) => String(y.id) === toYear)?.name}".`);
  }

  return (
    <>
      <div className="card mb-4 flex flex-wrap items-end gap-4 p-4">
        <div>
          <label className="label">Promote to</label>
          <select className="input min-w-[200px]" value={toYear} onChange={(e) => setToYear(e.target.value)}>
            <option value="">-- Target Year / Semester --</option>
            {years.map((y) => <option key={y.id} value={y.id}>{y.name}</option>)}
          </select>
        </div>
        <button onClick={promote} className="btn-primary"><Icon name="arrowUp" /> Promote Selected ({selected})</button>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs uppercase text-slate-400">
              <th className="px-5 py-2.5"><input type="checkbox" checked={selected === students.length && students.length > 0} onChange={toggleAll} /></th>
              <th>ID</th><th>Name</th><th>Program</th><th>Session</th><th>Type</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-b border-slate-50 hover:bg-slate-50/60">
                <td className="px-5 py-3"><input type="checkbox" checked={!!checked[s.id]} onChange={() => toggle(s.id)} /></td>
                <td className="font-mono text-xs text-slate-500">{s.id}</td>
                <td className="font-medium text-ink">{s.name}</td>
                <td className="text-slate-600">{s.program}</td>
                <td className="text-slate-600">{s.session}</td>
                <td><Badge tone={s.admissionType === "summer" ? "green" : "sky"}>{s.admissionType === "summer" ? "☀ Summer" : "❄ Winter"}</Badge></td>
              </tr>
            ))}
            {students.length === 0 && <tr><td colSpan={6} className="px-5 py-8 text-center text-slate-400">No students.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
