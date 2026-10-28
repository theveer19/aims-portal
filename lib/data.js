// -----------------------------------------------------------------------------
// MOCK DATA (replace with Prisma + MySQL later)
// Shows how the session <-> program mapping works.
// -----------------------------------------------------------------------------

export const universities = [
  { id: 1, name: "MGCGV", code: "MGCGV", address: "Chitrakoot, Satna (MP)" },
  { id: 2, name: "Jiwaji University", code: "JIWAJI", address: "Gwalior (MP)" },
  { id: 3, name: "APS University Rewa", code: "APSU", address: "Rewa (MP)" },
];

export const programs = [
  { id: 1, name: "BA" },
  { id: 2, name: "B.Com" },
  { id: 3, name: "B.Sc" },
  { id: 4, name: "MA (Hindi)" },
  { id: 5, name: "MA (English)" },
  { id: 6, name: "M.Com" },
  { id: 7, name: "BBA" },
  { id: 8, name: "BCA" },
];

export const sessions = [
  { id: 1, name: "2024-25", type: "summer" },
  { id: 2, name: "2024-25", type: "winter" },
  { id: 3, name: "2025-26", type: "summer" },
  { id: 4, name: "2025-26", type: "winter" },
];

// ---- CORE MAPPING ------------------------------------------------------------
// Each university has only certain programs active per session.
// The admission dropdown is filtered from this table. { universityId, sessionId, programId, fees }
export const universityProgramSession = [
  // MGCGV -> 2025-26 summer
  { universityId: 1, sessionId: 3, programId: 1, fees: 8000 },  // BA
  { universityId: 1, sessionId: 3, programId: 2, fees: 9000 },  // B.Com
  { universityId: 1, sessionId: 3, programId: 4, fees: 9500 },  // MA Hindi
  // MGCGV -> 2025-26 winter
  { universityId: 1, sessionId: 4, programId: 1, fees: 8200 },
  { universityId: 1, sessionId: 4, programId: 8, fees: 12000 }, // BCA
  // Jiwaji -> 2025-26 summer
  { universityId: 2, sessionId: 3, programId: 3, fees: 11000 }, // B.Sc
  { universityId: 2, sessionId: 3, programId: 7, fees: 15000 }, // BBA
  { universityId: 2, sessionId: 3, programId: 8, fees: 16000 }, // BCA
  // APSU -> 2025-26 winter
  { universityId: 3, sessionId: 4, programId: 5, fees: 9500 },  // MA English
  { universityId: 3, sessionId: 4, programId: 6, fees: 10000 }, // M.Com
  // older 2024-25 data
  { universityId: 1, sessionId: 1, programId: 1, fees: 7500 },
  { universityId: 2, sessionId: 2, programId: 7, fees: 14000 },
];

// Students of both admission types, for testing universal search
export const students = [
  { id: "25Y10667", formNo: "S25MGCGV16", enrollmentNo: "EN2025A0091", name: "Deepa Baghel", fatherName: "Ramesh Baghel", mobile: "9926201971", university: "MGCGV", program: "MA (Hindi)", session: "2025-26", admissionType: "summer", totalFees: 9500, dueFees: 500 },
  { id: "25Y10668", formNo: "W25MGCGV02", enrollmentNo: "EN2025B0132", name: "Rahul Sharma", fatherName: "Suresh Sharma", mobile: "9827011223", university: "MGCGV", program: "BCA", session: "2025-26", admissionType: "winter", totalFees: 12000, dueFees: 4000 },
  { id: "25Y10669", formNo: "S25JIW045", enrollmentNo: "EN2025C0210", name: "Anjali Verma", fatherName: "Mohan Verma", mobile: "7000418227", university: "Jiwaji University", program: "BBA", session: "2025-26", admissionType: "summer", totalFees: 15000, dueFees: 0 },
  { id: "25Y10670", formNo: "W25APSU011", enrollmentNo: "EN2025D0301", name: "Vikas Yadav", fatherName: "Dinesh Yadav", mobile: "9098765432", university: "APS University Rewa", program: "M.Com", session: "2025-26", admissionType: "winter", totalFees: 10000, dueFees: 2500 },
  { id: "24Y10412", formNo: "S24MGCGV88", enrollmentNo: "EN2024A0044", name: "Priya Jain", fatherName: "Ashok Jain", mobile: "8109933221", university: "MGCGV", program: "BA", session: "2024-25", admissionType: "summer", totalFees: 7500, dueFees: 0 },
];

