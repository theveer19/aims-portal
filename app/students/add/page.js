import StudentForm from "@/components/StudentForm";
import { getUniversities, getSessions } from "@/lib/queries";

export default function AddStudent() {
  const universities = getUniversities();
  const sessions = getSessions();
  return <StudentForm universities={universities} sessions={sessions} />;
}
