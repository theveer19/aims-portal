import Link from "next/link";
import BackButton from "@/components/BackButton";
import ProgramFeeForm from "@/components/ProgramFeeForm";
import { getUniversities, getPrograms, getSessions } from "@/lib/queries";

export default function AddProgramFee() {
  const universities = getUniversities();
  const programs = getPrograms();
  const sessions = getSessions();
  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-5">
        <div className="sectionbar">
          <h1 className="text-base font-semibold">Add Program Fee</h1>
          <Link href="/university/mapping" className="btn-ghost px-3 py-1.5 text-xs">List</Link>
        </div>
        <div className="flex items-center justify-between rounded-b-lg border border-t-0 border-slate-200 bg-white px-5 py-2">
          <span className="crumb">Dashboard · University · Program Fees · Add</span>
          <BackButton />
        </div>
      </div>
      <ProgramFeeForm universities={universities} programs={programs} sessions={sessions} />
    </div>
  );
}
