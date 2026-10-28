"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Icon from "@/components/Icon";

export default function Topbar() {
  const router = useRouter();
  const [q, setQ] = useState("");
  function go(e) {
    e.preventDefault();
    if (q.trim()) router.push(`/students/search?q=${encodeURIComponent(q.trim())}`);
  }

  return (
    <header className="no-print sticky top-0 z-10 border-b-2 border-brand-600 bg-white">
      <div className="flex items-center gap-4 px-5 py-3">
        <Link href="/dashboard" className="flex items-center gap-3">
          <span className="rounded bg-brand-600 px-2 py-1 text-xl font-extrabold italic leading-none text-white shadow-sm">AIMS</span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-bold tracking-wide text-slate-800">AYUSHI WELFARE AND EDUCATION SOCIETY</span>
            <span className="block text-[11px] text-slate-500">Bhind (M.P.)</span>
          </span>
        </Link>

        <form onSubmit={go} className="relative ml-4 hidden w-full max-w-xs md:block">
          <Icon name="search" className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search student…"
            className="w-full rounded-md border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100" />
        </form>

        <nav className="ml-auto flex items-center gap-1 text-sm">
          <Link href="/dashboard" className="inline-flex items-center gap-1.5 rounded px-3 py-1.5 text-slate-600 hover:bg-slate-100">
            <Icon name="home" className="h-4 w-4" /> <span className="hidden sm:inline">Home</span>
          </Link>
          <button className="inline-flex items-center gap-1.5 rounded px-3 py-1.5 text-slate-600 hover:bg-slate-100">
            <Icon name="key" className="h-4 w-4" /> <span className="hidden sm:inline">Change Password</span>
          </button>
          <button className="inline-flex items-center gap-1.5 rounded px-3 py-1.5 font-medium text-brand-600 hover:bg-brand-50">
            <Icon name="logout" className="h-4 w-4" /> <span className="hidden sm:inline">Logout</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
