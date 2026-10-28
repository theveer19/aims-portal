import { notFound } from "next/navigation";
import { getReceipt, getStudent } from "@/lib/queries";
import PrintButton from "@/components/PrintButton";

const fmt = (n) => Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2 });

export default function Receipt({ params }) {
  const receipt = getReceipt(decodeURIComponent(params.receiptNo));
  const student = getStudent(params.studentId);
  if (!receipt || !student) return notFound();
  const total = receipt.mainFees + receipt.otherFees;

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div className="no-print flex items-center justify-between">
        <a href={`/fees/${student.id}`} className="btn-ghost">← Back</a>
        <PrintButton />
      </div>

      <div className="print-area card p-8">
        <div className="text-center">
          <div className="text-lg font-bold text-brand-700">AYUSHI WELFARE AND EDUCATION SOCIETY, BHIND</div>
          <div className="text-xs text-slate-500">Indira Gandhi Chowk, Etawah Road, Bhind (MP)-477001 · Mob. 9926201971</div>
          <div className="mt-2 inline-block rounded border border-slate-300 px-3 py-0.5 text-sm font-semibold">FEE RECEIPT</div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-1.5 text-sm">
          <KV k="Receipt No" v={receipt.receiptNo} />
          <KV k="Date" v={receipt.date} />
          <KV k="Student Name" v={student.name} />
          <KV k="Student ID" v={student.id} />
          <KV k="Father's Name" v={student.fatherName || "—"} />
          <KV k="Class" v={`${student.program} (${student.session})`} />
          <KV k="Form No" v={student.formNo} />
          <KV k="Admission" v={student.admissionType === "summer" ? "Summer" : "Winter"} />
        </div>

        <table className="mt-6 w-full border border-slate-300 text-sm">
          <thead>
            <tr className="bg-slate-100 text-left">
              <th className="border-b border-slate-300 px-3 py-2">S.No</th>
              <th className="border-b border-slate-300 px-3 py-2">Description</th>
              <th className="border-b border-slate-300 px-3 py-2 text-right">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border-b border-slate-200 px-3 py-2">1</td><td className="border-b border-slate-200 px-3 py-2">Main / Tuition Fees</td><td className="border-b border-slate-200 px-3 py-2 text-right">{fmt(receipt.mainFees)}</td></tr>
            <tr><td className="border-b border-slate-200 px-3 py-2">2</td><td className="border-b border-slate-200 px-3 py-2">Other Fees</td><td className="border-b border-slate-200 px-3 py-2 text-right">{fmt(receipt.otherFees)}</td></tr>
            <tr className="font-semibold"><td className="px-3 py-2" colSpan={2}>TOTAL</td><td className="px-3 py-2 text-right">₹ {fmt(total)}</td></tr>
          </tbody>
        </table>

        <div className="mt-4 text-sm">Payment Mode: <b>{receipt.mode}</b></div>
        <div className="mt-12 flex justify-between text-xs text-slate-500">
          <span>Received with thanks.</span>
          <span className="border-t border-slate-400 pt-1">Authorised Signatory</span>
        </div>
      </div>
    </div>
  );
}

function KV({ k, v }) {
  return (
    <div className="flex gap-2">
      <span className="w-28 shrink-0 text-slate-500">{k}</span>
      <span className="font-medium text-ink">: {v}</span>
    </div>
  );
}
