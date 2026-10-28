"use server";
import { store, save, nextId } from "./db";
import { revalidatePath } from "next/cache";

const byId = (arr, id) => arr.find((x) => String(x.id) === String(id));

// ---------------- University ----------------
export async function addUniversity(form) {
  const { name, code, address } = form;
  if (!name || !code) return { error: "Name and code are required." };
  if (store.universities.some((u) => u.code.toLowerCase() === code.toLowerCase()))
    return { error: "This code already exists." };
  store.universities.push({ id: nextId("universities"), name, code: code.toUpperCase(), address: address || "" });
  save();
  revalidatePath("/university"); revalidatePath("/university/list");
  return { ok: true };
}
export async function updateUniversity(id, form) {
  const u = byId(store.universities, id);
  if (u) { u.name = form.name; u.code = form.code.toUpperCase(); u.address = form.address || ""; save(); }
  revalidatePath("/university/list");
  return { ok: true };
}
export async function deleteUniversity(id) {
  id = Number(id);
  store.universities = store.universities.filter((u) => u.id !== id);
  store.programFees = store.programFees.filter((f) => f.universityId !== id);
  save();
  revalidatePath("/university/list"); revalidatePath("/university/mapping");
  return { ok: true };
}

// ---------------- Program ----------------
export async function addProgram(form) {
  if (!form.name) return { error: "Program name is required." };
  store.programs.push({ id: nextId("programs"), name: form.name, code: form.code || "", type: form.type || "", duration: form.duration || "" });
  save();
  revalidatePath("/university/programs");
  return { ok: true };
}
export async function updateProgram(id, form) {
  const p = byId(store.programs, id);
  if (p) { p.name = form.name; p.code = form.code || ""; p.type = form.type || ""; p.duration = form.duration || ""; save(); }
  revalidatePath("/university/programs");
  return { ok: true };
}
export async function deleteProgram(id) {
  id = Number(id);
  store.programs = store.programs.filter((p) => p.id !== id);
  store.programFees = store.programFees.filter((f) => f.programId !== id);
  save();
  revalidatePath("/university/programs"); revalidatePath("/university/mapping");
  return { ok: true };
}

// ---------------- Program fee (mapping) ----------------
export async function addProgramFee(form) {
  const { universityId, programId, sessionId, fee } = form;
  if (!universityId || !programId || !sessionId || !fee) return { error: "All fields are required." };
  const uid = Number(universityId), pid = Number(programId), sid = Number(sessionId);
  if (store.programFees.some((f) => f.universityId === uid && f.programId === pid && f.sessionId === sid))
    return { error: "This program is already mapped for that university & session." };
  store.programFees.push({ id: nextId("programFees"), universityId: uid, programId: pid, sessionId: sid, fee: Number(fee) });
  save();
  revalidatePath("/university/mapping");
  return { ok: true };
}
export async function updateProgramFee(id, fee) {
  const f = byId(store.programFees, id);
  if (f) { f.fee = Number(fee); save(); }
  revalidatePath("/university/mapping");
  return { ok: true };
}
export async function deleteProgramFee(id) {
  id = Number(id);
  store.programFees = store.programFees.filter((f) => f.id !== id);
  save();
  revalidatePath("/university/mapping");
  return { ok: true };
}

// ---------------- Fee heads ----------------
export async function addFeeHead(name) {
  if (!name?.trim()) return { error: "Name required." };
  if (store.feeHeads.some((h) => h.name.toLowerCase() === name.trim().toLowerCase()))
    return { error: "Already exists." };
  store.feeHeads.push({ id: nextId("feeHeads"), name: name.trim(), active: 1 });
  save();
  revalidatePath("/fees/heads");
  return { ok: true };
}
export async function toggleFeeHead(id) {
  const h = byId(store.feeHeads, id);
  if (h) { h.active = h.active ? 0 : 1; save(); }
  revalidatePath("/fees/heads");
  return { ok: true };
}
export async function deleteFeeHead(id) {
  id = Number(id);
  store.feeHeads = store.feeHeads.filter((h) => h.id !== id);
  save();
  revalidatePath("/fees/heads");
  return { ok: true };
}

