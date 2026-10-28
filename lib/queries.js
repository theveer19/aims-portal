import "server-only";
import { store } from "./db";

const byId = (arr, id) => arr.find((x) => String(x.id) === String(id));

// ---- Universities ----
export const getUniversities = () => [...store.universities].sort((a, b) => a.name.localeCompare(b.name));
export const getUniversity = (id) => byId(store.universities, id);

// ---- Programs ----
export const getPrograms = () =>
  [...store.programs]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((p) => ({ ...p, usedIn: store.programFees.filter((f) => f.programId === p.id).length }));

// Programs available for a university + session (from the mapping)
export function getProgramsFor(universityId, sessionId) {
  const uid = Number(universityId), sid = Number(sessionId);
  return store.programFees
    .filter((f) => f.universityId === uid && f.sessionId === sid)
    .map((f) => {
      const p = byId(store.programs, f.programId);
      return { id: p?.id, name: p?.name, fee: f.fee };
    })
    .filter((x) => x.id)
    .sort((a, b) => a.name.localeCompare(b.name));
}

// ---- Sessions ----
export const getSessions = () =>
  [...store.sessions].sort((a, b) => (a.name + a.type).localeCompare(b.name + b.type));

// ---- Program fees (mapping) with names ----
export const getProgramFees = () =>
  store.programFees.map((f) => ({
    id: f.id, fee: f.fee,
    university: byId(store.universities, f.universityId)?.name,
    program: byId(store.programs, f.programId)?.name,
    session: byId(store.sessions, f.sessionId)?.name,
    type: byId(store.sessions, f.sessionId)?.type,
  })).sort((a, b) => (a.university + a.session + a.program).localeCompare(b.university + b.session + b.program));

// ---- Fee heads ----
export const getFeeHeads = (onlyActive = false) =>
  store.feeHeads.filter((h) => (onlyActive ? h.active : true)).map((h) => ({ ...h, active: !!h.active }));

// ---- Students (joined + computed fees) ----
function joinStudent(s) {
  const submitted = store.feeReceipts.filter((r) => r.studentId === s.id).reduce((a, r) => a + r.mainFees, 0);
  return {
    ...s,
    university: byId(store.universities, s.universityId)?.name,
    program: byId(store.programs, s.programId)?.name,
    session: byId(store.sessions, s.sessionId)?.name,
    sessionType: byId(store.sessions, s.sessionId)?.type,
    submitted,
    dueFees: Math.max(s.totalFees - submitted, 0),
  };
}
const recent = (a, b) => (b.createdAt || "").localeCompare(a.createdAt || "") || (b.id > a.id ? 1 : -1);

export const getAllStudents = () => store.students.map(joinStudent).sort(recent);
export const getStudent = (id) => {
  const s = byId(store.students, id);
  return s ? joinStudent(s) : null;
};
export function searchStudents(q) {
  const term = (q || "").trim().toLowerCase();
  if (!term) return [];
  return store.students
    .filter((s) => [s.id, s.name, s.formNo, s.enrollmentNo, s.mobile, s.fatherName]
      .filter(Boolean).join(" ").toLowerCase().includes(term))
    .map(joinStudent).sort(recent);
}

// ---- Fees ----
export function getFeeDetail(studentId) {
  const student = getStudent(studentId);
  if (!student) return null;
  const receipts = store.feeReceipts.filter((r) => r.studentId === studentId).sort((a, b) => a.id - b.id);
  const totalSubmitted = receipts.reduce((a, r) => a + r.mainFees, 0);
  const submittedExtra = receipts.reduce((a, r) => a + r.otherFees, 0);
  return {
    student, receipts,
    summary: {
      totalFees: student.totalFees, totalSubmitted, submittedExtra,
      dueFees: Math.max(student.totalFees - totalSubmitted, 0),
    },
  };
}
export const getReceipt = (receiptNo) => store.feeReceipts.find((r) => r.receiptNo === receiptNo);

// ---- Dashboard counts ----
export const counts = () => ({
  universities: store.universities.length,
  programs: store.programs.length,
  sessions: store.sessions.length,
  programFees: store.programFees.length,
  students: store.students.length,
});

// ---- Ledger (all receipts joined) ----
export const getLedger = () =>
  store.feeReceipts.map((r) => {
    const st = byId(store.students, r.studentId);
    return {
      id: r.id, date: r.date, receiptNo: r.receiptNo, mode: r.mode,
      amount: r.mainFees + r.otherFees, mainFees: r.mainFees, otherFees: r.otherFees,
      name: st?.name || r.studentId, studentId: r.studentId,
      sessionId: st?.sessionId, session: byId(store.sessions, st?.sessionId)?.name,
      program: byId(store.programs, st?.programId)?.name,
      university: byId(store.universities, st?.universityId)?.name,
    };
  }).sort((a, b) => b.id - a.id);