// Helper: get active programs for a university + session
export function getProgramsFor(universityId, sessionId) {
  const uid = Number(universityId);
  const sid = Number(sessionId);
  const allowedIds = universityProgramSession
    .filter((m) => m.universityId === uid && m.sessionId === sid)
    .map((m) => ({ programId: m.programId, fees: m.fees }));
  return allowedIds.map((a) => {
    const p = programs.find((x) => x.id === a.programId);
    return { id: p.id, name: p.name, fees: a.fees };
  });
}

// Helper: universal search (both summer and winter, any field)
export function searchStudents(q) {
  const term = (q || "").trim().toLowerCase();
  if (!term) return [];
  return students.filter((s) =>
    [s.id, s.name, s.enrollmentNo, s.formNo, s.mobile, s.fatherName]
      .join(" ")
      .toLowerCase()
      .includes(term)
  );
}

// -----------------------------------------------------------------------------
// FEES (MySQL later: fee_receipts, fee_heads tables)
// -----------------------------------------------------------------------------

// The 12 fee heads used in the Add Fees form
export const feeHeads = [
  "Admission Fees",
  "Registration Fees",
  "Examination Fees",
  "Tuition Fees",
  "University Development Fees",
  "College Development Fees",
  "Library Fees",
  "Application Form Fees",
  "Late Fees",
  "Extra Activity Fees",
  "Caution Money",
  "Other Fees",
];

// Installments (receipts) paid by each student
export const feeReceipts = {
  "25Y10667": [
    { receiptNo: "AIMS/2025-26/264", date: "28/05/2025", mainFees: 1000, otherFees: 0, mode: "Cash" },
    { receiptNo: "AIMS/2025-26/885", date: "25/09/2025", mainFees: 6000, otherFees: 0, mode: "Cash" },
    { receiptNo: "AIMS/2025-26/1377", date: "20/03/2026", mainFees: 2000, otherFees: 0, mode: "Cheque" },
  ],
  "25Y10668": [
    { receiptNo: "AIMS/2025-26/301", date: "12/06/2025", mainFees: 5000, otherFees: 0, mode: "Cash" },
    { receiptNo: "AIMS/2025-26/990", date: "05/11/2025", mainFees: 3000, otherFees: 500, mode: "DD" },
  ],
  "25Y10669": [
    { receiptNo: "AIMS/2025-26/410", date: "18/06/2025", mainFees: 15000, otherFees: 0, mode: "Cash" },
  ],
  "25Y10670": [
    { receiptNo: "AIMS/2025-26/512", date: "22/07/2025", mainFees: 7500, otherFees: 0, mode: "Cash" },
  ],
  "24Y10412": [
    { receiptNo: "AIMS/2024-25/120", date: "10/06/2024", mainFees: 7500, otherFees: 0, mode: "Cash" },
  ],
};

// Year / Semester master
export const years = [
  { id: 1, name: "1st Year" }, { id: 2, name: "2nd Year" }, { id: 3, name: "3rd Year" },
  { id: 4, name: "Semester 1" }, { id: 5, name: "Semester 2" },
];

// Member / Staff management
export const members = [
  { id: "EMP-01", name: "Nishi Gupta", role: "Director", department: "Administration", mobile: "9926201971", status: "active" },
  { id: "EMP-02", name: "Sanjeev Gupta", role: "Admin", department: "Accounts", mobile: "9827011200", status: "active" },
  { id: "EMP-03", name: "Anuraag Sharma", role: "Faculty", department: "Computer Science", mobile: "9098712345", status: "active" },
  { id: "EMP-04", name: "Pooja Rathore", role: "Counsellor", department: "Admission", mobile: "8109900112", status: "active" },
  { id: "EMP-05", name: "Rakesh Yadav", role: "Librarian", department: "Library", mobile: "7000455667", status: "inactive" },
];

