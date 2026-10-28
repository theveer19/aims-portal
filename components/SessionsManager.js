"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import { Badge } from "@/components/DataTable";
import { addSession, updateSession, deleteSession } from "@/lib/actions";
import { intakeLabel } from "@/lib/intake";

const INTAKES = ["January", "July"];
const YEARS = ["2024", "2025", "2026", "2027", "2028"];

export default function SessionsManager({ sessions }) {
  const router = useRouter();
  const [intake, setIntake] = useState("July");
  const [year, setYear] = useState("2025");
  const [msg, setMsg] = useState(null);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: "", type: "July" });

  async function add(e) {
    e.preventDefault();
    const res = await addSession({ name: `${intake} ${year}`, type: intake });
    if (res?.error) { setMsg(res.error); return; }
    setMsg(null); router.refresh();
  }
  async function save(id) { await updateSession(id, form); setEditId(null); router.refresh(); }
  async function del(id) {
    const res = await deleteSession(id);
    if (res?.error) { alert(res.error); return; }
    router.refresh();
  }

  return (
    <>
      <form onSubmit={add} className="card mb-5 flex flex-wrap items-end gap-3 p-4">
        <div>
          <label className="label">Intake</label>
          <select className="input min-w-[130px]" value={intake} onChange={(e) => setIntake(e.target.value)}>
            {INTAKES.map((m) => <option key={m}>{m}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Year</label>
          <select className="input min-w-[110px]" value={year} onChange={(e) => setYear(e.target.value)}>
            {YEARS.map((y) => <option key={y}>{y}</option>)}
          </select>
        </div>
        <div className="text-sm text-slate-500">
          Session name: <b className="text-ink">{intake} {year}</b>
        </div>
        <button type="submit" className="btn-primary ml-auto"><Icon name="plus" /> Add Session</button>
      </form>
      {msg && <p className="mb-3 text-sm text-rose-600">{msg}</p>}

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs uppercase text-slate-400">
              <th className="px-5 py-2.5">#</th><th>Session</th><th>Intake</th><th className="pr-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((s, i) => (
              <tr key={s.id} className="border-b border-slate-50">
                <td className="px-5 py-3 text-slate-400">{i + 1}</td>
                {editId === s.id ? (
                  <>
                    <td className="pr-3"><input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></td>
                    <td className="pr-3">
                      <select className="input w-32" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                        {INTAKES.map((m) => <option key={m}>{m}</option>)}
                      </select>
                    </td>
                    <td className="pr-5 text-right">
                      <div className="inline-flex gap-1.5">
                        <button onClick={() => save(s.id)} className="btn-primary px-2 py-1 text-xs"><Icon name="check" className="h-3.5 w-3.5" />Save</button>
                        <button onClick={() => setEditId(null)} className="btn-ghost px-2 py-1 text-xs"><Icon name="x" className="h-3.5 w-3.5" />Cancel</button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="font-medium text-ink">{s.name}</td>
                    <td><Badge tone={s.type?.toLowerCase() === "july" || s.type?.toLowerCase() === "summer" ? "green" : "sky"}>{intakeLabel(s.type)}</Badge></td>
                    <td className="pr-5 text-right">
                      <div className="inline-flex gap-1.5">
                        <button onClick={() => { setEditId(s.id); setForm({ name: s.name, type: intakeLabel(s.type) }); }} className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-xs hover:bg-slate-50"><Icon name="edit" className="h-3.5 w-3.5" />Edit</button>
                        <button onClick={() => del(s.id)} className="inline-flex items-center gap-1 rounded-md border border-rose-200 px-2 py-1 text-xs text-rose-600 hover:bg-rose-50"><Icon name="trash" className="h-3.5 w-3.5" />Delete</button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
