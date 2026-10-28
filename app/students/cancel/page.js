import PageHeader from "@/components/PageHeader";
import CancelledTable from "@/components/CancelledTable";
import { getAllStudents } from "@/lib/queries";

export default function StudentsCancel() {
  const rows = getAllStudents().filter((s) => s.status === "cancelled");
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader crumb="Dashboard · Students · Cancel" title="Cancelled Students"
        desc="Cancelled admissions with refund and pending amounts. To cancel a student, open their Fees Detail and click Cancel Admission." />
      <CancelledTable rows={rows} />
    </div>
  );
}
