"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import { updateProgram, deleteProgram } from "@/lib/actions";

const TYPES = ["UG", "PG", "Diploma", "Certificate"];

export default function ProgramsTable({ rows }) {
  const router = useRouter();
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({});

  function startEdit(p) { setEditId(p.id); setForm({ name: p.name, code: p.code || "", type: p.type || "UG", duration: p.duration || "" }); }
  async function save(id) { await updateProgram(id, form); setEditId(null); router.refresh(); }
  async function del(id) {
    if (!confirm("Delete this program? Its fee mappings will also be removed.")) return;
    await deleteProgram(id); router.refresh();
  }

  return (
    <div className="card overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs uppercase text-slate-400">
            <th className="px-5 py-2.5">#</th><th>Program</th><th>Code</th><th>Type</th><th>Mapped</th><th className="pr-5 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((p, i) => (
            <tr key={p.id} className="border-b border-slate-50">
              <td className="px-5 py-3 text-slate-400">{i + 1}</td>
              {editId === p.id ? (
                <>
                  <td className="pr-3"><input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></td>
                  <td className="pr-3"><input className="input w-20 uppercase" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} /></td>
                  <td className="pr-3">
                    <select className="input w-28" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                      {TYPES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </td>
                  <td></td>
                  <td className="pr-5 text-right">
                    <div className="inline-flex gap-1.5">
                      <button onClick={() => save(p.id)} className="btn-primary px-2 py-1 text-xs"><Icon name="check" className="h-3.5 w-3.5" />Save</button>
                      <button onClick={() => setEditId(null)} className="btn-ghost px-2 py-1 text-xs"><Icon name="x" className="h-3.5 w-3.5" />Cancel</button>
                    </div>
                  </td>
                </>
              ) : (
                <>
                  <td className="font-medium text-ink">{p.name}</td>
                  <td className="text-slate-600">{p.code || "—"}</td>
                  <td>{p.type ? <span className="badge bg-violet-50 text-violet-700">{p.type}</span> : "—"}</td>
                  <td><span className="badge bg-brand-50 text-brand-700">{p.usedIn} session(s)</span></td>
                  <td className="pr-5 text-right">
                    <div className="inline-flex gap-1.5">
                      <button onClick={() => startEdit(p)} title="Edit" className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-xs hover:bg-slate-50"><Icon name="edit" className="h-3.5 w-3.5" />Edit</button>
                      <button onClick={() => del(p.id)} title="Delete" className="inline-flex items-center gap-1 rounded-md border border-rose-200 px-2 py-1 text-xs text-rose-600 hover:bg-rose-50"><Icon name="trash" className="h-3.5 w-3.5" />Delete</button>
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}
          {rows.length === 0 && <tr><td colSpan={6} className="px-5 py-8 text-center text-slate-400">No programs yet.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
