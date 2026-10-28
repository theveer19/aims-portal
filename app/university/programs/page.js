import PageHeader from "@/components/PageHeader";
import ProgramsTable from "@/components/ProgramsTable";
import { getPrograms } from "@/lib/queries";

export default function Programs() {
  const rows = getPrograms();
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader crumb="Dashboard · University · Program" title="Program Master"
        action={{ href: "/university/programs/add", label: "+ Add Program" }} />
      <ProgramsTable rows={rows} />
    </div>
  );
}
