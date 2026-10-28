import Link from "next/link";
import { notFound } from "next/navigation";
import FeeReceipts from "@/components/FeeReceipts";
import Icon from "@/components/Icon";
import { getFeeDetail } from "@/lib/queries";

const fmt = (n) => Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2 });

export default function FeesDetail({ params }) {
  const data = getFeeDetail(params.studentId);
  if (!data) return notFound();
  const { student, receipts, summary } = data;

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-ink">Fees Detail</h1>
          <p className="text-sm text-slate-500">
            <Link href="/fees" className="text-brand-600 hover:underline">Fees</Link> → {student.name}
          </p>
        </div>
        <Link href={`/fees/${student.id}/add`} className="btn-primary"><Icon name="plus" /> Add Fees</Link>
      </div>

      <div className="card p-6">
        <div className="text-center">
          <div className="text-lg font-bold text-brand-700">AYUSHI WELFARE AND EDUCATION SOCIETY, BHIND</div>
          <div className="text-xs text-slate-500">Indira Gandhi Chowk, Etawah Road, Bhind (MP)-477001 · Mob. 9926201971</div>
        </div>
        <div className="mt-4 grid gap-x-8 gap-y-2 text-sm md:grid-cols-2">
          <Row k="Name" v={student.name} />
          <Row k="Class" v={`${student.program} (${student.session})`} />
          <Row k="Student ID" v={student.id} mono />
          <Row k="Form No" v={student.formNo} mono />
          <Row k="Admission" v={student.admissionType === "summer" ? "☀ Summer" : "❄ Winter"} />
          <Row k="Batch Year" v={student.batchYear || "—"} />
          <Row k="Total Fees (₹)" v={fmt(summary.totalFees)} />
          <Row k="Submitted (₹)" v={fmt(summary.totalSubmitted)} />
          <Row k="Due (₹)" v={fmt(summary.dueFees)} strong={summary.dueFees > 0} />
          <Row k="Extra Submitted (₹)" v={fmt(summary.submittedExtra)} />
        </div>
      </div>

      <FeeReceipts studentId={student.id} receipts={receipts} totals={summary} />
    </div>
  );
}

function Row({ k, v, mono, strong }) {
  return (
    <div className="flex justify-between border-b border-slate-50 py-1">
      <span className="text-slate-500">{k}</span>
      <span className={`${mono ? "font-mono text-xs" : ""} ${strong ? "font-semibold text-rose-600" : "text-ink"}`}>{v}</span>
    </div>
  );
}
