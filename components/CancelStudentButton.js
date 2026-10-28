"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import { cancelStudent, restoreStudent } from "@/lib/actions";

export default function CancelStudentButton({ studentId, status, due }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [refund, setRefund] = useState("");

  async function doCancel() {
    setBusy(true);
    await cancelStudent(studentId, { reason, refund });
    setBusy(false); setOpen(false); router.refresh();
  }
  async function doRestore() {
    if (!confirm("Restore this admission?")) return;
    setBusy(true); await restoreStudent(studentId); setBusy(false); router.refresh();
  }

  if (status === "cancelled") {
    return (
      <button onClick={doRestore} disabled={busy}
        className="inline-flex items-center gap-1.5 rounded-md border border-emerald-300 px-3 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-50">
        <Icon name="refresh" className="h-3.5 w-3.5" /> Restore Admission
      </button>
    );
  }

  if (!open) {
    return (
      <button onClick={() => { setRefund(""); setReason(""); setOpen(true); }}
        className="inline-flex items-center gap-1.5 rounded-md border border-rose-300 px-3 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50">
        <Icon name="x" className="h-3.5 w-3.5" /> Cancel Admission
      </button>
    );
  }

  return (
    <div className="card w-full max-w-md p-4">
      <h3 className="mb-2 text-sm font-semibold text-ink">Cancel Admission</h3>
      <p className="mb-3 text-xs text-slate-500">Paid so far can be refunded. Current due: ₹{Number(due).toLocaleString("en-IN")}</p>
      <div className="space-y-3">
        <div>
          <label className="label">Reason</label>
          <input className="input" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g. Took admission elsewhere" />
        </div>
        <div>
          <label className="label">Refund Amount (₹)</label>
          <input className="input" inputMode="numeric" value={refund} onChange={(e) => setRefund(e.target.value)} placeholder="0" />
        </div>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button onClick={() => setOpen(false)} className="btn-ghost px-3 py-1.5 text-xs">Back</button>
        <button onClick={doCancel} disabled={busy} className="btn-danger px-3 py-1.5 text-xs">
          <Icon name="check" className="h-3.5 w-3.5" /> {busy ? "Saving…" : "Confirm Cancel"}
        </button>
      </div>
    </div>
  );
}
