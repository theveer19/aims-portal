"use client";
import Icon from "@/components/Icon";
export default function PrintButton() {
  return (
    <button onClick={() => window.print()} className="btn-primary">
      <Icon name="printer" /> Print Receipt
    </button>
  );
}
