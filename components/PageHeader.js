import Link from "next/link";
import BackButton from "@/components/BackButton";
import Icon from "@/components/Icon";

export default function PageHeader({ crumb, title, desc, action, icon = "home" }) {
  const label = action ? action.label.replace(/^\+\s*/, "") : "";
  return (
    <div className="mb-5">
      <div className="sectionbar">
        <div className="flex items-center gap-2">
          <Icon name={icon} className="h-5 w-5" />
          <h1 className="text-base font-semibold">{title}</h1>
        </div>
        {action && (
          <Link href={action.href} className="btn-primary px-3 py-1.5 text-xs">
            <Icon name={action.icon || "plus"} className="h-3.5 w-3.5" /> {label}
          </Link>
        )}
      </div>
      <div className="flex items-center justify-between rounded-b-lg border border-t-0 border-slate-200 bg-white px-5 py-2">
        <span className="crumb">{crumb}</span>
        <BackButton />
      </div>
      {desc && <p className="mt-3 px-1 text-sm text-slate-500">{desc}</p>}
    </div>
  );
}
