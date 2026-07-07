"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  allQuizItems,
  type AddictionQuestion,
  type PersonalityQuestion,
  type QuizItem,
  type StyleQuestion,
} from "@/data/questions";
import { persistMiniProgramEntryContext, type MiniProgramEntryContext } from "@/lib/miniprogram-link";
import { secureShuffle } from "@/lib/question-selection";
import { buildResult, defaultScores, type FullScoreMap } from "@/lib/scoring";

const resultStorageKey = "sticker-persona-result";

type RecordedAnswer =
  | {
      itemId: string;
      type: "personality";
      dimension: PersonalityQuestion["dimension"];
      score: 0 | 1;
    }
  | {
      itemId: string;
      type: "style";
      keywords: string[];
    }
  | {
      itemId: string;
      type: "addiction";
      score: number;
    };

function shufflePersonalityQuestion(question: PersonalityQuestion): PersonalityQuestion {
  return {
    ...question,
    options: secureShuffle(question.options),
  };
}

function shuffleStyleQuestion(question: StyleQuestion): StyleQuestion {
  const options = secureShuffle(
    question.options.map((label, index) => ({
      label,
      keywords: question.keywordMapping[index] ?? [],
    })),
  );

  return {
    ...question,
    options: options.map((option) => option.label),
    keywordMapping: options.map((option) => option.keywords),
  };
}

function shuffleAddictionQuestion(question: AddictionQuestion): AddictionQuestion {
  const options = secureShuffle(
    question.options.map((label, index) => ({
      label,
      score: question.scores[index] ?? 0,
    })),
  );

  return {
    ...question,
    options: options.map((option) => option.label),
    scores: options.map((option) => option.score),
  };
}

function shuffleQuizItem(item: QuizItem): QuizItem {
  if (item.type === "personality") return shufflePersonalityQuestion(item);
  if (item.type === "style") return shuffleStyleQuestion(item);
  return shuffleAddictionQuestion(item);
}

function summarizeAnswers(answers: RecordedAnswer[]) {
  const scores: FullScoreMap = { ...defaultScores };
  const selectedKeywords = new Set<string>();
  let addictionTotal = 0;

  for (const answer of answers) {
    if (answer.type === "personality") {
      scores[answer.dimension] += answer.score;
      continue;
    }

    if (answer.type === "style") {
      answer.keywords.forEach((keyword) => selectedKeywords.add(keyword));
      continue;
    }

    addictionTotal += answer.score;
  }

  return { scores, selectedKeywords, addictionTotal };
}

