"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const groups = [
  { label: "Dashboard", href: "/dashboard", icon: "grid" },
  {
    label: "University / Program", icon: "building", children: [
      { href: "/university", label: "Dashboard" },
      { href: "/university/list", label: "University" },
      { href: "/university/programs", label: "Program" },
      { href: "/university/mapping", label: "Program Fees" },
      { href: "/university/sessions", label: "Session" },
      { href: "/university/years", label: "Year / Semester" },
      { href: "/university/add", label: "Add University" },
    ],
  },
  { label: "Member Management", href: "/members", icon: "users" },
  {
    label: "Students Master", icon: "user-plus", children: [
      { href: "/students", label: "Students Dashboard" },
      { href: "/students/search", label: "Search Students" },
      { href: "/students/add", label: "Add Student" },
      { href: "/students/move", label: "Students Move" },
      { href: "/students/cancel", label: "Students Cancel" },
      { href: "/students/new-arrivals", label: "New Arrivals" },
      { href: "/students/summary", label: "Students Summary" },
    ],
  },
  { label: "Library", href: "/library", icon: "book" },
  {
    label: "Fees Master", icon: "rupee", children: [
      { href: "/fees", label: "Search Fees" },
      { href: "/fees/heads", label: "Fee Heads" },
      { href: "/fees/sundry", label: "Sundry Fees" },
      { href: "/fees/ledger", label: "Ledger Book" },
    ],
  },
  { label: "Area", href: "/area", icon: "pin" },
  { label: "Reports", href: "/reports", icon: "list" },
  { label: "Permission", href: "/permission", icon: "shield" },
  { label: "Custom List", href: "/custom", icon: "list" },
];

function Icon({ name }) {
  const p = {
    grid: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
    building: "M4 21V5a2 2 0 012-2h8a2 2 0 012 2v16M4 21h16M8 7h2M8 11h2M8 15h2",
    users: "M9 11a3 3 0 100-6 3 3 0 000 6zm-6 8a6 6 0 0112 0M17 11a3 3 0 10-2-5m4 13a5 5 0 00-4-5",
    "user-plus": "M15 12a4 4 0 10-4-4 4 4 0 004 4zm-9 8a6 6 0 0112 0M19 8v6M16 11h6",
    book: "M4 5a2 2 0 012-2h12v16H6a2 2 0 00-2 2z",
    rupee: "M6 4h12M6 8h12M14 4c3 0 4 4 0 4H8l6 8",
    pin: "M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11zM12 12a2 2 0 100-4 2 2 0 000 4z",
    shield: "M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6z",
    list: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d={p[name] || p.grid} />
    </svg>
  );
}

export default function Sidebar() {
  const path = usePathname();
  const activeGroup = groups.findIndex(
    (g) => g.children?.some((c) => c.href === path)
  );
  const [open, setOpen] = useState(() => (activeGroup >= 0 ? { [activeGroup]: true } : {}));

  return (
    <aside className="no-print sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-sidebar text-slate-200 md:flex">
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-brand-600 text-lg font-extrabold italic text-white">A</div>
        <div className="leading-tight">
          <div className="text-sm font-semibold text-white">AIMS Portal</div>
          <div className="text-[11px] text-slate-400">Ayushi Welfare & Edu.</div>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-2.5 py-3">
        {groups.map((g, i) => {
          if (!g.children) {
            const active = path === g.href;
            return (
              <Link key={g.label} href={g.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition ${
                  active ? "bg-brand-600 text-white" : "text-slate-300 hover:bg-sidebar-hover hover:text-white"}`}>
                <Icon name={g.icon} /> {g.label}
              </Link>
            );
          }
          const isOpen = open[i];
          const hasActive = g.children.some((c) => c.href === path);
          return (
            <div key={g.label}>
              <button onClick={() => setOpen((o) => ({ ...o, [i]: !o[i] }))}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition ${
                  hasActive ? "bg-sidebar-hover text-white" : "text-slate-300 hover:bg-sidebar-hover hover:text-white"}`}>
                <Icon name={g.icon} /> {g.label}
                <svg viewBox="0 0 24 24" className={`ml-auto h-4 w-4 transition ${isOpen ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
              </button>
              {isOpen && (
                <div className="mb-1 ml-5 mt-0.5 space-y-0.5 border-l border-white/10 pl-2">
                  {g.children.map((c) => (
                    <Link key={c.href} href={c.href}
                      className={`block rounded-md px-3 py-1.5 text-[13px] transition ${
                        path === c.href ? "bg-brand-600 font-medium text-white" : "text-slate-400 hover:bg-sidebar-hover hover:text-white"}`}>
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
