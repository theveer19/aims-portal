import PageHeader from "@/components/PageHeader";
import ProgramFeesTable from "@/components/ProgramFeesTable";
import { getProgramFees } from "@/lib/queries";

export default function ProgramFees() {
  const rows = getProgramFees();
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader crumb="Dashboard · University · Program Fees" title="Program Fees"
        desc="Fee assigned to each program by university and session. The admission form loads programs from this mapping."
        action={{ href: "/university/mapping/add", label: "+ Add Program Fee" }} />
      <ProgramFeesTable rows={rows} />
    </div>
  );
}
