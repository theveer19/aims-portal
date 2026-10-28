# AIMS Portal — College ERP (Next.js + JSON store)

Ayushi Welfare & Education Society, Bhind. A modern redesign of the old PHP
portal. Runs fully on localhost with **zero setup** — data is stored in a
plain JSON file (`data/aims.json`), created and seeded automatically on first
run. No database server and no native modules, so `npm install` works anywhere.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000

The first request creates `data/aims.json` and seeds starter data
(universities, programs, sessions, program fees, fee heads, and a couple of
sample students). To reset the data, stop the app and delete `data/aims.json`
— it will be recreated on the next run.

## What works (saved to the data file)

- **University** — add / edit / delete (`University → University`)
- **Program (course)** — add / edit / delete (`University → Program`)
- **Program Fees** — map a program to a university + session with a fee;
  add / edit fee / delete (`University → Program Fees`). The admission form
  loads programs from this mapping.
- **Student Admission** (`Students → Add Student`)
  - University → Session → only that university's programs (cascading)
  - Fee auto-filled from the program fee; Summer / Winter from the session
  - **Auto Student ID and Form Number** generated on save
  - Batch year, reference, Aadhaar / Samagra / ABC IDs, State → City address
- **Universal Search** — name / ID / form no / enrollment / mobile, live
- **Fees** — record an installment, auto **Total / Submitted / Remaining**,
  edit / delete a receipt, and **print a receipt**
- **Fee Heads** — add / enable / disable / delete (`Fees → Fee Heads`)
- **Ledger** — all collections in one register (`Fees → Ledger Book`)
- **Sessions** — two intakes per year, **January / July**; add / edit / delete
  a session as intake + year, e.g. *July 2025* (`University → Session`)
- **Cancel & Refund** — cancel an admission (reason + refund amount) from a
  student's Fees Detail; restore it later (`Students → Cancel`)
- **Reports** (`Reports`) — admissions, fees collected, pending, cancellations
  and refunds, with session-wise and university-wise breakdowns; filter by session

## Tech

- **Next.js 14** (App Router) + Tailwind CSS
- **Pure-JS JSON data store** (no database server, no native modules) —
  `lib/db.js` (store + seed), `lib/queries.js` (reads), `lib/actions.js`
  (server-action writes). Data persists to `data/aims.json`.
- To move to the cloud later (Neon Postgres / MySQL), swap the data layer;
  the pages and components stay the same.

## Notes

- Some master pages (Members, Area, Custom List, Library, Sundry Fees,
  Year/Semester) still use sample data and are next in line for the data store.
- See `DEPLOY.md` for how to put this online and share a link with the client.
