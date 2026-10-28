"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { stateList, citiesOf } from "@/lib/geo";
import { Field, Section, Upload } from "@/components/FormBits";
import Icon from "@/components/Icon";
import { addStudent } from "@/lib/actions";

const CATS = ["General", "OBC", "SC", "ST", "EWS"];
const RELIGIONS = ["Hindu", "Muslim", "Sikh", "Christian", "Jain", "Buddhist", "Other"];
const BLOOD = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
const navItems = [
  { id: "admission", label: "Admission" }, { id: "personal", label: "Personal" },
  { id: "ids", label: "Govt IDs" }, { id: "contact", label: "Contact & Address" },
  { id: "education", label: "Education" }, { id: "docs", label: "Documents" }, { id: "reference", label: "Reference" },
];

export default function StudentForm({ universities, sessions }) {
  const router = useRouter();
  const formRef = useRef(null);
  const [universityId, setUniversityId] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [programId, setProgramId] = useState("");
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fees, setFees] = useState("");
  const [sameAddr, setSameAddr] = useState(false);
  const [active, setActive] = useState("admission");
  const [pState, setPState] = useState("");
  const [pCity, setPCity] = useState("");
  const [permState, setPermState] = useState("");
  const [permCity, setPermCity] = useState("");
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setProgramId(""); setPrograms([]); setFees("");
    if (!universityId || !sessionId) return;
    setLoading(true);
    fetch(`/api/programs?university=${universityId}&session=${sessionId}`)
      .then((r) => r.json()).then(setPrograms).finally(() => setLoading(false));
  }, [universityId, sessionId]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" });
    navItems.forEach((n) => { const el = document.getElementById(n.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  function onProgram(e) {
    const id = e.target.value;
    setProgramId(id);
    const p = programs.find((x) => String(x.id) === id);
    setFees(p ? p.fee : "");
  }
  const selectedSession = useMemo(() => sessions.find((s) => String(s.id) === sessionId), [sessionId, sessions]);

  async function submit(e) {
    e.preventDefault();
    setErr(null);
    if (!universityId || !sessionId || !programId) {
      document.getElementById("admission")?.scrollIntoView({ behavior: "smooth" });
      setErr("University, Session and Program are required."); return;
    }
    const fd = new FormData(formRef.current);
    const g = (k) => (fd.get(k) || "").toString().trim();
    if (!g("name")) { setErr("Candidate name is required."); return; }
    setBusy(true);
    const res = await addStudent({
      universityId, sessionId, programId,
      name: g("name"), fatherName: g("fatherName"), motherName: g("motherName"),
      dob: g("dob"), gender: g("gender"), category: g("category"),
      aadhaar: g("aadhaar"), samagraId: g("samagraId"), abcId: g("abcId"),
      mobile: g("mobile"), email: g("email"),
      batchYear: g("batchYear"), reference: g("reference"),
      enrollmentNo: g("enrollmentNo"), formNo: g("formNo"),
      presentState: pState, presentCity: pCity,
      permanentState: sameAddr ? pState : permState, permanentCity: sameAddr ? pCity : permCity,
    });
    setBusy(false);
    if (res?.error) { setErr(res.error); return; }
    setSaved(res);
    window.scrollTo({ top: 0, behavior: "smooth" });
    router.refresh();
  }

  if (saved) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="card p-8 text-center">
          <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-emerald-50 text-2xl text-emerald-600">✓</div>
          <h1 className="text-lg font-semibold text-ink">Admission Saved</h1>
          <p className="mt-1 text-sm text-slate-500">Student has been added successfully.</p>
          <div className="mx-auto mt-4 max-w-xs space-y-1 text-sm">
            <div className="flex justify-between"><span className="text-slate-500">Student ID</span><b className="font-mono">{saved.id}</b></div>
            <div className="flex justify-between"><span className="text-slate-500">Form No</span><b className="font-mono">{saved.formNo}</b></div>
          </div>
          <div className="mt-6 flex justify-center gap-3">
            <Link href={`/fees/${saved.id}`} className="btn-primary"><Icon name="rupee" /> Collect Fees</Link>
            <button onClick={() => { setSaved(null); }} className="btn-ghost"><Icon name="userPlus" /> New Admission</button>
            <Link href="/students/search" className="btn-ghost"><Icon name="search" /> Search</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6">
        <div className="sectionbar">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M15 12a4 4 0 10-4-4 4 4 0 004 4zm-9 8a6 6 0 0112 0M19 8v6M16 11h6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <h1 className="text-base font-semibold">New Student Admission</h1>
          </div>
          <span className="badge bg-white/15 text-white">Session-based</span>
        </div>
        <div className="flex items-center justify-between rounded-b-lg border border-t-0 border-slate-200 bg-white px-5 py-2">
          <span className="crumb">Dashboard · Students · New Admission</span>
          <span className="text-xs text-slate-400">Enrollment number is assigned later — optional at admission</span>
        </div>
      </div>

      {err && <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-2 text-sm text-rose-700">{err}</div>}

      <div className="flex gap-6">
        <aside className="sticky top-24 hidden h-fit w-48 shrink-0 lg:block">
          <div className="card p-2">
            {navItems.map((n, i) => (
              <a key={n.id} href={`#${n.id}`}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${active === n.id ? "bg-brand-50 font-medium text-brand-700" : "text-slate-500 hover:bg-slate-50"}`}>
                <span className={`grid h-5 w-5 place-items-center rounded-full text-[10px] ${active === n.id ? "bg-brand-600 text-white" : "bg-slate-200 text-slate-500"}`}>{i + 1}</span>
                {n.label}
              </a>
            ))}
          </div>
        </aside>

        <form ref={formRef} onSubmit={submit} className="min-w-0 flex-1 space-y-6 pb-24">
          {/* 1. ADMISSION */}
          <Section id="admission" no="1" title="Admission Details" desc="Select University and Session to load the available programs">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="University" required>
                <select className="input" value={universityId} onChange={(e) => setUniversityId(e.target.value)}>
                  <option value="">-- Select University --</option>
                  {universities.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
                </select>
              </Field>
              <Field label="Session" required>
                <select className="input" value={sessionId} onChange={(e) => setSessionId(e.target.value)}>
                  <option value="">-- Select Session --</option>
                  {sessions.map((s) => <option key={s.id} value={s.id}>{s.name} ({s.type === "summer" ? "Summer ☀" : "Winter ❄"})</option>)}
                </select>
              </Field>
              <Field label="Program / Branch" required hint="(for this university + session)">
                <select className="input" value={programId} onChange={onProgram} disabled={!universityId || !sessionId || loading}>
                  <option value="">{loading ? "Loading programs…" : (!universityId || !sessionId) ? "Select University & Session first" : "-- Select Program --"}</option>
                  {programs.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
                {universityId && sessionId && !loading && programs.length === 0 && (
                  <p className="mt-1 text-xs text-amber-600">No program is mapped for this university and session.</p>
                )}
              </Field>
              <Field label="Student Fees" hint="(auto from program fee)">
                <input className="input" value={fees ? `₹ ${fees}` : ""} readOnly placeholder="auto on program select" />
              </Field>
              <Field label="Batch Year">
                <select name="batchYear" className="input" defaultValue="2025"><option>2025</option><option>2024</option><option>2023</option></select>
              </Field>
              <Field label="Reference Name" hint="(referred by)">
                <input name="reference" className="input" placeholder="Agent / faculty / student name" />
              </Field>
            </div>

            {selectedSession && (
              <div className="mt-4">
                <span className={`badge ${selectedSession.type === "summer" ? "bg-emerald-50 text-emerald-700" : "bg-sky-50 text-sky-700"}`}>
                  Admission type: {selectedSession.type === "summer" ? "☀ Summer" : "❄ Winter"} (from session)
                </span>
              </div>
            )}

            <details className="mt-4 rounded-lg border border-slate-200 bg-slate-50/50 px-4 py-3">
              <summary className="cursor-pointer text-sm font-medium text-slate-600">Office Use — fill later (optional)</summary>
              <div className="mt-3 grid gap-4 md:grid-cols-2">
                <Field label="Enrollment No" hint="(assigned later by university)"><input name="enrollmentNo" className="input" placeholder="Leave blank for now" /></Field>
                <Field label="Form No" hint="(auto if blank)"><input name="formNo" className="input" placeholder="auto or manual" /></Field>
              </div>
            </details>
          </Section>

          {/* 2. PERSONAL */}
          <Section id="personal" no="2" title="Personal Details">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Candidate Name" required>
                <div className="flex gap-2">
                  <select name="title" className="input w-24"><option>Mr.</option><option>Ms.</option><option>Mrs.</option></select>
                  <input name="name" className="input" placeholder="Full name" />
                </div>
              </Field>
              <Field label="Father's / Husband Name" required><input name="fatherName" className="input" /></Field>
              <Field label="Mother's Name"><input name="motherName" className="input" /></Field>
              <Field label="Date of Birth" required><input name="dob" type="date" className="input" /></Field>
              <Field label="Gender" required>
                <select name="gender" className="input"><option value="">-- Select --</option><option>Male</option><option>Female</option><option>Other</option></select>
              </Field>
              <Field label="Category" required>
                <select name="category" className="input"><option value="">-- Select --</option>{CATS.map((c) => <option key={c}>{c}</option>)}</select>
              </Field>
              <Field label="Religion">
                <select name="religion" className="input"><option value="">-- Select --</option>{RELIGIONS.map((r) => <option key={r}>{r}</option>)}</select>
              </Field>
              <Field label="Blood Group">
                <select name="blood" className="input"><option value="">-- Select --</option>{BLOOD.map((b) => <option key={b}>{b}</option>)}</select>
              </Field>
              <Field label="Nationality"><input name="nationality" className="input" defaultValue="Indian" /></Field>
            </div>
          </Section>

          {/* 3. GOVT IDs */}
          <Section id="ids" no="3" title="Identity / Government IDs" desc="Required for admission — Aadhaar, Samagra, ABC/APAAR ID">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Aadhaar Number" required hint="(12 digit)"><input name="aadhaar" className="input" inputMode="numeric" maxLength={12} placeholder="XXXX XXXX XXXX" /></Field>
              <Field label="Samagra ID" hint="(MP — 9 digit)"><input name="samagraId" className="input" inputMode="numeric" maxLength={9} placeholder="MP Samagra ID" /></Field>
              <Field label="ABC / APAAR ID" hint="(Academic Bank of Credits)"><input name="abcId" className="input" placeholder="12 digit ABC ID" /></Field>
              <Field label="PAN" hint="(optional)"><input name="pan" className="input uppercase" maxLength={10} placeholder="ABCDE1234F" /></Field>
            </div>
          </Section>

          {/* 4. CONTACT & ADDRESS */}
          <Section id="contact" no="4" title="Contact & Address">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Mobile No" required><input name="mobile" className="input" inputMode="numeric" maxLength={10} placeholder="10-digit" /></Field>
              <Field label="Alternate Mobile"><input name="mobile2" className="input" inputMode="numeric" maxLength={10} /></Field>
              <Field label="Email"><input name="email" type="email" className="input" placeholder="name@email.com" /></Field>
              <Field label="WhatsApp No"><input name="whatsapp" className="input" inputMode="numeric" maxLength={10} /></Field>
            </div>

            <div className="mt-5 border-t border-slate-100 pt-4">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Present Address</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Address" required className="md:col-span-2"><textarea name="presentAddress" className="input min-h-[70px]" /></Field>
                <Field label="State" required>
                  <select className="input" value={pState} onChange={(e) => { setPState(e.target.value); setPCity(""); }}>
                    <option value="">-- Select State --</option>
                    {stateList.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>
                <Field label="City" required>
                  <select className="input" value={pCity} onChange={(e) => setPCity(e.target.value)} disabled={!pState}>
                    <option value="">{pState ? "-- Select City --" : "Select state first"}</option>
                    {citiesOf(pState).map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="Pin Code" required><input name="presentPin" className="input" inputMode="numeric" maxLength={6} /></Field>
              </div>
            </div>

            <div className="mt-5 border-t border-slate-100 pt-4">
              <label className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-700">
                <input type="checkbox" checked={sameAddr} onChange={(e) => setSameAddr(e.target.checked)} />
                Permanent address is same as present address
              </label>
              {!sameAddr && (
                <>
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Permanent Address</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Address" className="md:col-span-2"><textarea name="permanentAddress" className="input min-h-[70px]" /></Field>
                    <Field label="State">
                      <select className="input" value={permState} onChange={(e) => { setPermState(e.target.value); setPermCity(""); }}>
                        <option value="">-- Select State --</option>
                        {stateList.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </Field>
                    <Field label="City">
                      <select className="input" value={permCity} onChange={(e) => setPermCity(e.target.value)} disabled={!permState}>
                        <option value="">{permState ? "-- Select City --" : "Select state first"}</option>
                        {citiesOf(permState).map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </Field>
                    <Field label="Pin Code"><input name="permanentPin" className="input" inputMode="numeric" maxLength={6} /></Field>
                  </div>
                </>
              )}
            </div>
          </Section>

          {/* 5. EDUCATION */}
          <Section id="education" no="5" title="Educational Qualification">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-left text-xs uppercase text-slate-400">
                    <th className="py-2 pr-3">Exam</th><th className="pr-3">Board / University</th><th className="pr-3">Year</th>
                    <th className="pr-3">Total</th><th className="pr-3">Obtained</th><th className="pr-3">%</th><th>Division</th>
                  </tr>
                </thead>
                <tbody>
                  {["High School (10th)", "Intermediate (12th)", "Graduation", "Other"].map((exam) => (
                    <tr key={exam} className="border-b border-slate-50">
                      <td className="py-2 pr-3 font-medium text-slate-600">{exam}</td>
                      <td className="pr-3"><input className="input" /></td>
                      <td className="pr-3"><input className="input w-20" inputMode="numeric" maxLength={4} /></td>
                      <td className="pr-3"><input className="input w-24" inputMode="numeric" /></td>
                      <td className="pr-3"><input className="input w-24" inputMode="numeric" /></td>
                      <td className="pr-3"><input className="input w-20" /></td>
                      <td><input className="input w-24" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          {/* 6. DOCUMENTS */}
          <Section id="docs" no="6" title="Documents Upload" desc="Photo, signature and required certificates">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Upload label="Passport Photo" required accept="image/*" />
              <Upload label="Signature" accept="image/*" />
              <Upload label="Aadhaar Card" /><Upload label="10th Marksheet" /><Upload label="12th Marksheet" />
              <Upload label="Transfer Certificate (TC)" /><Upload label="Migration Certificate" />
              <Upload label="Category Certificate" /><Upload label="Samagra ID Proof" />
            </div>
          </Section>

          {/* 7. REFERENCE */}
          <Section id="reference" no="7" title="Reference / Guardian">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Reference Person Name"><input name="refPerson" className="input" /></Field>
              <Field label="Relation"><input name="refRelation" className="input" placeholder="Father / Relative / Agent" /></Field>
              <Field label="Reference Mobile"><input name="refMobile" className="input" inputMode="numeric" maxLength={10} /></Field>
              <Field label="Local Guardian Address" className="md:col-span-2"><textarea name="guardianAddress" className="input min-h-[60px]" /></Field>
            </div>
          </Section>
        </form>
      </div>

      {/* sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-6 py-3">
          <span className="text-xs text-slate-400">Data is saved only when you click Save.</span>
          <div className="flex gap-3">
            <button type="button" className="btn-ghost" onClick={() => location.reload()}><Icon name="refresh" /> Reset</button>
            <button type="button" className="btn-primary" onClick={submit} disabled={busy}><Icon name="save" /> {busy ? "Saving…" : "Save Admission"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