// Area master (city / zone)
export const areas = [
  { id: 1, name: "Bhind City", district: "Bhind", state: "Madhya Pradesh", pin: "477001" },
  { id: 2, name: "Gohad", district: "Bhind", state: "Madhya Pradesh", pin: "477116" },
  { id: 3, name: "Mehgaon", district: "Bhind", state: "Madhya Pradesh", pin: "477557" },
  { id: 4, name: "Lahar", district: "Bhind", state: "Madhya Pradesh", pin: "477445" },
  { id: 5, name: "Gwalior", district: "Gwalior", state: "Madhya Pradesh", pin: "474001" },
];

// Extra student status data (move / cancel / new arrivals) — overlays the students array
export const studentFlags = {
  "25Y10668": { status: "new" },      // new arrival
  "25Y10670": { status: "cancelled", reason: "Non-payment of fees", cancelDate: "12/08/2026" },
  "24Y10412": { status: "promoted", promotedTo: "2nd Year" },
};

// Helper: get a single receipt (for the printable receipt)
export function getReceipt(studentId, receiptNo) {
  const student = students.find((s) => s.id === studentId);
  const receipt = (feeReceipts[studentId] || []).find(
    (r) => r.receiptNo === decodeURIComponent(receiptNo)
  );
  if (!student || !receipt) return null;
  return { student, receipt };
}

// -----------------------------------------------------------------------------
// LIBRARY (MySQL later: books, book_issues tables)
// -----------------------------------------------------------------------------
export const books = [
  { id: "BK-001", title: "Higher Algebra", author: "Hall & Knight", isbn: "9788121924177", category: "Mathematics", total: 12, available: 8 },
  { id: "BK-002", title: "Indian Polity", author: "M. Laxmikanth", isbn: "9789390309474", category: "Political Science", total: 20, available: 5 },
  { id: "BK-003", title: "Let Us C", author: "Yashavant Kanetkar", isbn: "9788183331630", category: "Computer Science", total: 15, available: 15 },
  { id: "BK-004", title: "Hindi Sahitya Ka Itihas", author: "Ramchandra Shukla", isbn: "9788126725434", category: "Hindi", total: 10, available: 3 },
  { id: "BK-005", title: "Principles of Economics", author: "N. Gregory Mankiw", isbn: "9788131518564", category: "Commerce", total: 8, available: 0 },
];

export const bookIssues = [
  { id: 1, bookId: "BK-002", bookTitle: "Indian Polity", studentId: "25Y10669", studentName: "Anjali Verma", issueDate: "01/08/2026", dueDate: "15/08/2026", status: "issued" },
  { id: 2, bookId: "BK-004", bookTitle: "Hindi Sahitya Ka Itihas", studentId: "25Y10667", studentName: "Deepa Baghel", issueDate: "20/07/2026", dueDate: "03/08/2026", status: "overdue" },
  { id: 3, bookId: "BK-001", bookTitle: "Higher Algebra", studentId: "25Y10668", studentName: "Rahul Sharma", issueDate: "28/08/2026", dueDate: "11/09/2026", status: "issued" },
  { id: 4, bookId: "BK-003", bookTitle: "Let Us C", studentId: "24Y10412", studentName: "Priya Jain", issueDate: "10/07/2026", dueDate: "24/07/2026", status: "returned" },
];

// Helper: full fee detail for a student (summary + installments)
export function getFeesForStudent(studentId) {
  const student = students.find((s) => s.id === studentId);
  if (!student) return null;
  const receipts = feeReceipts[studentId] || [];
  const submittedMain = receipts.reduce((a, r) => a + r.mainFees, 0);
  const submittedOther = receipts.reduce((a, r) => a + r.otherFees, 0);
  const totalSubmitted = submittedMain; // total of main fees paid
  const dueFees = Math.max(student.totalFees - totalSubmitted, 0);
  return {
    student,
    receipts,
    summary: {
      totalFees: student.totalFees,
      totalSubmitted,
      submittedExtra: submittedOther,
      dueFees,
    },
  };
}
