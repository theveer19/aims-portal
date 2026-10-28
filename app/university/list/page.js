import PageHeader from "@/components/PageHeader";
import UniversityTable from "@/components/UniversityTable";
import { getUniversities } from "@/lib/queries";

export default function UniversityList() {
  const universities = getUniversities();
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader crumb="Dashboard · University" title="All Universities"
        action={{ href: "/university/add", label: "+ Add University" }} />
      <UniversityTable rows={universities} />
    </div>
  );
}
