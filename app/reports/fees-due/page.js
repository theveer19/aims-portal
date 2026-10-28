import PageHeader from "@/components/PageHeader";
import FeesDueReport from "@/components/reports/FeesDueReport";
import { getAllStudents, getSessions, getUniversities } from "@/lib/queries";

export default function FeesDuePage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader crumb="Dashboard · Reports · Fees Due" title="Fees Due Report" icon="rupee"
        desc="Students with pending fees — kis-kis ki fees due hai. Filter by session / university and print." />
      <FeesDueReport students={getAllStudents()} sessions={getSessions()} universities={getUniversities()} />
    </div>
  );
}
