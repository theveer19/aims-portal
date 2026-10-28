import PageHeader from "@/components/PageHeader";
import SessionsManager from "@/components/SessionsManager";
import { getSessions } from "@/lib/queries";

export default function Sessions() {
  const sessions = getSessions();
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader crumb="Dashboard · University · Session" title="Session Master"
        desc="Two intakes each year — January and July. Add a session as intake + year (e.g. July 2025)." />
      <SessionsManager sessions={sessions} />
    </div>
  );
}
