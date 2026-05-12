"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getPersonaImageSrc, hiddenPersonaProfiles, personas } from "@/data/personas";
import { dimensionLabels } from "@/data/questions";
import { getMbtiComment } from "@/lib/scoring";

const storageKey = "sticker-persona-result";
const mbtiOptions = [
  "INTJ", "INTP", "ENTJ", "ENTP",
  "INFJ", "INFP", "ENFJ", "ENFP",
  "ISTJ", "ISFJ", "ESTJ", "ESFJ",
  "ISTP", "ISFP", "ESTP", "ESFP",
];

type StoredResult = {
  scores: Record<string, number>;
  percentages: Record<string, number>;
  persona: (typeof personas)[number];
  hiddenPersona: (typeof hiddenPersonaProfiles)[number] | null;
  shareTitle: string;
  primaryTag: string;
};

type SharedResultPayload = {
  scores: Record<string, number>;
  percentages: Record<string, number>;
  personaCode: string;
  hiddenPersonaSlug: string | null;
  shareTitle: string;
  primaryTag: string;
};

function encodeSharePayload(payload: SharedResultPayload) {
  const json = JSON.stringify(payload);
  const bytes = new TextEncoder().encode(json);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function decodeSharePayload(encoded: string | null): StoredResult | null {
  if (!encoded) return null;

  try {
    const normalized = encoded.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
    const binary = atob(padded);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    const payload = JSON.parse(new TextDecoder().decode(bytes)) as SharedResultPayload;
    const persona = personas.find((item) => item.code === payload.personaCode);
    if (!persona) {
      return null;
    }

    const hiddenPersona = payload.hiddenPersonaSlug
      ? hiddenPersonaProfiles.find((item) => item.slug === payload.hiddenPersonaSlug) ?? null
      : null;

    return {
      scores: payload.scores,
      percentages: payload.percentages,
      persona,
      hiddenPersona,
      shareTitle: payload.shareTitle,
      primaryTag: payload.primaryTag,
    };
  } catch {
    return null;
  }
}

export function ResultClient() {
  const [mbti, setMbti] = useState("");
  const [shareState, setShareState] = useState<"idle" | "shared" | "copied" | "error">("idle");

  const sharedResult = useMemo(() => {
    if (typeof window === "undefined") return null;
    return decodeSharePayload(new URLSearchParams(window.location.search).get("r"));
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && sharedResult) {
      window.localStorage.setItem(storageKey, JSON.stringify(sharedResult));
    }
  }, [sharedResult]);

  const result = useMemo<StoredResult | null>(() => {
    if (sharedResult) return sharedResult;
    if (typeof window === "undefined") return null;
    const raw = window.localStorage.getItem(storageKey);
    return raw ? (JSON.parse(raw) as StoredResult) : null;
  }, [sharedResult]);

  if (!result) {
    return (
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-start justify-center px-4 py-16 sm:px-6">
        <h1 className="text-4xl font-black text-neutral-950">你还没开始丢人。</h1>
        <p className="mt-4 text-lg text-neutral-600">先测，再看结果。</p>
        <Link
          href="/quiz"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-neutral-950 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5"
        >
          <span className="text-white">去测一下</span>
          <span aria-hidden="true" className="text-white">
            →
          </span>
        </Link>
      </div>
    );
  }

  const title = result.hiddenPersona?.name ?? result.persona.name;
  const chinlish = result.hiddenPersona?.chinlish ?? result.persona.chinlish ?? result.persona.code;
  const subtitle = result.hiddenPersona?.oneLiner ?? result.persona.oneLiner;
  const mbtiComment = getMbtiComment(mbti, title);
  const imagePersona = result.persona;

  async function handleShare() {
    if (typeof window === "undefined") return;
    const activeResult = result;
    if (!activeResult) return;

    const payload: SharedResultPayload = {
      scores: activeResult.scores,
      percentages: activeResult.percentages,
      personaCode: activeResult.persona.code,
      hiddenPersonaSlug: activeResult.hiddenPersona?.slug ?? null,
      shareTitle: activeResult.shareTitle,
      primaryTag: activeResult.primaryTag,
    };

    const shareUrl = new URL("/result", window.location.origin);
    shareUrl.searchParams.set("r", encodeSharePayload(payload));

    const shareData = {
      title: activeResult.shareTitle,
      text: `${title}｜${subtitle}`,
      url: shareUrl.toString(),
    };

    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share(shareData);
        setShareState("shared");
        return;
      }

      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
        setShareState("copied");
        return;
      }

      setShareState("error");
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }
      setShareState("error");
    }
  }

  return (
    <div className="noise-grid mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 py-6 sm:px-6">
      <div className="flex items-center justify-between text-sm text-neutral-500">
        <Link href="/" className="hover:text-neutral-900">首页</Link>
        <Link href="/atlas" className="hover:text-neutral-900">人格图鉴</Link>
      </div>

      <section className="poster-frame glow-panel sticker-card relative mt-8 overflow-hidden rounded-[40px] p-6 sm:p-10">
        <div className="absolute left-4 top-4 rotate-[-8deg] rounded-full border border-black/10 bg-[#fff1a6] px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-neutral-950 shadow-lg sm:text-sm">
          结果公示
        </div>
        <div className="absolute right-4 top-6 rotate-[8deg] rounded-full border border-black/10 bg-[#ffd4ea] px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-neutral-950 shadow-lg sm:text-sm">
          仅供整活
        </div>

        <div className="relative grid gap-8 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="mono-kicker text-xs font-semibold text-neutral-500">Result</div>
            <h1 className="mt-4 text-5xl font-black leading-[0.92] tracking-[-0.06em] text-neutral-950 sm:text-7xl">
              {title}
            </h1>
            <div className="mt-4 inline-flex rounded-full bg-[#e9f8d5] px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-[#2f7d48]">
              {chinlish}
            </div>
            <p className="mt-5 max-w-2xl text-lg font-medium text-neutral-700 sm:text-2xl">{subtitle}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="sticker-badge bg-[#111111] text-sm font-semibold text-white">
                主毛病：{result.primaryTag}
              </div>
              {result.hiddenPersona ? (
                <div className="sticker-badge bg-[#dff675] text-sm font-semibold text-neutral-950">
                  隐藏人格
                </div>
              ) : null}
            </div>
          </div>
          <Image
            src={getPersonaImageSrc(imagePersona)}
            alt={`${title}人格插图`}
            width={520}
            height={360}
            priority
            className="mx-auto w-full max-w-md rotate-[2deg] rounded-[30px] bg-white object-cover shadow-2xl shadow-black/10"
          />
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="glow-panel sticker-card rounded-[32px] p-6 sm:p-8">
          <h2 className="text-2xl font-black text-neutral-950">六维</h2>
          <div className="mt-6 space-y-4">
            {Object.entries(result.percentages).map(([key, value], index) => (
              <div key={key}>
                <div className="mb-2 flex items-center justify-between text-sm font-medium text-neutral-700">
                  <span>{dimensionLabels[key as keyof typeof dimensionLabels]}</span>
                  <span>{value}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-neutral-100">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${value}%`,
                      background: [
                        "linear-gradient(90deg, #ff6b99, #ffae66)",
                        "linear-gradient(90deg, #111111, #4b4b4b)",
                        "linear-gradient(90deg, #8d7bff, #76a9ff)",
                        "linear-gradient(90deg, #f7c948, #ffe88a)",
                        "linear-gradient(90deg, #41c7b9, #99f6e4)",
                        "linear-gradient(90deg, #ff8e6e, #ffd1b8)",
                      ][index],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glow-panel sticker-card rounded-[32px] p-6 sm:p-8">
          <div className="inline-flex rounded-full bg-[#111111] px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-white">
            速览
          </div>
          <p className="mt-4 text-lg font-semibold leading-8 text-neutral-800">{result.persona.stereotype}</p>
          <div className="mt-5 rounded-[22px] border border-neutral-200 bg-[#fff8ef] p-4">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-400">场景</div>
            <p className="mt-2 text-base font-medium leading-7 text-neutral-700">{result.persona.scene}</p>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {result.persona.traits.map((trait) => (
              <span key={trait} className="rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-700 shadow-sm">
                {trait}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="glow-panel sticker-card mt-6 rounded-[32px] p-6 sm:p-8">
        <h2 className="text-2xl font-black text-neutral-950">MBTI</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {mbtiOptions.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setMbti(item)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${mbti === item ? "bg-neutral-950 text-white shadow-lg shadow-black/10" : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"}`}
            >
              {item}
            </button>
          ))}
        </div>
        {mbtiComment ? (
          <div className="mt-4 rounded-[24px] border border-neutral-200 bg-[#fff8ef] p-4">
            <p className="text-base font-medium leading-7 text-neutral-700">{mbtiComment}</p>
          </div>
        ) : null}
      </section>

      <section className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5"
        >
          <span className="text-white">分享我的人格</span>
          <span aria-hidden="true" className="text-white">
            ↗
          </span>
        </button>
        <Link
          href="/quiz"
          className="rounded-full border border-neutral-300 bg-white px-6 py-3 font-semibold text-neutral-900 transition hover:border-neutral-900"
        >
          再测一次
        </Link>
        <Link href="/atlas" className="rounded-full border border-neutral-300 px-6 py-3 font-semibold text-neutral-900">
          逛人格图鉴
        </Link>
        {shareState === "shared" ? (
          <span className="text-sm font-medium text-neutral-500">已打开系统分享</span>
        ) : null}
        {shareState === "copied" ? (
          <span className="text-sm font-medium text-neutral-500">分享文案和链接已复制</span>
        ) : null}
        {shareState === "error" ? (
          <span className="text-sm font-medium text-red-500">当前环境不支持自动分享</span>
        ) : null}
      </section>
    </div>
  );
}
