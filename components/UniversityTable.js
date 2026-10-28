"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import { updateUniversity, deleteUniversity } from "@/lib/actions";

export default function UniversityTable({ rows }) {
  const router = useRouter();
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({});

  function startEdit(u) { setEditId(u.id); setForm({ name: u.name, code: u.code, address: u.address || "" }); }
  async function save(id) { await updateUniversity(id, form); setEditId(null); router.refresh(); }
  async function del(id) {
    if (!confirm("Delete this university? Its program fees will also be removed.")) return;
    await deleteUniversity(id); router.refresh();
  }

  return (
    <div className="card overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs uppercase text-slate-400">
            <th className="px-5 py-2.5">#</th><th>Name</th><th>Code</th><th>Address</th><th className="pr-5 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((u, i) => (
            <tr key={u.id} className="border-b border-slate-50">
              <td className="px-5 py-3 text-slate-400">{i + 1}</td>
              {editId === u.id ? (
                <>
                  <td className="pr-3"><input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></td>
                  <td className="pr-3"><input className="input w-28 uppercase" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} /></td>
                  <td className="pr-3"><input className="input" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /></td>
                  <td className="pr-5 text-right">
                    <div className="inline-flex gap-1.5">
                      <button onClick={() => save(u.id)} className="btn-primary px-2 py-1 text-xs"><Icon name="check" className="h-3.5 w-3.5" />Save</button>
                      <button onClick={() => setEditId(null)} className="btn-ghost px-2 py-1 text-xs"><Icon name="x" className="h-3.5 w-3.5" />Cancel</button>
                    </div>
                  </td>
                </>
              ) : (
                <>
                  <td className="font-medium text-ink">{u.name}</td>
                  <td><span className="badge bg-brand-50 text-brand-700">{u.code}</span></td>
                  <td className="text-slate-600">{u.address}</td>
                  <td className="pr-5 text-right">
                    <div className="inline-flex gap-1.5">
                      <button onClick={() => startEdit(u)} title="Edit" className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-xs hover:bg-slate-50"><Icon name="edit" className="h-3.5 w-3.5" />Edit</button>
                      <button onClick={() => del(u.id)} title="Delete" className="inline-flex items-center gap-1 rounded-md border border-rose-200 px-2 py-1 text-xs text-rose-600 hover:bg-rose-50"><Icon name="trash" className="h-3.5 w-3.5" />Delete</button>
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}
          {rows.length === 0 && <tr><td colSpan={5} className="px-5 py-8 text-center text-slate-400">No universities yet.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
