"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";
import Icon from "@/components/Icon";
import { addFee } from "@/lib/actions";

export default function AddFeeForm({ student, due, heads }) {
  const router = useRouter();
  const [amounts, setAmounts] = useState(() => heads.map(() => ""));
  const [extras, setExtras] = useState([]);
  const [mode, setMode] = useState("Cash");
  const [refNo, setRefNo] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);

  const total = useMemo(() => {
    const base = amounts.reduce((a, v) => a + (parseFloat(v) || 0), 0);
    const ex = extras.reduce((a, r) => a + (parseFloat(r.amount) || 0), 0);
    return base + ex;
  }, [amounts, extras]);

  const setAmt = (i, v) => setAmounts((p) => p.map((x, idx) => (idx === i ? v : x)));
  const addExtra = () => setExtras((e) => [...e, { label: "", amount: "" }]);
  const setExtra = (i, k, v) => setExtras((e) => e.map((r, idx) => (idx === i ? { ...r, [k]: v } : r)));
  const removeExtra = (i) => setExtras((e) => e.filter((_, idx) => idx !== i));

  async function submit(e) {
    e.preventDefault();
    if (total <= 0) { setMsg({ type: "err", text: "Enter an amount in at least one head." }); return; }
    setBusy(true); setMsg(null);
    const res = await addFee(student.id, { mainFees: total, otherFees: 0, mode });
    setBusy(false);
    if (res?.error) { setMsg({ type: "err", text: res.error }); return; }
    router.push(`/fees/${student.id}`);
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="mx-auto max-w-3xl">
      <div className="mb-5">
        <div className="sectionbar">
          <h1 className="text-base font-semibold">Add Fees — {student.name}</h1>
          <span className="badge bg-white/15 text-white">Due ₹{Number(due).toLocaleString("en-IN")}</span>
        </div>
        <div className="flex items-center justify-between rounded-b-lg border border-t-0 border-slate-200 bg-white px-5 py-2">
          <span className="crumb">Fees · {student.id} · Add</span>
          <BackButton />
        </div>
      </div>

      {msg && <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-2 text-sm text-rose-700">{msg.text}</div>}

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs uppercase text-slate-400">
              <th className="w-12 px-5 py-2.5">#</th><th>Description</th><th className="w-48 pr-5 text-right">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {heads.map((h, i) => (
              <tr key={h.id} className="border-b border-slate-50">
                <td className="px-5 py-2 text-slate-400">{i + 1}</td>
                <td className="text-slate-700">{h.name}</td>
                <td className="pr-5"><input type="number" min="0" value={amounts[i]} onChange={(e) => setAmt(i, e.target.value)} placeholder="0" className="input text-right" /></td>
              </tr>
            ))}
            {extras.map((r, i) => (
              <tr key={`ex-${i}`} className="border-b border-slate-50 bg-amber-50/30">
                <td className="px-5 py-2 text-slate-400">{heads.length + i + 1}</td>
                <td className="pr-3">
                  <div className="flex items-center gap-2">
                    <input value={r.label} onChange={(e) => setExtra(i, "label", e.target.value)} placeholder="Custom fee head" className="input max-w-xs" />
                    <button type="button" onClick={() => removeExtra(i)} className="rounded-md border border-rose-200 px-2 py-1 text-xs text-rose-600 hover:bg-rose-50">✕</button>
                  </div>
                </td>
                <td className="pr-5"><input type="number" min="0" value={r.amount} onChange={(e) => setExtra(i, "amount", e.target.value)} placeholder="0" className="input text-right" /></td>
              </tr>
            ))}
            <tr>
              <td></td>
              <td className="px-0 py-2" colSpan={2}>
                <button type="button" onClick={addExtra} className="ml-5 inline-flex items-center gap-1 rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"><Icon name="plus" className="h-3.5 w-3.5" /> Add Fee Head</button>
              </td>
            </tr>
            <tr className="bg-slate-50 font-semibold text-ink">
              <td className="px-5 py-2.5" colSpan={2}>TOTAL</td>
              <td className="pr-5 text-right text-lg text-brand-700">₹{total.toLocaleString("en-IN")}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="card mt-5 p-5">
        <div className="mb-3 flex flex-wrap gap-4 text-sm">
          {["Cash", "Cheque", "DD", "UPI", "Net Banking"].map((m) => (
            <label key={m} className="inline-flex items-center gap-2">
              <input type="radio" name="mode" checked={mode === m} onChange={() => setMode(m)} /> {m}
            </label>
          ))}
        </div>
        {mode !== "Cash" && <input value={refNo} onChange={(e) => setRefNo(e.target.value)} placeholder={`${mode} No / Reference / Txn ID`} className="input max-w-sm" />}
      </div>

      <div className="mt-5 flex justify-end gap-3">
        <Link href={`/fees/${student.id}`} className="btn-ghost"><Icon name="x" /> Cancel</Link>
        <button type="submit" className="btn-primary" disabled={busy}><Icon name="printer" /> {busy ? "Saving…" : "Submit & Generate Receipt"}</button>
      </div>
    </form>
  );
}
