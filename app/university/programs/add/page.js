"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";
import Icon from "@/components/Icon";
import { addProgram } from "@/lib/actions";

export default function AddProgram() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", code: "", duration: "", type: "UG" });
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true); setMsg(null);
    const res = await addProgram(form);
    setBusy(false);
    if (res?.error) { setMsg({ type: "err", text: res.error }); return; }
    setMsg({ type: "ok", text: `Program "${form.name}" saved.` });
    setForm({ name: "", code: "", duration: "", type: "UG" });
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-5">
        <div className="sectionbar">
          <h1 className="text-base font-semibold">Add New Program</h1>
          <Link href="/university/programs" className="btn-ghost px-3 py-1.5 text-xs">List</Link>
        </div>
        <div className="flex items-center justify-between rounded-b-lg border border-t-0 border-slate-200 bg-white px-5 py-2">
          <span className="crumb">Dashboard · University · Program · Add</span>
          <BackButton />
        </div>
      </div>

      {msg && (
        <div className={`mb-4 rounded-lg border px-4 py-2 text-sm ${msg.type === "ok" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-rose-200 bg-rose-50 text-rose-700"}`}>{msg.text}</div>
      )}

      <form onSubmit={submit} className="card space-y-4 p-6">
        <p className="text-xs text-slate-400">Fields marked <span className="text-rose-500">*</span> are required.</p>
        <div>
          <label className="label">Program Name *</label>
          <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Bachelor of Arts" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="label">Program Code</label>
            <input className="input uppercase" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} placeholder="e.g. BA" />
          </div>
          <div>
            <label className="label">Type</label>
            <select className="input" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              <option value="UG">Undergraduate (UG)</option>
              <option value="PG">Postgraduate (PG)</option>
              <option value="Diploma">Diploma</option>
              <option value="Certificate">Certificate</option>
            </select>
          </div>
          <div>
            <label className="label">Duration (years)</label>
            <input className="input" inputMode="numeric" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="e.g. 3" />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button type="button" className="btn-ghost" onClick={() => setForm({ name: "", code: "", duration: "", type: "UG" })}><Icon name="refresh" /> Reset</button>
          <button type="submit" className="btn-primary" disabled={busy}><Icon name="save" /> {busy ? "Saving…" : "Save"}</button>
        </div>
      </form>
    </div>
  );
}
