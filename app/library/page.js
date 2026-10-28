"use client";
import { useState } from "react";
import Icon from "@/components/Icon";
import { books, bookIssues } from "@/lib/data";

export default function Library() {
  const [tab, setTab] = useState("books");
  const issuedCount = bookIssues.filter((i) => i.status !== "returned").length;
  const overdue = bookIssues.filter((i) => i.status === "overdue").length;

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-ink">Library Management</h1>
          <p className="text-sm text-slate-500">Books, issue & return</p>
        </div>
        <button className="btn-primary"><Icon name="plus" /> Add Book</button>
      </div>

      {/* stat cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat label="Total Titles" value={books.length} tone="bg-brand-50 text-brand-700" />
        <Stat label="Total Copies" value={books.reduce((a, b) => a + b.total, 0)} tone="bg-violet-50 text-violet-700" />
        <Stat label="Issued" value={issuedCount} tone="bg-amber-50 text-amber-700" />
        <Stat label="Overdue" value={overdue} tone="bg-rose-50 text-rose-700" />
      </div>

      {/* tabs */}
      <div className="flex gap-2 border-b border-slate-200">
        <Tab id="books" tab={tab} setTab={setTab}>Books ({books.length})</Tab>
        <Tab id="issues" tab={tab} setTab={setTab}>Issue / Return ({bookIssues.length})</Tab>
      </div>

      {tab === "books" ? (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs uppercase text-slate-400">
                <th className="px-5 py-2.5">Book ID</th><th>Title</th><th>Author</th>
                <th>Category</th><th>Available</th><th className="pr-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {books.map((b) => (
                <tr key={b.id} className="border-b border-slate-50">
                  <td className="px-5 py-3 font-mono text-xs text-slate-500">{b.id}</td>
                  <td className="font-medium text-ink">{b.title}<div className="text-xs text-slate-400">ISBN {b.isbn}</div></td>
                  <td className="text-slate-600">{b.author}</td>
                  <td><span className="badge bg-slate-100 text-slate-600">{b.category}</span></td>
                  <td>
                    <span className={`badge ${b.available === 0 ? "bg-rose-50 text-rose-600" : b.available <= 3 ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}>
                      {b.available} / {b.total}
                    </span>
                  </td>
                  <td className="pr-5 text-right">
                    <button disabled={b.available === 0}
                      className="btn-primary px-3 py-1.5 text-xs disabled:opacity-40"><Icon name="book" className="h-3.5 w-3.5" /> Issue</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs uppercase text-slate-400">
                <th className="px-5 py-2.5">Book</th><th>Student</th><th>Issued</th>
                <th>Due</th><th>Status</th><th className="pr-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookIssues.map((i) => (
                <tr key={i.id} className="border-b border-slate-50">
                  <td className="px-5 py-3 font-medium text-ink">{i.bookTitle}<div className="font-mono text-xs text-slate-400">{i.bookId}</div></td>
                  <td className="text-slate-600">{i.studentName}<div className="font-mono text-xs text-slate-400">{i.studentId}</div></td>
                  <td className="text-slate-600">{i.issueDate}</td>
                  <td className="text-slate-600">{i.dueDate}</td>
                  <td>
                    <span className={`badge ${
                      i.status === "returned" ? "bg-slate-100 text-slate-500"
                      : i.status === "overdue" ? "bg-rose-50 text-rose-600"
                      : "bg-emerald-50 text-emerald-700"}`}>
                      {i.status}
                    </span>
                  </td>
                  <td className="pr-5 text-right">
                    {i.status === "returned"
                      ? <span className="text-xs text-slate-400">—</span>
                      : <button className="btn-ghost px-3 py-1.5 text-xs"><Icon name="back" className="h-3.5 w-3.5" /> Return</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, tone }) {
  return (
    <div className="card p-4">
      <div className={`badge ${tone} mb-2`}>Live</div>
      <div className="text-2xl font-bold text-ink">{value}</div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  );
}
function Tab({ id, tab, setTab, children }) {
  return (
    <button onClick={() => setTab(id)}
      className={`-mb-px border-b-2 px-4 py-2 text-sm font-medium ${
        tab === id ? "border-brand-600 text-brand-700" : "border-transparent text-slate-500 hover:text-slate-700"}`}>
      {children}
    </button>
  );
}
