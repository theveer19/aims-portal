"use client";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";

export default function BackButton() {
  const router = useRouter();
  return (
    <button onClick={() => router.back()}
      className="inline-flex items-center gap-1.5 rounded-md bg-success-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-success-700">
      <Icon name="back" className="h-3.5 w-3.5" /> Back
    </button>
  );
}