// ---------------- Student admission ----------------
function nextStudentCode() {
  const yr = String(new Date().getFullYear()).slice(2);
  return `${yr}Y${10001 + store.students.length}`;
}
function nextFormNo(uniCode, type) {
  const yr = String(new Date().getFullYear()).slice(2);
  const prefix = type === "winter" ? "W" : "S";
  const c = store.students.length + 1;
  return `${prefix}${yr}${(uniCode || "ADM").slice(0, 6)}${String(c).padStart(3, "0")}`;
}

export async function addStudent(form) {
  const { universityId, sessionId, programId } = form;
  if (!universityId || !sessionId || !programId) return { error: "University, Session and Program are required." };
  if (!form.name) return { error: "Candidate name is required." };

  const uni = byId(store.universities, universityId);
  const sess = byId(store.sessions, sessionId);
  const pf = store.programFees.find((f) => f.universityId === Number(universityId) && f.programId === Number(programId) && f.sessionId === Number(sessionId));

  const id = nextStudentCode();
  const formNo = form.formNo?.trim() || nextFormNo(uni?.code, sess?.type);

  store.students.push({
    id, formNo, enrollmentNo: form.enrollmentNo || null,
    name: form.name, fatherName: form.fatherName || null, motherName: form.motherName || null,
    mobile: form.mobile || null, email: form.email || null, dob: form.dob || null,
    gender: form.gender || null, category: form.category || null,
    aadhaar: form.aadhaar || null, samagraId: form.samagraId || null, abcId: form.abcId || null,
    presentState: form.presentState || null, presentCity: form.presentCity || null,
    permanentState: form.permanentState || null, permanentCity: form.permanentCity || null,
    batchYear: form.batchYear || null, admissionType: sess?.type || "summer",
    reference: form.reference || null,
    totalFees: pf ? pf.fee : Number(form.totalFees || 0),
    universityId: Number(universityId), programId: Number(programId), sessionId: Number(sessionId),
    status: "active", createdAt: new Date().toISOString().slice(0, 10),
  });
  save();
  revalidatePath("/students"); revalidatePath("/students/search");
  return { ok: true, id, formNo };
}

// ---------------- Fees ----------------
function nextReceiptNo() {
  const now = new Date();
  const fy = now.getMonth() >= 3 ? `${now.getFullYear()}-${String(now.getFullYear() + 1).slice(2)}`
                                 : `${now.getFullYear() - 1}-${String(now.getFullYear()).slice(2)}`;
  return `AIMS/${fy}/${1000 + store.feeReceipts.length + 1}`;
}

export async function addFee(studentId, { mainFees, otherFees, mode, date }) {
  const main = Number(mainFees || 0), other = Number(otherFees || 0);
  if (main + other <= 0) return { error: "Enter an amount." };
  const receiptNo = nextReceiptNo();
  const d = date || new Date().toLocaleDateString("en-GB");
  store.feeReceipts.push({ id: nextId("feeReceipts"), receiptNo, studentId, date: d, mainFees: main, otherFees: other, mode: mode || "Cash" });
  save();
  revalidatePath(`/fees/${studentId}`);
  return { ok: true, receiptNo };
}
export async function updateFee(id, studentId, { mainFees, otherFees }) {
  const r = byId(store.feeReceipts, id);
  if (r) { r.mainFees = Number(mainFees || 0); r.otherFees = Number(otherFees || 0); save(); }
  revalidatePath(`/fees/${studentId}`);
  return { ok: true };
}
export async function deleteFee(id, studentId) {
  id = Number(id);
  store.feeReceipts = store.feeReceipts.filter((r) => r.id !== id);
  save();
  revalidatePath(`/fees/${studentId}`);
  return { ok: true };
}