export function QuizClient() {
  const router = useRouter();
  const initializedRef = useRef(false);
  const [orderedItems, setOrderedItems] = useState<QuizItem[] | null>(null);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<RecordedAnswer[]>([]);
  const [styleSelection, setStyleSelection] = useState<Set<number>>(new Set());
  const [entryContext, setEntryContext] = useState<MiniProgramEntryContext | null>(null);

  const drawQuiz = useCallback(() => {
    setOrderedItems(secureShuffle(allQuizItems).map(shuffleQuizItem));
    setIndex(0);
    setAnswers([]);
    setStyleSelection(new Set());
    window.localStorage.removeItem(resultStorageKey);
  }, []);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    setEntryContext(persistMiniProgramEntryContext(new URLSearchParams(window.location.search)));
    drawQuiz();
  }, [drawQuiz]);

  const currentItem = orderedItems?.[index] ?? null;
  const progressTotal = orderedItems?.length ?? allQuizItems.length;
  const progressCurrent = Math.min(index + 1, progressTotal);

  const subtitle = useMemo(() => {
    if (!currentItem) return "";
    if (currentItem.type === "style") return "这题可以多选；没有特别心动的，也可以直接下一题。";
    return "按第一反应选，不用给自己找标准答案。";
  }, [currentItem]);

  function finish(finalAnswers: RecordedAnswer[]) {
    const summary = summarizeAnswers(finalAnswers);
    const result = buildResult(summary);
    window.localStorage.setItem(resultStorageKey, JSON.stringify(result));
    router.push("/result?theater=1");
  }

  function advance(answer: RecordedAnswer) {
    if (!orderedItems) return;

    const nextAnswers = [...answers, answer];
    if (index >= orderedItems.length - 1) {
      finish(nextAnswers);
      return;
    }

    setAnswers(nextAnswers);
    setIndex((value) => value + 1);
    setStyleSelection(new Set());
  }

  function handlePreviousQuestion() {
    if (index <= 0) return;

    setAnswers((value) => value.slice(0, -1));
    setIndex((value) => value - 1);
    setStyleSelection(new Set());
  }

  function handlePersonalityOption(question: PersonalityQuestion, optionIndex: number) {
    const option = question.options[optionIndex];
    if (!option) return;

    advance({
      itemId: question.id,
      type: "personality",
      dimension: question.dimension,
      score: option.score,
    });
  }

  function handleAddictionOption(question: AddictionQuestion, optionIndex: number) {
    advance({
      itemId: question.id,
      type: "addiction",
      score: question.scores[optionIndex] ?? 0,
    });
  }

  function toggleStyleOption(optionIndex: number) {
    setStyleSelection((selection) => {
      const nextSelection = new Set(selection);
      if (nextSelection.has(optionIndex)) {
        nextSelection.delete(optionIndex);
      } else {
        nextSelection.add(optionIndex);
      }
      return nextSelection;
    });
  }

  function handleStyleNext(question: StyleQuestion) {
    const keywords = [...styleSelection].flatMap((optionIndex) => question.keywordMapping[optionIndex] ?? []);
    advance({
      itemId: question.id,
      type: "style",
      keywords,
    });
  }

  if (!orderedItems || !currentItem) {
    return (
      <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-start justify-center px-4 py-6 sm:px-6">
        <div className="rounded-[28px] border border-neutral-200 bg-white px-5 py-4 text-base font-medium text-neutral-600 shadow-sm">
          正在准备你的题目...
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-4 py-6 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-sm text-neutral-500">
        <Link href="/" className="hover:text-neutral-900">
          返回首页
        </Link>
        <button
          type="button"
          onClick={drawQuiz}
          className="rounded-full border border-neutral-300 bg-white px-4 py-2 font-medium text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900"
        >
          重新洗牌
        </button>
      </div>

      <div className="mb-3 flex items-center justify-between text-sm text-neutral-500">
        <span>贴纸人格测试</span>
        <span>
          {progressCurrent} / {progressTotal}
        </span>
      </div>

      <div className="mb-4 h-2 overflow-hidden rounded-full bg-white/60">
        <div
          className="h-full rounded-full bg-neutral-900 transition-all"
          style={{ width: `${(progressCurrent / progressTotal) * 100}%` }}
        />
      </div>

      <h1 className="max-w-2xl text-3xl font-black leading-tight text-neutral-950 sm:text-5xl">
        {entryContext?.nickname ? (
          <span className="mb-3 block text-base font-bold leading-6 text-[#2f7d48] sm:text-lg">
            {entryContext.nickname}，开始测你的贴纸人格
          </span>
        ) : null}
        {currentItem.title}
      </h1>
      <p className="mt-4 max-w-xl text-sm text-neutral-500 sm:text-base">{subtitle}</p>

      {currentItem.type === "style" ? (
        <div className="mt-8 grid gap-3">
          {currentItem.options.map((option, optionIndex) => {
            const selected = styleSelection.has(optionIndex);
            return (
              <button
                key={option}
                type="button"
                onClick={() => toggleStyleOption(optionIndex)}
                className={`group rounded-[28px] border px-5 py-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg ${
                  selected
                    ? "border-neutral-950 bg-neutral-950 text-white"
                    : "border-neutral-200 bg-white text-neutral-950 hover:border-neutral-900"
                }`}
              >
                <div className="text-lg font-semibold leading-7">{option}</div>
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => handleStyleNext(currentItem)}
            className="mt-2 rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/15 transition hover:-translate-y-0.5"
          >
            下一题
          </button>
        </div>
      ) : (
        <div className="mt-8 grid gap-3">
          {currentItem.options.map((option, optionIndex) => {
            const label = typeof option === "string" ? option : option.label;
            return (
              <button
                key={`${currentItem.id}-${optionIndex}`}
                type="button"
                onClick={() =>
                  currentItem.type === "personality"
                    ? handlePersonalityOption(currentItem, optionIndex)
                    : handleAddictionOption(currentItem, optionIndex)
                }
                className="group rounded-[28px] border border-neutral-200 bg-white px-5 py-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-neutral-900 hover:shadow-lg"
              >
                <div className="text-lg font-semibold leading-7 text-neutral-950">{label}</div>
              </button>
            );
          })}
        </div>
      )}

      <div className="mt-6 flex justify-start">
        <button
          type="button"
          onClick={handlePreviousQuestion}
          disabled={index === 0}
          className="rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-950 disabled:cursor-not-allowed disabled:border-neutral-200 disabled:bg-white/60 disabled:text-neutral-300"
        >
          上一题
        </button>
      </div>
    </div>
  );
}
