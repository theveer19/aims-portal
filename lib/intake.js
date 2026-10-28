// Shared intake helpers (plain module — usable in server and client).
// Sessions use an intake label: "January" or "July". (Legacy summer/winter
// values are mapped so older data still displays correctly.)
export function intakeLabel(type) {
  const t = (type || "").toLowerCase();
  if (t === "january" || t === "winter") return "January";
  if (t === "july" || t === "summer") return "July";
  return type || "—";
}
export function isJuly(type) {
  const t = (type || "").toLowerCase();
  return t === "july" || t === "summer";
}
// tailwind tone for the intake badge
export function intakeTone(type) {
  return isJuly(type) ? "green" : "sky";
}
export const INTAKES = ["January", "July"];
export const MONTHS = ["January", "July"]; // the two admission intakes
