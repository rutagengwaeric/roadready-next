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

  const [questions, setQuestions] = useState<Question[]>([]);
  const [phase, setPhase] = useState<Phase>("loading");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [missedQuestions, setMissedQuestions] = useState<Question[]>([]);
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
      const shuffled = [...allQ].sort(() => Math.random() - 0.5).slice(0, numQ);
      setQuestions(shuffled);
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
          type: testType,
          testNumber,
          startTestNumber: (testNumber - 1) * (isTests ? 13 : 3),
          stopTestNumber: (testNumber - 1) * (isTests ? 13 : 3) + (isTests ? 12 : 2),
          signStartTestN: (testNumber - 1) * (isTests ? 7 : 2),
          signStopTestN: (testNumber - 1) * (isTests ? 7 : 2) + (isTests ? 6 : 1),
          questions: questions.map(q => q.id),
          marks: [score],
        }),
      });
    } finally {
      setSaving(false);
    }
  }

  function handleSelect(idx: number) {
    if (!submitted) setSelected(idx);
  }

  function handleSubmit() {
    if (selected === null) return;
    setSubmitted(true);
    if (selected === currentQ.correctAnswer) {
      setCorrect(c => c + 1);
    } else {
      setWrong(w => w + 1);
      setMissedQuestions(prev => [...prev, currentQ]);
    }
  }

  function handleNext() {
    const isLast = current + 1 >= questions.length;
    const finalScore = correct + (submitted && selected === currentQ?.correctAnswer ? 0 : 0);
    setSelected(null);
    setSubmitted(false);
    if (isLast) {
      const score = correct;
      saveProgress(score);
      setPhase("result");
    } else {
      setCurrent(c => c + 1);
    }
  }

  function restartTest() {
    setQuestions(q => [...q].sort(() => Math.random() - 0.5));
    setCurrent(0); setSelected(null); setSubmitted(false);
    setCorrect(0); setWrong(0); setMissedQuestions([]); setPhase("question");
  }

  function retryMissed() {
    setQuestions([...missedQuestions].sort(() => Math.random() - 0.5));
    setCurrent(0); setSelected(null); setSubmitted(false);
    setCorrect(0); setWrong(0); setMissedQuestions([]); setPhase("question");
  }

  const progress = questions.length > 0 ? (current / questions.length) * 100 : 0;

  /* ── LOADING ── */
  if (phase === "loading") {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#f9f5ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div className="dots-container" style={{ position: "relative", width: 80, height: 24, margin: "0 auto 16px" }}>
            <div className="dot" /><div className="dot" /><div className="dot" />
          </div>
          <p style={{ color: "rgba(32,40,66,0.6)", fontSize: "1.4rem" }}>Gutegura ibizami...</p>
        </div>
      </div>
    );
  }

  /* ── RESULT ── */
  if (phase === "result") {
    const actualPassScore = Math.min(passScore, Math.ceil(questions.length * (passScore / numQ)));
    const passed = correct >= actualPassScore;
    const perfect = correct === questions.length;
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#f9f5ff", display: "flex", flexDirection: "column" }}>
        {/* Top bar */}
        <div style={{ backgroundColor: "#fff", borderBottom: "1px solid #eee", padding: "0 16px", height: 60, display: "flex", alignItems: "center" }}>
          <Image src="/assets/images/icons/full logo.svg" alt="RoadReady" width={100} height={36} style={{ objectFit: "contain" }} />
        </div>

        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div style={{ background: "#fff", borderRadius: 18, border: "1px solid #ece8e8", boxShadow: "0 4px 30px rgba(0,0,0,0.08)", padding: "32px 24px", maxWidth: 360, width: "100%", textAlign: "center" }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", margin: "0 auto 20px", background: perfect ? "#e6f9f0" : passed ? "#eeefff" : "#fff5f5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 38 }}>
              {perfect ? "🎉" : passed ? "👍" : "😔"}
            </div>
            <h2 style={{ fontSize: "2.4rem", fontWeight: 700, color: "#202842", marginBottom: 6 }}>
              Ubonye {correct} / {correct + wrong}
            </h2>
            <p style={{ color: "rgba(32,40,66,0.65)", fontSize: "1.4rem", marginBottom: 24, lineHeight: 1.5 }}>
              {perfect
                ? `Bravo! Ubashije kuzuzuza ikizami cya ${testNumber < 10 ? `0${testNumber}` : testNumber}, Komerezaho!`
                : passed
                  ? `Warangije neza! Uracyabura amanota ${wrong} gusa.`
                  : `Oops! Usabwe kubona nibura ${actualPassScore} kugirango ukomeze.`}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {/* {wrong > 0 && (
                <button onClick={retryMissed} className="btn btn-primary" style={{ height: 45, fontSize: "1.4rem", width: "100%" }}>
                  Subiramo ibyakunaniye ({wrong})
                </button>
              )} */}
              <button onClick={restartTest} className="btn btn-outline" style={{ height: 45, fontSize: "1.4rem", width: "100%" }}>
                Subiramo ibyakunaniye 
              </button>
              {passed && (
                <button onClick={() => router.push(`/levels?test=${testType}`)} className="btn" style={{ height: 45, fontSize: "1.4rem", width: "100%", background: "#f5f4fa", color: "#202842" }}>
                  Komeza → Ikizami {testNumber + 1}
                </button>
              )}
              <button onClick={() => router.push(`/levels?test=${testType}`)} style={{ fontSize: "1.3rem", color: "rgba(32,40,66,0.5)", background: "none", border: "none", cursor: "pointer", marginTop: 4 }}>
                Subira ku rutonde
              </button>
            </div>
          </div>
        </div>

        <footer className="app-footer">
          <p>&copy; Copyright 2025 RoadReady - A Binary Solutions Company.</p>
          <p>Designed By Binary Solutions</p>
        </footer>
      </div>
    );
  }

  if (!currentQ) return null;

  const optionLabels = ["A", "B", "C", "D"];

  /* ── QUESTION ── */
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9f5ff", display: "flex", flexDirection: "column" }}>
      {/* Top bar */}
      <div style={{ backgroundColor: "#fff", borderBottom: "1px solid #eee", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "12px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <button onClick={() => router.back()} style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8, border: "1px solid #eee", background: "#fff" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5d6eff" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: "1.1rem", fontWeight: 600, color: "rgba(32,40,66,0.5)", letterSpacing: 1 }}>
                IKIZAMI {testNumber < 10 ? `0${testNumber}` : testNumber}
              </p>
              <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "#202842" }}>
                Ikibazo {current + 1} / {questions.length}
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: "1.3rem", fontWeight: 700, color: "#27ae60" }}>{correct}✓</span>
              <span style={{ color: "#ddd" }}>|</span>
              <span style={{ fontSize: "1.3rem", fontWeight: 700, color: "#e53e3e" }}>{wrong}✗</span>
            </div>
          </div>
          {/* Progress bar */}
          <div style={{ height: 6, backgroundColor: "#e8e4ff", borderRadius: 4, overflow: "hidden" }}>
            <div style={{ height: "100%", backgroundColor: "#5d6eff", width: `${progress}%`, transition: "width 0.5s ease", borderRadius: 4 }} />
          </div>
        </div>
      </div>

      {/* Question body */}
      <div style={{ flex: 1, maxWidth: 640, margin: "0 auto", width: "100%", padding: "20px 16px 32px", display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Question card */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #ece8e8", padding: 20 }}>
          {currentQ.img && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={currentQ.img} alt="Ishusho" style={{ width: "100%", maxHeight: 200, objectFit: "contain", borderRadius: 12, marginBottom: 16 }} />
          )}
          <p style={{ fontSize: "1.6rem", color: "#202842", fontWeight: 500, lineHeight: 1.5 }}>{currentQ.title}</p>
        </div>

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {currentQ.options.map((opt, idx) => {
            let bg = "#fff";
            let border = "1px solid #ece8e8";
            let color = "#202842";
            let labelBg = "#f5f4fa";
            let labelColor = "#aaa";

            if (submitted) {
              if (idx === currentQ.correctAnswer) {
                bg = "#f0fff4"; border = "2px solid #48bb78"; color = "#22543d";
                labelBg = "#48bb78"; labelColor = "#fff";
              } else if (idx === selected) {
                bg = "#fff5f5"; border = "2px solid #fc8181"; color = "#742a2a";
                labelBg = "#fc8181"; labelColor = "#fff";
              } else {
                bg = "#fafafa"; border = "1px solid #eee"; color = "#aaa";
              }
            } else if (selected === idx) {
              bg = "#f0effe"; border = "2px solid #5d6eff"; color = "#5d6eff";
              labelBg = "#5d6eff"; labelColor = "#fff";
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={submitted}
                style={{
                  width: "100%", display: "flex", alignItems: "flex-start", gap: 14,
                  padding: "14px 16px", borderRadius: 14, border, background: bg,
                  cursor: submitted ? "default" : "pointer", textAlign: "left", transition: "0.15s",
                }}
              >
                <span style={{ width: 34, height: 34, borderRadius: 10, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", fontWeight: 700, background: labelBg, color: labelColor }}>
                  {optionLabels[idx]}
                </span>
                <span style={{ fontSize: "1.4rem", color, lineHeight: 1.5, paddingTop: 4 }}>{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Action button */}
        <div>
          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={selected === null}
              className="btn btn-primary"
              style={{ height: 50, width: "100%", fontSize: "1.5rem", opacity: selected === null ? 0.5 : 1, cursor: selected === null ? "not-allowed" : "pointer" }}
            >
              Emeza
            </button>
          ) : (
            <button onClick={handleNext} className="btn btn-primary" style={{ height: 50, width: "100%", fontSize: "1.5rem" }}>
              {current + 1 >= questions.length ? (saving ? "Kubika..." : "Reba Ibisubizo") : "Ikibazo Gikurikira →"}
            </button>
          )}
        </div>
      </div>

      <footer className="app-footer">
        <p>&copy; Copyright 2025 RoadReady - A Binary Solutions Company.</p>
        <p>Designed By Binary Solutions</p>
      </footer>
    </div>
  );
}
