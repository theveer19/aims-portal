import { notFound } from "next/navigation";
import AddFeeForm from "@/components/AddFeeForm";
import { getFeeDetail, getFeeHeads } from "@/lib/queries";

export default function AddFees({ params }) {
  const data = getFeeDetail(params.studentId);
  if (!data) return notFound();
  const heads = getFeeHeads(true);
  return <AddFeeForm student={data.student} due={data.summary.dueFees} heads={heads} />;
}
