import PageHeader from "@/components/PageHeader";
import StudentRegister from "@/components/reports/StudentRegister";
import { getAllStudents, getSessions, getUniversities, getPrograms } from "@/lib/queries";

export default function StudentRegisterPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader crumb="Dashboard · Reports · Student Register" title="Student Register" icon="list"
        desc="Every student — who, when admitted, branch, session, fees paid & due. Filter and print / save as PDF." />
      <StudentRegister students={getAllStudents()} sessions={getSessions()}
        universities={getUniversities()} programs={getPrograms()} />
    </div>
  );
}
