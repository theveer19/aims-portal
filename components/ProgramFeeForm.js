"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import { addProgramFee } from "@/lib/actions";

export default function ProgramFeeForm({ universities, programs, sessions }) {
  const router = useRouter();
  const [form, setForm] = useState({ universityId: "", programId: "", sessionId: "", fee: "" });
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  async function submit(e) {
    e.preventDefault();
    setBusy(true); setMsg(null);
    const res = await addProgramFee(form);
    setBusy(false);
    if (res?.error) { setMsg({ type: "err", text: res.error }); return; }
    setMsg({ type: "ok", text: "Program fee saved." });
    setForm({ universityId: "", programId: "", sessionId: "", fee: "" });
    router.refresh();
  }

  return (
    <>
      {msg && (
        <div className={`mb-4 rounded-lg border px-4 py-2 text-sm ${msg.type === "ok" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-rose-200 bg-rose-50 text-rose-700"}`}>{msg.text}</div>
      )}
      <form onSubmit={submit} className="card space-y-4 p-6">
        <p className="text-xs text-slate-400">
          Links a program to a university and session with its fee. The admission form uses this to show only the
          programs available for the selected university and session.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="label">University *</label>
            <select className="input" value={form.universityId} onChange={(e) => set("universityId", e.target.value)}>
              <option value="">-- Select University --</option>
              {universities.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Session *</label>
            <select className="input" value={form.sessionId} onChange={(e) => set("sessionId", e.target.value)}>
              <option value="">-- Select Session --</option>
              {sessions.map((s) => <option key={s.id} value={s.id}>{s.name} ({s.type})</option>)}
            </select>
          </div>
          <div>
            <label className="label">Program *</label>
            <select className="input" value={form.programId} onChange={(e) => set("programId", e.target.value)}>
              <option value="">-- Select Program --</option>
              {programs.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Fee Amount (₹) *</label>
            <input className="input" inputMode="numeric" value={form.fee} onChange={(e) => set("fee", e.target.value)} placeholder="e.g. 9000" />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button type="button" className="btn-ghost" onClick={() => setForm({ universityId: "", programId: "", sessionId: "", fee: "" })}><Icon name="refresh" /> Reset</button>
          <button type="submit" className="btn-primary" disabled={busy}><Icon name="save" /> {busy ? "Saving…" : "Save"}</button>
        </div>
      </form>
    </>
  );
}
