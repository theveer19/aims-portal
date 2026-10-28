export default function DataTable({ columns, rows, empty = "No records found." }) {
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs uppercase text-slate-400">
              {columns.map((c) => (
                <th key={c.key} className={`px-4 py-2.5 first:pl-5 ${c.align === "right" ? "text-right" : ""}`}>{c.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr><td colSpan={columns.length} className="px-5 py-8 text-center text-slate-400">{empty}</td></tr>
            )}
            {rows.map((row, i) => (
              <tr key={row.id ?? i} className="border-b border-slate-50 hover:bg-slate-50/60">
                {columns.map((c) => (
                  <td key={c.key} className={`px-4 py-3 first:pl-5 ${c.align === "right" ? "text-right" : ""}`}>
                    {c.render ? c.render(row, i) : row[c.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Badge({ tone = "slate", children }) {
  const map = {
    slate: "bg-slate-100 text-slate-600",
    brand: "bg-brand-50 text-brand-700",
    green: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    rose: "bg-rose-50 text-rose-600",
    sky: "bg-sky-50 text-sky-700",
    violet: "bg-violet-50 text-violet-700",
  };
  return <span className={`badge ${map[tone]}`}>{children}</span>;
}
