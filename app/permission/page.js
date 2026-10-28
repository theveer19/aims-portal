"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import Icon from "@/components/Icon";

const modules = ["Dashboard", "University", "Students", "Fees", "Library", "Members", "Reports"];
const roles = ["Admin", "Accountant", "Counsellor", "Librarian"];

// default permissions matrix
const defaults = {
  Admin: Object.fromEntries(modules.map((m) => [m, true])),
  Accountant: { Dashboard: true, University: false, Students: true, Fees: true, Library: false, Members: false, Reports: true },
  Counsellor: { Dashboard: true, University: true, Students: true, Fees: false, Library: false, Members: false, Reports: false },
  Librarian: { Dashboard: true, University: false, Students: false, Fees: false, Library: true, Members: false, Reports: false },
};

export default function Permission() {
  const [role, setRole] = useState("Accountant");
  const [perms, setPerms] = useState(defaults);

  function toggle(mod) {
    if (role === "Admin") return; // admin sab allowed
    setPerms((p) => ({ ...p, [role]: { ...p[role], [mod]: !p[role][mod] } }));
  }

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader crumb="Dashboard · Permission" title="Roles & Permissions"
        desc="Set module access for each role. Enforced with NextAuth once the database is connected." />

      <div className="mb-4 flex flex-wrap gap-2">
        {roles.map((r) => (
          <button key={r} onClick={() => setRole(r)}
            className={`btn ${role === r ? "btn-primary" : "btn-ghost"}`}>{r}</button>
        ))}
      </div>

      <div className="card divide-y divide-slate-100">
        {modules.map((m) => {
          const on = perms[role][m];
          const locked = role === "Admin";
          return (
            <div key={m} className="flex items-center justify-between px-5 py-3.5">
              <div>
                <div className="text-sm font-medium text-ink">{m}</div>
                <div className="text-xs text-slate-400">{on ? "Access allowed" : "No access"}</div>
              </div>
              <button onClick={() => toggle(m)} disabled={locked}
                className={`relative h-6 w-11 rounded-full transition ${on ? "bg-brand-600" : "bg-slate-300"} ${locked ? "opacity-60" : ""}`}>
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${on ? "left-[22px]" : "left-0.5"}`} />
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex justify-end">
        <button className="btn-primary" onClick={() => alert("Permissions saved.")}><Icon name="save" /> Save Permissions</button>
      </div>
    </div>
  );
}
