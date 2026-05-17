"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { hiddenPersonaProfiles } from "@/data/personas";
import { mainQuestions, type HiddenQuestion, type MainQuestion } from "@/data/questions";
import {
  createEmptyDrawHistory,
  MAIN_DRAW_COUNT,
  selectQuestions,
  secureShuffle,
  type DrawHistory,
} from "@/lib/question-selection";
import {
  addScores,
  buildResult,
  defaultScores,
  pickHiddenQuestion,
  resolveHiddenPersonaFromOption,
} from "@/lib/scoring";

const resultStorageKey = "sticker-persona-result";
const drawHistoryStorageKey = "sticker-persona-draw-history";
type ActiveQuestion = MainQuestion | HiddenQuestion;
type QuizPhase = "main" | "hidden";
type QuizStepSnapshot = {
  scores: typeof defaultScores;
  index: number;
  hiddenQuestion: ReturnType<typeof pickHiddenQuestion>;
  phase: QuizPhase;
};

function shuffleQuestionOptions<T extends ActiveQuestion>(question: T): T {
  return {
    ...question,
    options: secureShuffle(question.options),
  };
}

function readDrawHistory(): DrawHistory {
  if (typeof window === "undefined") {
    return createEmptyDrawHistory();
  }

  const raw = window.localStorage.getItem(drawHistoryStorageKey);
  if (!raw) {
    return createEmptyDrawHistory();
  }

  try {
    return JSON.parse(raw) as DrawHistory;
  } catch {
    return createEmptyDrawHistory();
  }
}

function writeDrawHistory(history: DrawHistory) {
  window.localStorage.setItem(drawHistoryStorageKey, JSON.stringify(history));
}

