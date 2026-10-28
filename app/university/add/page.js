"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";
import Icon from "@/components/Icon";
import { addUniversity } from "@/lib/actions";

export default function AddUniversity() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", code: "", address: "" });
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true); setMsg(null);
    const res = await addUniversity(form);
    setBusy(false);
    if (res?.error) { setMsg({ type: "err", text: res.error }); return; }
    setMsg({ type: "ok", text: "University saved." });
    setForm({ name: "", code: "", address: "" });
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-5">
        <div className="sectionbar">
          <h1 className="text-base font-semibold">Add New University</h1>
          <Link href="/university/list" className="btn-ghost px-3 py-1.5 text-xs">List</Link>
        </div>
        <div className="flex items-center justify-between rounded-b-lg border border-t-0 border-slate-200 bg-white px-5 py-2">
          <span className="crumb">Dashboard · University · Add</span>
          <BackButton />
        </div>
      </div>

      {msg && (
        <div className={`mb-4 rounded-lg border px-4 py-2 text-sm ${msg.type === "ok" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-rose-200 bg-rose-50 text-rose-700"}`}>
          {msg.text}
        </div>
      )}

      <form onSubmit={submit} className="card space-y-4 p-6">
        <p className="text-xs text-slate-400">Fields marked <span className="text-rose-500">*</span> are required.</p>
        <div>
          <label className="label">University Name *</label>
          <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Jiwaji University" />
        </div>
        <div>
          <label className="label">Code *</label>
          <input className="input uppercase" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} placeholder="e.g. JIWAJI" />
        </div>
        <div>
          <label className="label">Address</label>
          <textarea className="input min-h-[90px]" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="City, State" />
        </div>
        <div className="flex justify-end gap-3">
          <button type="button" className="btn-ghost" onClick={() => setForm({ name: "", code: "", address: "" })}><Icon name="refresh" /> Reset</button>
          <button type="submit" className="btn-primary" disabled={busy}><Icon name="save" /> {busy ? "Saving…" : "Save"}</button>
        </div>
      </form>
    </div>
  );
}
