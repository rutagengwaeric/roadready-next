"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Question {
  id: number;
  title: string;
  options: string[];
  correctAnswer: number;
  img?: string;
}

interface TestClientProps {
  testType: "tests" | "keywords";
  testNumber: number;
  existing: {
    questions: string;
    marks: string;
    startTestNumber: number;
    stopTestNumber: number;
    signStartTestN: number;
    signStopTestN: number;
  } | null;
}

type Phase = "loading" | "question" | "result";

export default function TestClient({ testType, testNumber, existing }: TestClientProps) {
  const router = useRouter();
  const isTests = testType === "tests";
  const numQ = isTests ? 20 : 5;
  const passScore = isTests ? 12 : 3;
  const accentColor = isTests ? "#4f46e5" : "#10b981";
  const accentLight = isTests ? "#eef2ff" : "#ecfdf5";

  const [questions, setQuestions] = useState<Question[]>([]);
  const [phase, setPhase] = useState<Phase>("loading");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      let allQ: Question[] = [];
      if (testType === "tests") {
        const [{ Test }, { Test1 }] = await Promise.all([
          import("@/lib/questions.js"),
          import("@/lib/signsQuestion.js"),
        ]);
        const start = (testNumber - 1) * 13;
        const signStart = (testNumber - 1) * 7;
        allQ = [...Test.slice(start, start + 13), ...Test1.slice(signStart, signStart + 7)];
      } else {
        const [{ keywords }, { signsKeywords }] = await Promise.all([
          import("@/lib/questions.js"),
          import("@/lib/signsQuestion.js"),
        ]);
        const start = (testNumber - 1) * 3;
        const signStart = (testNumber - 1) * 2;
        allQ = [...keywords.slice(start, start + 3), ...signsKeywords.slice(signStart, signStart + 2)];
      }
      setQuestions([...allQ].sort(() => Math.random() - 0.5).slice(0, numQ));
      setPhase("question");
    }
    load();
  }, [testType, testNumber, numQ]);

  const currentQ = questions[current];

  async function saveProgress(score: number) {
    setSaving(true);
    try {
      await fetch("/api/test/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: testType, testNumber,
          startTestNumber: (testNumber - 1) * (isTests ? 13 : 3),
          stopTestNumber: (testNumber - 1) * (isTests ? 13 : 3) + (isTests ? 12 : 2),
          signStartTestN: (testNumber - 1) * (isTests ? 7 : 2),
          signStopTestN: (testNumber - 1) * (isTests ? 7 : 2) + (isTests ? 6 : 1),
          questions: questions.map(q => q.id),
          marks: [score],
        }),
      });
    } finally { setSaving(false); }
  }

  function handleSelect(idx: number) { if (!submitted) setSelected(idx); }

  function handleSubmit() {
    if (selected === null) return;
    setSubmitted(true);
    if (selected === currentQ.correctAnswer) setCorrect(c => c + 1);
    else setWrong(w => w + 1);
  }

  function handleNext() {
    const isLast = current + 1 >= questions.length;
    setSelected(null); setSubmitted(false);
    if (isLast) { saveProgress(correct); setPhase("result"); }
    else setCurrent(c => c + 1);
  }

  function restartTest() {
    setQuestions(q => [...q].sort(() => Math.random() - 0.5));
    setCurrent(0); setSelected(null); setSubmitted(false);
    setCorrect(0); setWrong(0); setPhase("question");
  }

  const progress = questions.length > 0 ? (current / questions.length) * 100 : 0;
  const optionLabels = ["A", "B", "C", "D"];

  /* ── LOADING ── */
  if (phase === "loading") {
    return (
      <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", border: "3px solid #e2e8f0", borderTopColor: accentColor, animation: "spin 0.7s linear infinite", margin: "0 auto 14px" }} />
          <p style={{ fontSize: "1.4rem", color: "#94a3b8" }}>Gutegura ibizami…</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  /* ── RESULT ── */
  if (phase === "result") {
    const actualPassScore = Math.min(passScore, Math.ceil(questions.length * (passScore / numQ)));
    const passed = correct >= actualPassScore;
    const perfect = correct === questions.length;
    const pct = Math.round((correct / (correct + wrong || 1)) * 100);

    return (
      <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", flexDirection: "column", fontFamily: "inherit" }}>
        <header style={{ background: "#fff", borderBottom: "1px solid #e2e8f0" }}>
          <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 16px", height: 60, display: "flex", alignItems: "center" }}>
            <Image src="/assets/images/icons/full logo.svg" alt="RoadReady" width={96} height={32} style={{ objectFit: "contain" }} />
          </div>
        </header>

        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px" }}>
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: "36px 28px", maxWidth: 380, width: "100%", textAlign: "center" }}>

            {/* Score ring */}
            <div style={{ position: "relative", width: 100, height: 100, margin: "0 auto 20px" }}>
              <svg width="100" height="100" viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="50" cy="50" r="42" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                <circle cx="50" cy="50" r="42" fill="none"
                  stroke={perfect ? "#10b981" : passed ? accentColor : "#f43f5e"}
                  strokeWidth="8" strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 42}
                  strokeDashoffset={2 * Math.PI * 42 * (1 - pct / 100)}
                />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", lineHeight: 1 }}>{pct}%</span>
              </div>
            </div>

            <h2 style={{ fontSize: "2.4rem", fontWeight: 800, color: "#0f172a", marginBottom: 6 }}>
              {correct} / {correct + wrong}
            </h2>

            <p style={{ fontSize: "1.4rem", color: "#64748b", lineHeight: 1.6, marginBottom: 20 }}>
              {perfect
                ? `Bravo! Ubashije kuzuzuza ikizami cya ${String(testNumber).padStart(2, "0")} neza cyane.`
                : passed
                  ? `Warangije neza! Uracyabura amanota ${wrong} gusa.`
                  : `Usabwe kubona nibura ${actualPassScore} kugirango ukomeze.`}
            </p>

            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 30, marginBottom: 24, background: passed ? accentLight : "#fef2f2", border: `1px solid ${passed ? (perfect ? "#a7f3d0" : "#c7d2fe") : "#fecaca"}` }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: perfect ? "#10b981" : passed ? accentColor : "#f43f5e", display: "inline-block" }} />
              <span style={{ fontSize: "1.3rem", fontWeight: 700, color: perfect ? "#059669" : passed ? accentColor : "#dc2626" }}>
                {perfect ? "Byuzuye!" : passed ? "Waratsinze!" : "Ntiyatsinzwe"}
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button onClick={restartTest} style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "12px 20px", borderRadius: 9, border: "none", background: accentColor, color: "#fff", fontSize: "1.4rem", fontWeight: 700, cursor: "pointer", width: "100%" }}>
                Subiramo ibizami
              </button>
              {passed && (
                <button onClick={() => router.push(`/levels?test=${testType}`)} style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "12px 20px", borderRadius: 9, border: "1px solid #e2e8f0", background: "#f8fafc", color: "#334155", fontSize: "1.4rem", fontWeight: 600, cursor: "pointer", width: "100%" }}>
                  Komeza → Ikizami {testNumber + 1}
                </button>
              )}
              <button onClick={() => router.push(`/levels?test=${testType}`)} style={{ fontSize: "1.3rem", color: "#94a3b8", background: "none", border: "none", cursor: "pointer", padding: "8px" }}>
                Subira ku rutonde
              </button>
            </div>
          </div>
        </div>

        <footer style={{ textAlign: "center", padding: "16px", borderTop: "1px solid #f1f5f9" }}>
          <p style={{ fontSize: "1.15rem", color: "#cbd5e1" }}>&copy; {new Date().getFullYear()} RoadReady &mdash; Binary Solutions</p>
        </footer>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!currentQ) return null;

  /* ── QUESTION ── */
  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", flexDirection: "column", fontFamily: "inherit" }}>

      {/* Sticky header */}
      <header style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "12px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <button
              onClick={() => router.back()}
              style={{ width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8, border: "1px solid #e2e8f0", background: "#fff", cursor: "pointer" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
              </svg>
            </button>

            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: "1.05rem", fontWeight: 600, color: "#94a3b8", letterSpacing: "0.07em", textTransform: "uppercase" }}>
                {isTests ? "Ikizami" : "Amagambo"} {String(testNumber).padStart(2, "0")}
              </p>
              <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a", lineHeight: 1 }}>
                Ikibazo {current + 1} / {questions.length}
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: "1.3rem", fontWeight: 700, color: "#059669" }}>{correct}✓</span>
              <span style={{ color: "#e2e8f0" }}>|</span>
              <span style={{ fontSize: "1.3rem", fontWeight: 700, color: "#f43f5e" }}>{wrong}✗</span>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ height: 5, background: "#f1f5f9", borderRadius: 99, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: accentColor, borderRadius: 99, transition: "width 0.4s ease" }} />
          </div>
        </div>
      </header>

      {/* Body */}
      <div style={{ flex: 1, maxWidth: 640, margin: "0 auto", width: "100%", padding: "20px 16px 32px", display: "flex", flexDirection: "column", gap: 12 }}>

        {/* Question card */}
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "20px" }}>
          {currentQ.img && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={currentQ.img} alt="Ishusho" style={{ width: "100%", maxHeight: 200, objectFit: "contain", borderRadius: 8, marginBottom: 14 }} />
          )}
          <p style={{ fontSize: "1.6rem", color: "#0f172a", fontWeight: 500, lineHeight: 1.55 }}>{currentQ.title}</p>
        </div>

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {currentQ.options.map((opt, idx) => {
            const isCorrect = idx === currentQ.correctAnswer;
            const isSelected = idx === selected;

            let bg = "#fff", border = "1px solid #e2e8f0", color = "#0f172a";
            let labelBg = "#f1f5f9", labelColor = "#94a3b8";

            if (submitted) {
              if (isCorrect) {
                bg = "#f0fdf4"; border = "2px solid #10b981"; color = "#064e3b";
                labelBg = "#10b981"; labelColor = "#fff";
              } else if (isSelected) {
                bg = "#fef2f2"; border = "2px solid #f43f5e"; color = "#7f1d1d";
                labelBg = "#f43f5e"; labelColor = "#fff";
              } else {
                bg = "#fafafa"; border = "1px solid #f1f5f9"; color = "#94a3b8";
              }
            } else if (isSelected) {
              bg = accentLight; border = `2px solid ${accentColor}`; color = accentColor;
              labelBg = accentColor; labelColor = "#fff";
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={submitted}
                style={{
                  width: "100%", display: "flex", alignItems: "flex-start", gap: 12,
                  padding: "13px 14px", borderRadius: 10, border, background: bg,
                  cursor: submitted ? "default" : "pointer", textAlign: "left", transition: "0.12s",
                }}
              >
                <span style={{ width: 32, height: 32, borderRadius: 8, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem", fontWeight: 700, background: labelBg, color: labelColor }}>
                  {optionLabels[idx]}
                </span>
                <span style={{ fontSize: "1.4rem", color, lineHeight: 1.5, paddingTop: 5 }}>{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Action button */}
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={selected === null}
            style={{
              height: 50, width: "100%", borderRadius: 10, border: "none",
              background: accentColor, color: "#fff", fontSize: "1.5rem", fontWeight: 700,
              cursor: selected === null ? "not-allowed" : "pointer",
              opacity: selected === null ? 0.45 : 1, transition: "opacity 0.15s",
            }}
          >
            Emeza
          </button>
        ) : (
          <button
            onClick={handleNext}
            style={{
              height: 50, width: "100%", borderRadius: 10, border: "none",
              background: accentColor, color: "#fff", fontSize: "1.5rem", fontWeight: 700, cursor: "pointer",
            }}
          >
            {current + 1 >= questions.length ? (saving ? "Kubika…" : "Reba Ibisubizo") : "Ikibazo Gikurikira →"}
          </button>
        )}
      </div>

      <footer style={{ textAlign: "center", padding: "14px", borderTop: "1px solid #f1f5f9" }}>
        <p style={{ fontSize: "1.15rem", color: "#cbd5e1" }}>&copy; {new Date().getFullYear()} RoadReady &mdash; Binary Solutions</p>
      </footer>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
