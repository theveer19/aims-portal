"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/DataTable";
import Icon from "@/components/Icon";
import { addFeeHead, toggleFeeHead, deleteFeeHead } from "@/lib/actions";

export default function FeeHeadsManager({ heads }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [msg, setMsg] = useState(null);

  async function add(e) {
    e.preventDefault();
    if (!name.trim()) return;
    const res = await addFeeHead(name);
    if (res?.error) { setMsg(res.error); return; }
    setName(""); setMsg(null); router.refresh();
  }
  async function toggle(id) { await toggleFeeHead(id); router.refresh(); }
  async function del(id) { if (!confirm("Delete this fee head?")) return; await deleteFeeHead(id); router.refresh(); }

  return (
    <>
      <form onSubmit={add} className="card mb-5 flex flex-wrap items-end gap-3 p-4">
        <div className="flex-1">
          <label className="label">New Fee Head</label>
          <input className="input" value={name} onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Admission Fees, Caution Money, Examination Fees" />
          {msg && <p className="mt-1 text-xs text-rose-600">{msg}</p>}
        </div>
        <button type="submit" className="btn-primary"><Icon name="plus" /> Add Fee Head</button>
      </form>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs uppercase text-slate-400">
              <th className="px-5 py-2.5">#</th><th>Fee Head</th><th>Status</th><th className="pr-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {heads.map((h, i) => (
              <tr key={h.id} className="border-b border-slate-50">
                <td className="px-5 py-3 text-slate-400">{i + 1}</td>
                <td className="font-medium text-ink">{h.name}</td>
                <td><Badge tone={h.active ? "green" : "slate"}>{h.active ? "Active" : "Inactive"}</Badge></td>
                <td className="pr-5 text-right">
                  <div className="inline-flex gap-2">
                    <button onClick={() => toggle(h.id)} className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-xs hover:bg-slate-50"><Icon name={h.active ? "x" : "check"} className="h-3.5 w-3.5" />{h.active ? "Disable" : "Enable"}</button>
                    <button onClick={() => del(h.id)} title="Delete" className="inline-flex items-center gap-1 rounded-md border border-rose-200 px-2 py-1 text-xs text-rose-600 hover:bg-rose-50"><Icon name="trash" className="h-3.5 w-3.5" />Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm text-slate-500">
        To collect fees against these heads, open{" "}
        <Link href="/fees" className="font-medium text-brand-600 hover:underline">Fees → Search</Link>, pick a student, and click <b>Add Fees</b>.
      </p>
    </>
  );
}