export function QuizClient() {
  const router = useRouter();
  const initializedRef = useRef(false);
  const [orderedQuestions, setOrderedQuestions] = useState<MainQuestion[] | null>(null);
  const [scores, setScores] = useState(defaultScores);
  const [index, setIndex] = useState(0);
  const [hiddenQuestion, setHiddenQuestion] = useState<ReturnType<typeof pickHiddenQuestion>>(null);
  const [phase, setPhase] = useState<QuizPhase>("main");
  const [stepHistory, setStepHistory] = useState<QuizStepSnapshot[]>([]);

  const resetQuizState = useCallback(() => {
    setScores(defaultScores);
    setIndex(0);
    setHiddenQuestion(null);
    setPhase("main");
    setStepHistory([]);
  }, []);

  const drawQuestionSet = useCallback((options?: { resetHistory?: boolean }) => {
    const history = options?.resetHistory ? createEmptyDrawHistory() : readDrawHistory();
    const selection = selectQuestions(mainQuestions, history);
    writeDrawHistory(selection.history);
    setOrderedQuestions(selection.questions.map(shuffleQuestionOptions));
    resetQuizState();
    window.localStorage.removeItem(resultStorageKey);
  }, [resetQuizState]);

  useEffect(() => {
    if (initializedRef.current) {
      return;
    }
    initializedRef.current = true;
    drawQuestionSet();
  }, [drawQuestionSet]);

  const currentQuestion = phase === "main" ? orderedQuestions?.[index] ?? null : hiddenQuestion;
  const progressTotal = phase === "main" ? orderedQuestions?.length ?? MAIN_DRAW_COUNT : (orderedQuestions?.length ?? MAIN_DRAW_COUNT) + 1;
  const progressCurrent = phase === "main" ? index + 1 : (orderedQuestions?.length ?? MAIN_DRAW_COUNT) + 1;

  if (!orderedQuestions || !currentQuestion) {
    return (
      <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-start justify-center px-4 py-6 sm:px-6">
        <div className="rounded-[28px] border border-neutral-200 bg-white px-5 py-4 text-base font-medium text-neutral-600 shadow-sm">
          正在准备你的题目...
        </div>
      </div>
    );
  }

  const totalQuestions = orderedQuestions.length;

  function finish(
    finalScores: typeof scores,
    hiddenPersona: (typeof hiddenPersonaProfiles)[number] | null = null,
  ) {
    const result = buildResult(finalScores, hiddenPersona);
    window.localStorage.setItem(resultStorageKey, JSON.stringify(result));
    router.push("/result");
  }

  function advanceQuiz(
    nextScores: typeof scores,
    selectedOption?: ActiveQuestion["options"][number],
  ) {
    const activeQuestion = currentQuestion;
    if (!activeQuestion) return;

    setStepHistory((history) => [
      ...history,
      {
        scores,
        index,
        hiddenQuestion,
        phase,
      },
    ]);

    if (phase === "main") {
      if (index === totalQuestions - 1) {
        const nextHiddenQuestion = pickHiddenQuestion(nextScores);
        if (nextHiddenQuestion) {
          setScores(nextScores);
          setHiddenQuestion(shuffleQuestionOptions(nextHiddenQuestion));
          setPhase("hidden");
          return;
        }
        finish(nextScores);
        return;
      }

      setScores(nextScores);
      setIndex((value) => value + 1);
      return;
    }

    const hiddenPersona =
      activeQuestion.id === "H4" && selectedOption
        ? resolveHiddenPersonaFromOption(selectedOption, nextScores)
        : null;
    finish(nextScores, hiddenPersona);
  }

  function handlePreviousQuestion() {
    const previousStep = stepHistory.at(-1);
    if (!previousStep) return;

    setScores(previousStep.scores);
    setIndex(previousStep.index);
    setHiddenQuestion(previousStep.hiddenQuestion);
    setPhase(previousStep.phase);
    setStepHistory((history) => history.slice(0, -1));
  }

  function handleOption(optionKey: string) {
    const activeQuestion = currentQuestion;
    if (!activeQuestion) return;

    const option = activeQuestion.options.find((item) => item.key === optionKey);
    if (!option) return;

    advanceQuiz(addScores(scores, option.score), option);
  }

  function handleSkip() {
    advanceQuiz(scores);
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-4 py-6 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-sm text-neutral-500">
        <Link href="/" className="hover:text-neutral-900">
          返回首页
        </Link>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => drawQuestionSet()}
            className="rounded-full border border-neutral-300 bg-white px-4 py-2 font-medium text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900"
          >
            换一组题目
          </button>
          <button
            type="button"
            onClick={() => drawQuestionSet({ resetHistory: true })}
            className="rounded-full border border-neutral-300 bg-white px-4 py-2 font-medium text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900"
          >
            从头开始
          </button>
        </div>
      </div>

      <div className="mb-3 flex items-center justify-between text-sm text-neutral-500">
        <span>{phase === "main" ? "贴纸人格测试" : "追加问题"}</span>
        <span>{progressCurrent} / {progressTotal}</span>
      </div>

      <div className="mb-4 h-2 overflow-hidden rounded-full bg-white/60">
        <div
          className="h-full rounded-full bg-neutral-900 transition-all"
          style={{ width: `${(progressCurrent / progressTotal) * 100}%` }}
        />
      </div>

      <h1 className="max-w-2xl text-3xl font-black leading-tight text-neutral-950 sm:text-5xl">
        {currentQuestion.title}
      </h1>
      <p className="mt-4 max-w-xl text-sm text-neutral-500 sm:text-base">
        {phase === "main"
          ? "请按照真实贴纸习惯作答；遇到不适用的题，可以跳过。"
          : "根据你的选择，再补充一个小问题。"}
      </p>

      <div className="mt-8 grid gap-3">
        {currentQuestion.options.map((option) => (
          <button
            key={option.key}
            type="button"
            onClick={() => handleOption(option.key)}
            className="group rounded-[28px] border border-neutral-200 bg-white px-5 py-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-neutral-900 hover:shadow-lg"
          >
            <div className="text-lg font-semibold leading-7 text-neutral-950">{option.label}</div>
          </button>
        ))}
      </div>

      {currentQuestion.required === false ? (
        <button
          type="button"
          onClick={handleSkip}
          className="mt-4 rounded-full border border-dashed border-neutral-300 bg-white/70 px-5 py-3 text-sm font-semibold text-neutral-500 transition hover:border-neutral-700 hover:text-neutral-900"
        >
          不适用，跳过这题
        </button>
      ) : null}

      <div className="mt-6 flex justify-start">
        <button
          type="button"
          onClick={handlePreviousQuestion}
          disabled={stepHistory.length === 0}
          className="rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-950 disabled:cursor-not-allowed disabled:border-neutral-200 disabled:bg-white/60 disabled:text-neutral-300"
        >
          上一题
        </button>
      </div>
    </div>
  );
}
