import PageHeader from "@/components/PageHeader";
import CollectionReport from "@/components/reports/CollectionReport";
import { getLedger, getSessions } from "@/lib/queries";

export default function CollectionPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader crumb="Dashboard · Reports · Collection" title="Fee Collection Report" icon="rupee"
        desc="All fee receipts — date-wise collection. Filter by session / mode and print." />
      <CollectionReport ledger={getLedger()} sessions={getSessions()} />
    </div>
  );
}
