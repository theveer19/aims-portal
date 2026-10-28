import PageHeader from "@/components/PageHeader";
import CancelledReport from "@/components/reports/CancelledReport";
import { getAllStudents, getSessions } from "@/lib/queries";

export default function CancelledReportPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader crumb="Dashboard · Reports · Cancelled" title="Cancelled & Refund Report" icon="list"
        desc="Cancelled admissions with refund and pending amounts. Filter by session and print." />
      <CancelledReport students={getAllStudents()} sessions={getSessions()} />
    </div>
  );
}
