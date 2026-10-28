import "server-only";
import fs from "fs";
import path from "path";

// Zero-dependency JSON data store. No native modules — installs & runs anywhere.
// Data persists to data/aims.json (auto-created & seeded on first run).
const dataDir = path.join(process.cwd(), "data");
const dbPath = path.join(dataDir, "aims.json");

const globalForDb = globalThis;

function load() {
  try {
    if (fs.existsSync(dbPath)) return JSON.parse(fs.readFileSync(dbPath, "utf8"));
  } catch {}
  return seedData();
}

export const store = globalForDb.__aimsStore || load();
if (!globalForDb.__aimsStore) {
  globalForDb.__aimsStore = store;
  save();
}

export function save() {
  try {
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    fs.writeFileSync(dbPath, JSON.stringify(store, null, 2));
  } catch (e) {
    console.error("DB save failed:", e.message);
  }
}

// next auto-increment id for a collection
export function nextId(collection) {
  const rows = store[collection] || [];
  return rows.reduce((m, r) => Math.max(m, Number(r.id) || 0), 0) + 1;
}

function seedData() {
  const universities = [
    { id: 1, name: "MGCGV", code: "MGCGV", address: "Chitrakoot, Satna (MP)" },
    { id: 2, name: "Jiwaji University", code: "JIWAJI", address: "Gwalior (MP)" },
    { id: 3, name: "APS University Rewa", code: "APSU", address: "Rewa (MP)" },
  ];
  const programs = [
    { id: 1, name: "BA", type: "UG" }, { id: 2, name: "B.Com", type: "UG" },
    { id: 3, name: "B.Sc", type: "UG" }, { id: 4, name: "MA (Hindi)", type: "PG" },
    { id: 5, name: "MA (English)", type: "PG" }, { id: 6, name: "M.Com", type: "PG" },
    { id: 7, name: "BBA", type: "UG" }, { id: 8, name: "BCA", type: "UG" },
  ];
  const sessions = [
    { id: 1, name: "January 2025", type: "January" },
    { id: 2, name: "July 2025", type: "July" },
    { id: 3, name: "January 2026", type: "January" },
    { id: 4, name: "July 2026", type: "July" },
  ];
  const programFees = [
    { id: 1, universityId: 1, programId: 1, sessionId: 2, fee: 8000 },
    { id: 2, universityId: 1, programId: 2, sessionId: 2, fee: 9000 },
    { id: 3, universityId: 1, programId: 4, sessionId: 2, fee: 9500 },
    { id: 4, universityId: 1, programId: 1, sessionId: 1, fee: 8200 },
    { id: 5, universityId: 1, programId: 8, sessionId: 1, fee: 12000 },
    { id: 6, universityId: 2, programId: 3, sessionId: 2, fee: 11000 },
    { id: 7, universityId: 2, programId: 7, sessionId: 2, fee: 15000 },
    { id: 8, universityId: 2, programId: 8, sessionId: 2, fee: 16000 },
    { id: 9, universityId: 3, programId: 5, sessionId: 1, fee: 9500 },
    { id: 10, universityId: 3, programId: 6, sessionId: 1, fee: 10000 },
  ];
  const feeHeads = ["Admission Fees", "Registration Fees", "Examination Fees", "Tuition Fees",
    "University Development Fees", "College Development Fees", "Library Fees", "Application Form Fees",
    "Late Fees", "Extra Activity Fees", "Caution Money", "Other Fees"]
    .map((name, i) => ({ id: i + 1, name, active: 1 }));
  const students = [
    { id: "25Y10667", formNo: "S25MGCGV16", enrollmentNo: null, name: "Deepa Baghel", fatherName: "Ramesh Baghel", motherName: null, mobile: "9926201971", email: null, dob: null, gender: null, category: null, aadhaar: null, samagraId: null, abcId: null, presentState: "Madhya Pradesh", presentCity: "Bhind", permanentState: "Madhya Pradesh", permanentCity: "Bhind", batchYear: "2025", admissionType: "July", reference: "Walk-in", totalFees: 9500, universityId: 1, programId: 4, sessionId: 2, status: "active", refundAmount: 0, cancelReason: null, cancelDate: null, createdAt: "2025-07-01" },
    { id: "25Y10669", formNo: "S25JIW045", enrollmentNo: null, name: "Anjali Verma", fatherName: "Mohan Verma", motherName: null, mobile: "7000418227", email: null, dob: null, gender: null, category: null, aadhaar: null, samagraId: null, abcId: null, presentState: "Madhya Pradesh", presentCity: "Gwalior", permanentState: "Madhya Pradesh", permanentCity: "Gwalior", batchYear: "2025", admissionType: "July", reference: "Anuraag Sharma", totalFees: 15000, universityId: 2, programId: 7, sessionId: 2, status: "active", refundAmount: 0, cancelReason: null, cancelDate: null, createdAt: "2025-07-18" },
  ];
  const feeReceipts = [
    { id: 1, receiptNo: "AIMS/2025-26/264", studentId: "25Y10667", date: "28/07/2025", mainFees: 1000, otherFees: 0, mode: "Cash" },
    { id: 2, receiptNo: "AIMS/2025-26/885", studentId: "25Y10667", date: "25/09/2025", mainFees: 6000, otherFees: 0, mode: "Cash" },
  ];
  return { universities, programs, sessions, programFees, feeHeads, students, feeReceipts };
}
