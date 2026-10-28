import PageHeader from "@/components/PageHeader";
import ReportsView from "@/components/ReportsView";
import { getAllStudents, getSessions, getUniversities } from "@/lib/queries";

export default function Reports() {
  const students = getAllStudents();
  const sessions = getSessions();
  const universities = getUniversities();
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader crumb="Dashboard · Reports" title="Reports" icon="list"
        desc="Admissions, fees collected, pending, cancellations and refunds — filter by session." />
      <ReportsView students={students} sessions={sessions} universities={universities} />
    </div>
  );
}
