import PageHeader from "@/components/PageHeader";
import StudentsMove from "@/components/StudentsMove";
import { getAllStudents } from "@/lib/queries";

const YEARS = [
  { id: 1, name: "1st Year" }, { id: 2, name: "2nd Year" }, { id: 3, name: "3rd Year" },
  { id: 4, name: "Semester 1" }, { id: 5, name: "Semester 2" },
];

export default function StudentsMovePage() {
  const students = getAllStudents();
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader crumb="Dashboard · Students · Move" title="Students Move / Promote"
        desc="Promote selected students to the next year or semester." />
      <StudentsMove students={students} years={YEARS} />
    </div>
  );
}
