"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import { updateFee, deleteFee } from "@/lib/actions";

const fmt = (n) => Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2 });

export default function FeeReceipts({ studentId, receipts, totals }) {
  const router = useRouter();
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ mainFees: "", otherFees: "" });

  async function save(id) { await updateFee(id, studentId, form); setEditId(null); router.refresh(); }
  async function del(id) { if (!confirm("Delete this receipt?")) return; await deleteFee(id, studentId); router.refresh(); }

  return (
    <div className="card overflow-hidden">
      <div className="border-b border-slate-100 px-5 py-3 text-sm font-semibold text-ink">Previous Installment Details</div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs uppercase text-slate-400">
              <th className="px-5 py-2.5">Receipt No</th><th>Date</th><th>Main Fees</th><th>Other Fees</th><th>Mode</th><th className="pr-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {receipts.map((r) => (
              <tr key={r.id} className="border-b border-slate-50">
                <td className="px-5 py-3 font-mono text-xs text-slate-600">{r.receiptNo}</td>
                <td className="text-slate-600">{r.date}</td>
                {editId === r.id ? (
                  <>
                    <td className="pr-3"><input className="input w-24" inputMode="numeric" value={form.mainFees} onChange={(e) => setForm({ ...form, mainFees: e.target.value })} /></td>
                    <td className="pr-3"><input className="input w-24" inputMode="numeric" value={form.otherFees} onChange={(e) => setForm({ ...form, otherFees: e.target.value })} /></td>
                    <td><span className="badge bg-slate-100 text-slate-600">{r.mode}</span></td>
                    <td className="pr-5 text-right">
                      <div className="inline-flex gap-1.5">
                        <button onClick={() => save(r.id)} className="btn-primary px-2 py-1 text-xs"><Icon name="check" className="h-3.5 w-3.5" />Save</button>
                        <button onClick={() => setEditId(null)} className="btn-ghost px-2 py-1 text-xs"><Icon name="x" className="h-3.5 w-3.5" />Cancel</button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="font-medium text-ink">₹{fmt(r.mainFees)}</td>
                    <td className="text-slate-600">₹{fmt(r.otherFees)}</td>
                    <td><span className="badge bg-slate-100 text-slate-600">{r.mode}</span></td>
                    <td className="pr-5 text-right">
                      <div className="inline-flex gap-1.5">
                        <button onClick={() => { setEditId(r.id); setForm({ mainFees: r.mainFees, otherFees: r.otherFees }); }}
                          title="Edit" className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-xs hover:bg-slate-50"><Icon name="edit" className="h-3.5 w-3.5" />Edit</button>
                        <button onClick={() => del(r.id)} title="Delete" className="inline-flex items-center gap-1 rounded-md border border-rose-200 px-2 py-1 text-xs text-rose-600 hover:bg-rose-50"><Icon name="trash" className="h-3.5 w-3.5" />Delete</button>
                        <Link href={`/fees/${studentId}/receipt/${encodeURIComponent(r.receiptNo)}`}
                          title="Print receipt" className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-xs hover:bg-slate-50"><Icon name="printer" className="h-3.5 w-3.5" />Print</Link>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
            {receipts.length === 0 && <tr><td colSpan={6} className="px-5 py-6 text-center text-slate-400">No fees recorded yet.</td></tr>}
          </tbody>
          <tfoot>
            <tr className="bg-slate-50 font-semibold text-ink">
              <td className="px-5 py-2.5" colSpan={2}>Total</td>
              <td>₹{fmt(totals.totalSubmitted)}</td>
              <td>₹{fmt(totals.submittedExtra)}</td>
              <td colSpan={2}></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
