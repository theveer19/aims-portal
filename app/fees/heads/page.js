import PageHeader from "@/components/PageHeader";
import FeeHeadsManager from "@/components/FeeHeadsManager";
import { getFeeHeads } from "@/lib/queries";

export default function FeeHeads() {
  const heads = getFeeHeads().map((h) => ({ ...h, active: !!h.active }));
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader crumb="Dashboard · Fees · Fee Heads" title="Fee Heads"
        desc="Manage the fee types used in the Add Fees form — Admission Fees, Caution Money, Examination Fees, and more." />
      <FeeHeadsManager heads={heads} />
    </div>
  );
}
