// Lightweight line-icon set (24x24, currentColor). Usage: <Icon name="plus" />
const P = {
  plus: "M12 5v14M5 12h14",
  save: "M5 3h11l3 3v15H5zM8 3v5h7M8 14h8v7H8z",
  edit: "M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z",
  trash: "M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14",
  printer: "M6 9V3h12v6M6 18H4v-6h16v6h-2M8 14h8v7H8z",
  search: "M11 4a7 7 0 105.29 12.29l3.71 3.71 1.41-1.41-3.71-3.71A7 7 0 0011 4z",
  back: "M15 18l-6-6 6-6",
  forward: "M9 6l6 6-6 6",
  check: "M20 6L9 17l-5-5",
  x: "M18 6L6 18M6 6l12 12",
  userPlus: "M15 12a4 4 0 10-4-4 4 4 0 004 4zm-9 8a6 6 0 0112 0M19 8v6M16 11h6",
  rupee: "M6 4h12M6 8h12M14 4c3 0 4 4 0 4H8l6 8",
  book: "M4 5a2 2 0 012-2h12v16H6a2 2 0 00-2 2z",
  users: "M9 11a3 3 0 100-6 3 3 0 000 6zm-6 8a6 6 0 0112 0M17 11a3 3 0 10-2-5m4 13a5 5 0 00-4-5",
  building: "M4 21V5a2 2 0 012-2h8a2 2 0 012 2v16M4 21h16M8 7h2M8 11h2M8 15h2",
  shield: "M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6z",
  list: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  refresh: "M21 12a9 9 0 11-3-6.7L21 8M21 3v5h-5",
  logout: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9",
  home: "M3 11l9-8 9 8M5 10v10h14V10",
  key: "M15 7a4 4 0 11-4 4l-6 6v2h2l1-1h2v-2h2l1-1a4 4 0 012-8z",
  grid: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  eye: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7zM12 9a3 3 0 100 6 3 3 0 000-6z",
  pin: "M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11zM12 12a2 2 0 100-4 2 2 0 000 4z",
  download: "M12 3v12m0 0l-4-4m4 4l4-4M5 21h14",
  arrowUp: "M12 19V5M5 12l7-7 7 7",
  filter: "M3 5h18l-7 8v6l-4-2v-4z",
  calendar: "M4 6a2 2 0 012-2h12a2 2 0 012 2v14H4zM4 9h16M8 3v4M16 3v4",
};

export default function Icon({ name, className = "h-4 w-4", strokeWidth = 1.8 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={P[name] || P.grid} />
    </svg>
  );
}
