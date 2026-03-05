"use client";
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

// Question types
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

// Dynamically load questions based on test config
function getQuestionsForTest(
  testType: "tests" | "keywords",
  testNumber: number
): { questions: Question[]; numQ: number; passScore: number; perfectScore: number } {
  // Tests: 13 normal + 7 signs = 20 questions per test
  // Keywords: 3 normal + 2 signs = 5 questions per test
  const isTests = testType === "tests";
  const numQ = isTests ? 20 : 5;
  const passScore = isTests ? 12 : 3;
  const perfectScore = isTests ? 20 : 5;

  // Generate dummy questions array (real data loaded client-side from JS files)
  return { questions: [], numQ, passScore, perfectScore };
}

type Phase = "loading" | "question" | "result";

export default function TestClient({ testType, testNumber, existing }: TestClientProps) {
  const router = useRouter();
  const isTests = testType === "tests";
  const numQ = isTests ? 20 : 5;
  const passScore = isTests ? 12 : 3;
  const perfectScore = numQ;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [phase, setPhase] = useState<Phase>("loading");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [missedQuestions, setMissedQuestions] = useState<Question[]>([]);
  const [saving, setSaving] = useState(false);

  // Load questions dynamically
  useEffect(() => {
    async function load() {
      let allQ: Question[] = [];
      if (testType === "tests") {
        const [{ Test }, { Test1 }] = await Promise.all([
          import("@/lib/questions.js"),
          import("@/lib/signsQuestion.js"),
        ]);
        const start = (testNumber - 1) * 13;
        const stop = start + 12;
        const signStart = (testNumber - 1) * 7;
        const signStop = signStart + 6;
        allQ = [...Test.slice(start, stop + 1), ...Test1.slice(signStart, signStop + 1)];
      } else {
        const [{ keywords }, { signsKeywords }] = await Promise.all([
          import("@/lib/questions.js"),
          import("@/lib/signsQuestion.js"),
        ]);
        const start = (testNumber - 1) * 3;
        const stop = start + 2;
        const signStart = (testNumber - 1) * 2;
        const signStop = signStart + 1;
        allQ = [...keywords.slice(start, stop + 1), ...signsKeywords.slice(signStart, signStop + 1)];
      }
      // Shuffle
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
    setSelected(null);
    setSubmitted(false);
    if (current + 1 >= questions.length) {
      const score = correct + (selected === currentQ?.correctAnswer ? 1 : 0);
      saveProgress(score);
      setPhase("result");
    } else {
      setCurrent(c => c + 1);
    }
  }

  function restartTest() {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setCurrent(0);
    setSelected(null);
    setSubmitted(false);
    setCorrect(0);
    setWrong(0);
    setMissedQuestions([]);
    setPhase("question");
  }

  function retryMissed() {
    setQuestions([...missedQuestions].sort(() => Math.random() - 0.5));
    setCurrent(0);
    setSelected(null);
    setSubmitted(false);
    setCorrect(0);
    setWrong(0);
    setMissedQuestions([]);
    setPhase("question");
  }

  const progress = questions.length > 0 ? ((current) / questions.length) * 100 : 0;

  if (phase === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <span className="w-10 h-10 border-4 border-[#5d63ff]/30 border-t-[#5d63ff] rounded-full animate-spin block mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Gutegura ibizami...</p>
        </div>
      </div>
    );
  }

  if (phase === "result") {
    const total = correct + wrong;
    const passed = correct >= passScore;
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-sm w-full text-center">
          <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-4xl mb-6 ${correct === perfectScore ? "bg-green-100" : passed ? "bg-blue-100" : "bg-red-100"}`}>
            {correct === perfectScore ? "🎉" : passed ? "👍" : "😔"}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Ubonye {correct} / {total}</h2>
          <p className="text-gray-500 text-sm mb-6">
            {correct === perfectScore
              ? `Bravo! Ubashije kuzuza ikizami cya ${testNumber}!`
              : passed
              ? `Warangije neza! Uracyabura amanota ${wrong} gusa.`
              : `Oops! Usabwe kubona nibura ${passScore} kugirango ukomeze.`}
          </p>
          <div className="flex flex-col gap-3">
            {wrong > 0 && (
              <button onClick={retryMissed} className="btn-primary py-3 text-sm">
                Subiramo ibyakunaniye ({wrong})
              </button>
            )}
            <button onClick={restartTest} className="py-3 rounded-xl border border-[#5d63ff] text-[#5d63ff] text-sm font-semibold hover:bg-[#5d63ff] hover:text-white transition-all">
              Subiramo ikizami cyose
            </button>
            {passed && (
              <button
                onClick={() => router.push(`/levels?test=${testType}`)}
                className="py-3 rounded-xl bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-gray-200 transition-all"
              >
                Komeza → Ikizami {testNumber + 1}
              </button>
            )}
            <button onClick={() => router.push(`/levels?test=${testType}`)} className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
              Subira ku rutonde
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQ) return null;

  const optionLabels = ["A", "B", "C", "D"];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <button onClick={() => router.back()} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="text-center">
              <p className="text-xs text-gray-500 font-medium">IKIZAMI {testNumber < 10 ? `0${testNumber}` : testNumber}</p>
              <p className="text-sm font-bold text-gray-900">Ikibazo {current + 1} / {questions.length}</p>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs text-green-600 font-semibold">{correct}✓</span>
              <span className="text-gray-300 mx-1">|</span>
              <span className="text-xs text-red-500 font-semibold">{wrong}✗</span>
            </div>
          </div>
          {/* Progress bar */}
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#5d63ff] rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 flex flex-col gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          {currentQ.img && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={currentQ.img} alt="Ishusho" className="w-full max-h-48 object-contain rounded-xl mb-4" />
          )}
          <p className="text-gray-900 font-medium leading-relaxed">{currentQ.title}</p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((opt, idx) => {
            let style = "border-gray-200 bg-white text-gray-700";
            if (submitted) {
              if (idx === currentQ.correctAnswer) style = "border-green-400 bg-green-50 text-green-800";
              else if (idx === selected) style = "border-red-400 bg-red-50 text-red-700";
              else style = "border-gray-100 bg-gray-50 text-gray-400";
            } else if (selected === idx) {
              style = "border-[#5d63ff] bg-[#5d63ff]/5 text-[#5d63ff]";
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={submitted}
                className={`w-full flex items-start gap-4 p-4 rounded-2xl border-2 text-left transition-all ${style}`}
              >
                <span className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center text-sm font-bold ${submitted && idx === currentQ.correctAnswer ? "bg-green-500 text-white" : submitted && idx === selected ? "bg-red-400 text-white" : selected === idx ? "bg-[#5d63ff] text-white" : "bg-gray-100 text-gray-500"}`}>
                  {optionLabels[idx]}
                </span>
                <span className="text-sm leading-relaxed pt-0.5">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Action button */}
        <div className="pb-6">
          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={selected === null}
              className={`btn-primary w-full py-4 text-base ${selected === null ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Emeza
            </button>
          ) : (
            <button onClick={handleNext} className="btn-primary w-full py-4 text-base">
              {current + 1 >= questions.length ? (saving ? "Kubika..." : "Reba Ibisubizo") : "Ikibazo Gikurikira →"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
