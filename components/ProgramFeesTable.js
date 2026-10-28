"use client";
import { useState } from "react";
import { intakeLabel, isJuly } from "@/lib/intake";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import { updateProgramFee, deleteProgramFee } from "@/lib/actions";

export default function ProgramFeesTable({ rows }) {
  const router = useRouter();
  const [editId, setEditId] = useState(null);
  const [fee, setFee] = useState("");

  async function save(id) { await updateProgramFee(id, fee); setEditId(null); router.refresh(); }
  async function del(id) { if (!confirm("Delete this program fee mapping?")) return; await deleteProgramFee(id); router.refresh(); }

  return (
    <div className="card overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs uppercase text-slate-400">
            <th className="px-5 py-2.5">University</th><th>Program</th><th>Session</th><th>Type</th><th>Fee (₹)</th><th className="pr-5 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b border-slate-50">
              <td className="px-5 py-3 font-medium text-ink">{r.university}</td>
              <td className="text-slate-600">{r.program}</td>
              <td className="text-slate-600">{r.session}</td>
              <td><span className={`badge ${isJuly(r.type) ? "bg-emerald-50 text-emerald-700" : "bg-sky-50 text-sky-700"}`}>{intakeLabel(r.type)}</span></td>
              <td>
                {editId === r.id
                  ? <input className="input w-28" inputMode="numeric" value={fee} onChange={(e) => setFee(e.target.value)} />
                  : <span className="font-medium">₹{r.fee.toLocaleString("en-IN")}</span>}
              </td>
              <td className="pr-5 text-right">
                <div className="inline-flex gap-1.5">
                  {editId === r.id ? (
                    <>
                      <button onClick={() => save(r.id)} className="btn-primary px-2 py-1 text-xs"><Icon name="check" className="h-3.5 w-3.5" />Save</button>
                      <button onClick={() => setEditId(null)} className="btn-ghost px-2 py-1 text-xs"><Icon name="x" className="h-3.5 w-3.5" />Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => { setEditId(r.id); setFee(r.fee); }} title="Edit fee" className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-xs hover:bg-slate-50"><Icon name="edit" className="h-3.5 w-3.5" />Edit</button>
                      <button onClick={() => del(r.id)} title="Delete" className="inline-flex items-center gap-1 rounded-md border border-rose-200 px-2 py-1 text-xs text-rose-600 hover:bg-rose-50"><Icon name="trash" className="h-3.5 w-3.5" />Delete</button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
          {rows.length === 0 && <tr><td colSpan={6} className="px-5 py-8 text-center text-slate-400">No program fees yet.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
