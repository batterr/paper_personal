"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { getPersonaImageSrc, hiddenPersonaProfiles, personas } from "@/data/personas";
import { dimensionLabels } from "@/data/questions";
import { getAddictionLevel, getMbtiComment } from "@/lib/scoring";

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
  styleKeywords: string[];
  addictionTotal: number;
  addictionLevel: {
    name: string;
    description: string;
  };
};

type SharedResultPayload = {
  scores: Record<string, number>;
  percentages: Record<string, number>;
  personaCode: string;
  hiddenPersonaSlug: string | null;
  shareTitle: string;
  primaryTag: string;
  styleKeywords: string[];
  addictionTotal: number;
};

type TheaterScene = {
  theme: string;
  label: string;
  colors: [string, string, string];
  props: [string, string, string];
  particles: [string, string, string, string];
  motion: "rush" | "float" | "stamp" | "explode" | "archive" | "lab" | "blueprint" | "zen";
};

const defaultTheaterScene: TheaterScene = {
  theme: "default",
  label: "随缘开奖现场",
  colors: ["#ff8cb3", "#dff675", "#7db4ff"],
  props: ["随机灵感", "贴纸残影", "结果闪光"],
  particles: ["贴", "撕", "藏", "评"],
  motion: "float",
};

const personaTheaterScenes: Record<string, TheaterScene> = {
  "ceping-juanwang": {
    theme: "ranking",
    label: "榜单卷王冲刺夜",
    colors: ["#ff5c8a", "#ffe66d", "#7db4ff"],
    props: ["排行榜", "红笔长评", "爆肝报告"],
    particles: ["TOP", "+1", "避雷", "满分"],
    motion: "rush",
  },
  "shuangtie-kuaizuixia": {
    theme: "quick-mouth",
    label: "三秒贴完锐评现场",
    colors: ["#ff7a45", "#ffe066", "#57e0ff"],
    props: ["快贴闪电", "吐槽气泡", "废弃纸屑"],
    particles: ["爽", "快", "扔", "评"],
    motion: "rush",
  },
  "gudu-huanyuanjiang": {
    theme: "restore",
    label: "深夜还原工坊",
    colors: ["#5eead4", "#d9f99d", "#93c5fd"],
    props: ["修复台", "收纳册", "静音灯"],
    particles: ["对齐", "复原", "封存", "勿扰"],
    motion: "archive",
  },
  "yicixing-kuaigan": {
    theme: "candy",
    label: "糖霜冲锋短快乐",
    colors: ["#ff9ecb", "#ffe17a", "#8be9fd"],
    props: ["冰淇淋盔", "糖粒雨", "一次性烟花"],
    particles: ["甜", "爽", "砰", "忘"],
    motion: "explode",
  },
  "xijie-kaoguxuejia": {
    theme: "cosmic-miner",
    label: "宇宙细节矿场",
    colors: ["#7c3aed", "#38bdf8", "#facc15"],
    props: ["星核钻头", "显微镜", "论文碎片"],
    particles: ["0.1mm", "证据", "拆解", "矿屑"],
    motion: "lab",
  },
  "leziren-pohuaizhe": {
    theme: "volcano",
    label: "火山梗评爆发区",
    colors: ["#ff3d00", "#ffb703", "#7f1d1d"],
    props: ["吐槽火山", "熔岩贴纸", "评论弹幕"],
    particles: ["哈哈", "翻车", "爆", "离谱"],
    motion: "explode",
  },
  "cangpin-gaizaoren": {
    theme: "treasure",
    label: "私人藏宝改造室",
    colors: ["#f59e0b", "#34d399", "#a78bfa"],
    props: ["藏宝柜", "改造刀", "上锁档案"],
    particles: ["私藏", "改", "封存", "勿晒"],
    motion: "archive",
  },
  "suixing-langzi": {
    theme: "drifter",
    label: "撕下就走公路片",
    colors: ["#fb923c", "#22d3ee", "#fef08a"],
    props: ["路标", "风中贴纸", "一次性背包"],
    particles: ["随缘", "出发", "不回头", "路过"],
    motion: "float",
  },
  "koubei-banyungong": {
    theme: "conveyor",
    label: "口碑传送带工位",
    colors: ["#60a5fa", "#f8fafc", "#22c55e"],
    props: ["评价传送带", "盖章机", "避雷清单"],
    particles: ["已测", "搬运", "靠谱", "等等党"],
    motion: "stamp",
  },
  "xingjiabi-pinglunjia": {
    theme: "price",
    label: "冷血性价比法庭",
    colors: ["#0f172a", "#22c55e", "#facc15"],
    props: ["计算器", "价格牌", "质检灯"],
    particles: ["值吗", "-3元", "不亏", "退"],
    motion: "stamp",
  },
  "yinxing-shoujizhe": {
    theme: "secret-archive",
    label: "都市传说库存库",
    colors: ["#64748b", "#c4b5fd", "#67e8f9"],
    props: ["暗格抽屉", "编号卡", "防窥玻璃"],
    particles: ["编号", "绝版", "藏好", "无人见"],
    motion: "archive",
  },
  "foxi-xiaoqianjia": {
    theme: "zen",
    label: "佛系午后消遣台",
    colors: ["#86efac", "#fde68a", "#93c5fd"],
    props: ["茶杯", "慢云", "抽屉角落"],
    particles: ["随喜", "不争", "放下", "也行"],
    motion: "zen",
  },
  "jiegouzhuyi-dashi": {
    theme: "blueprint",
    label: "疯狂拆解设计局",
    colors: ["#38bdf8", "#e0f2fe", "#f472b6"],
    props: ["蓝图网格", "标注线", "零件爆炸图"],
    particles: ["拆", "重组", "结构", "天才"],
    motion: "blueprint",
  },
  "tucaoyi-pingceyuan": {
    theme: "roast",
    label: "评论区脱口秀舞台",
    colors: ["#f97316", "#fde047", "#fb7185"],
    props: ["红笔", "梗评卡", "弹幕灯牌"],
    particles: ["好笑", "打折", "锐评", "梗"],
    motion: "stamp",
  },
  "gudu-shiyanjia": {
    theme: "lab",
    label: "冷门贴纸实验室",
    colors: ["#22d3ee", "#a78bfa", "#e879f9"],
    props: ["试管", "危险灯", "实验记录"],
    particles: ["样本", "冷门", "观察", "变异"],
    motion: "lab",
  },
  "suixing-tiyanshi": {
    theme: "empty-hands",
    label: "贴完即空修行场",
    colors: ["#f8fafc", "#a7f3d0", "#f9a8d4"],
    props: ["空白底纸", "风铃", "随机骰子"],
    particles: ["无贴", "随缘", "经过", "空"],
    motion: "zen",
  },
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
      styleKeywords: payload.styleKeywords ?? [],
      addictionTotal: payload.addictionTotal ?? 0,
      addictionLevel: getAddictionLevel(payload.addictionTotal ?? 0),
    };
  } catch {
    return null;
  }
}

function PersonaDynamicPoster({ result }: { result: StoredResult }) {
  const scene = personaTheaterScenes[result.persona.slug] ?? defaultTheaterScene;
  const sceneStyle = {
    "--scene-a": scene.colors[0],
    "--scene-b": scene.colors[1],
    "--scene-c": scene.colors[2],
  } as CSSProperties;

  return (
    <div
      className={`persona-dynamic-poster persona-scene-${scene.theme} persona-motion-${scene.motion}`}
      style={sceneStyle}
    >
      <div className="persona-dynamic-sky" />
      <div className="persona-dynamic-grid" />
      <div className="persona-dynamic-title">{scene.label}</div>
      <div className="persona-dynamic-aura persona-dynamic-aura-a" />
      <div className="persona-dynamic-aura persona-dynamic-aura-b" />
      <div className="persona-dynamic-aura persona-dynamic-aura-c" />

      <div className="persona-dynamic-image">
        <Image
          src={getPersonaImageSrc(result.persona)}
          alt={`${result.persona.name}人格插图`}
          width={780}
          height={540}
          priority
          className="h-full w-full object-cover"
        />
      </div>

      {scene.props.map((prop, index) => (
        <span key={prop} className={`persona-dynamic-prop persona-dynamic-prop-${index + 1}`}>
          {prop}
        </span>
      ))}

      {scene.particles.map((particle, index) => (
        <span key={`${particle}-${index}`} className={`persona-dynamic-particle persona-dynamic-particle-${index + 1}`}>
          {particle}
        </span>
      ))}

      <div className="persona-dynamic-floor" />
    </div>
  );
}

function PersonaTheater({
  result,
  autoCloseMs,
  onClose,
}: {
  result: StoredResult;
  autoCloseMs?: number;
  onClose: () => void;
}) {
  const orderedPersonas = [
    result.persona,
    ...personas.filter((persona) => persona.slug !== result.persona.slug),
  ];
  const styleKeywordText = result.styleKeywords.length > 0 ? result.styleKeywords.slice(0, 3).join(" / ") : "自由造景";

  useEffect(() => {
    if (!autoCloseMs) return;

    const timer = window.setTimeout(() => {
      onClose();
    }, autoCloseMs);

    return () => {
      window.clearTimeout(timer);
    };
  }, [autoCloseMs, onClose]);

  return (
    <div className="persona-theater fixed inset-0 z-50 overflow-hidden bg-[#0f1117] text-white">
      <div className="persona-theater-orbit persona-theater-orbit-a" />
      <div className="persona-theater-orbit persona-theater-orbit-b" />
      <button
        type="button"
        onClick={onClose}
        aria-label="关闭人格小剧场"
        className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl font-light text-white backdrop-blur transition hover:bg-white hover:text-neutral-950"
      >
        ×
      </button>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-7 sm:px-8">
        <div className="flex items-center justify-between gap-4 text-xs font-black uppercase tracking-[0.28em] text-white/60">
          <button
            type="button"
            onClick={onClose}
            aria-label="返回结果页"
            className="inline-flex items-center rounded-full border border-white/18 bg-white/10 px-4 py-2 font-black text-white/78 backdrop-blur transition hover:bg-white hover:text-neutral-950"
          >
            ← {autoCloseMs ? "跳过，返回结果页" : "返回结果页"}
          </button>
          <span>{result.persona.code}</span>
        </div>

        <div className="grid flex-1 items-center gap-7 py-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="persona-theater-copy">
            <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-white/75 backdrop-blur">
              {result.addictionLevel.name}
            </div>
            <h2 className="mt-6 text-5xl font-black leading-[0.9] text-white sm:text-7xl lg:text-8xl">
              {result.persona.name}
            </h2>
            <div className="mt-5 inline-flex rounded-full bg-[#dff675] px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-neutral-950">
              {result.persona.chinlish}
            </div>
            <p className="mt-6 max-w-xl text-lg font-semibold leading-8 text-white/78 sm:text-2xl">
              {result.persona.oneLiner}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full bg-white px-4 py-2 text-sm font-black text-neutral-950">
                {result.primaryTag}
              </span>
              <span className="rounded-full border border-white/18 bg-white/10 px-4 py-2 text-sm font-black text-white backdrop-blur">
                {styleKeywordText}
              </span>
            </div>
          </div>

          <div className="persona-theater-hero-wrap">
            <div className="persona-theater-hero">
              <PersonaDynamicPoster result={result} />
            </div>
            <div className="persona-theater-caption">
              <span>{result.persona.posterTitle}</span>
              <span>{result.persona.traits.join(" · ")}</span>
            </div>
          </div>
        </div>

        <div className="persona-theater-reel">
          <div className="persona-theater-track">
            {[...orderedPersonas, ...orderedPersonas].map((persona, index) => (
              <div key={`${persona.slug}-${index}`} className="persona-theater-thumb">
                <Image
                  src={getPersonaImageSrc(persona)}
                  alt={`${persona.name}人格插图`}
                  width={180}
                  height={126}
                  className="h-full w-full object-cover"
                />
                <span>{persona.name}</span>
              </div>
            ))}
          </div>
        </div>

        {autoCloseMs ? (
          <div className="persona-theater-autonote">播放结束后自动回到结果页</div>
        ) : null}
        <div className="persona-theater-progress" />
      </div>
    </div>
  );
}

export function ResultClient() {
  const [mbti, setMbti] = useState("");
  const [shareState, setShareState] = useState<"idle" | "shared" | "copied" | "error">("idle");
  const [theaterOpen, setTheaterOpen] = useState(false);
  const [theaterAutoClose, setTheaterAutoClose] = useState(false);
  const [introTheaterRequested, setIntroTheaterRequested] = useState(false);
  const [introTheaterConsumed, setIntroTheaterConsumed] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [isSharedView, setIsSharedView] = useState(false);
  const [sharedResult, setSharedResult] = useState<StoredResult | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const encodedResult = searchParams.get("r");
    const isSharedResultPage = Boolean(encodedResult);
    const decodedResult = decodeSharePayload(encodedResult);
    const shouldPlayIntroTheater = !isSharedResultPage && searchParams.get("theater") === "1";

    const timer = window.setTimeout(() => {
      setIsSharedView(isSharedResultPage);
      setSharedResult(decodedResult);
      setIntroTheaterRequested(shouldPlayIntroTheater);
      setHydrated(true);
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  const result = useMemo<StoredResult | null>(() => {
    if (!hydrated) return null;
    if (isSharedView) return sharedResult;
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<StoredResult>;
    if (!parsed.persona) return null;

    return {
      scores: parsed.scores ?? {},
      percentages: parsed.percentages ?? {},
      persona: parsed.persona,
      hiddenPersona: parsed.hiddenPersona ?? null,
      shareTitle: parsed.shareTitle ?? parsed.persona.posterTitle,
      primaryTag: parsed.primaryTag ?? parsed.persona.traits[0] ?? "贴纸人格",
      styleKeywords: parsed.styleKeywords ?? [],
      addictionTotal: parsed.addictionTotal ?? 0,
      addictionLevel: parsed.addictionLevel ?? getAddictionLevel(parsed.addictionTotal ?? 0),
    };
  }, [hydrated, isSharedView, sharedResult]);

  useEffect(() => {
    if (!theaterOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setTheaterOpen(false);
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [theaterOpen]);

  useEffect(() => {
    if (!result || theaterOpen || !introTheaterRequested || introTheaterConsumed) return;

    const timer = window.setTimeout(() => {
      setIntroTheaterConsumed(true);
      setTheaterAutoClose(true);
      setTheaterOpen(true);
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [introTheaterConsumed, introTheaterRequested, result, theaterOpen]);

  if (!hydrated) {
    return (
      <div className="noise-grid mx-auto flex min-h-screen max-w-3xl flex-col items-start justify-center px-4 py-16 sm:px-6">
        <div className="sticker-card rounded-[32px] p-6 sm:p-8">
          <div className="mono-kicker text-xs font-semibold text-neutral-500">Sticker Persona Result</div>
          <h1 className="mt-4 text-4xl font-black text-neutral-950">正在生成测试结果</h1>
          <p className="mt-4 text-lg text-neutral-600">你的贴纸人格卡马上出现。</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-start justify-center px-4 py-16 sm:px-6">
        <h1 className="text-4xl font-black text-neutral-950">{isSharedView ? "这个分享链接失效了。" : "还没有测试结果。"}</h1>
        <p className="mt-4 text-lg text-neutral-600">
          {isSharedView ? "可能是链接不完整，或者结果数据没有成功带上。" : "完成测试后，这里会生成你的贴纸人格结果。"}
        </p>
        <Link
          href="/quiz"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-neutral-950 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5"
        >
          <span className="text-white">{isSharedView ? "测出我的人格" : "开始测试"}</span>
          <span aria-hidden="true" className="text-white">
            →
          </span>
        </Link>
      </div>
    );
  }

  const title = result.persona.name;
  const chinlish = result.persona.chinlish;
  const subtitle = result.persona.oneLiner;
  const mbtiComment = getMbtiComment(mbti, title);
  const styleKeywordText = result.styleKeywords.length > 0 ? result.styleKeywords.join("、") : "暂时没有明显画风偏好";
  const theaterButtonText = isSharedView ? "观看 TA 的人格小剧场" : "播放人格小剧场";

  function copyTextWithSelection(text: string) {
    if (typeof document === "undefined") return false;

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "true");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    textarea.style.top = "0";
    textarea.style.opacity = "0";

    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);

    try {
      return document.execCommand("copy");
    } finally {
      document.body.removeChild(textarea);
    }
  }

  async function copyShareText(text: string) {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch {
        return copyTextWithSelection(text);
      }
    }

    return copyTextWithSelection(text);
  }

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
      styleKeywords: activeResult.styleKeywords,
      addictionTotal: activeResult.addictionTotal,
    };

    const shareUrl = new URL("/result", window.location.origin);
    shareUrl.searchParams.set("r", encodeSharePayload(payload));

    const shareData = {
      title: activeResult.shareTitle,
      text: `${title}｜${subtitle}`,
      url: shareUrl.toString(),
    };
    const shareText = `${shareData.text}\n${shareData.url}`;

    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        try {
          await navigator.share(shareData);
          setShareState("shared");
          return;
        } catch (error) {
          if (error instanceof Error && error.name === "AbortError") {
            return;
          }
        }
      }

      const copied = await copyShareText(shareText);
      setShareState(copied ? "copied" : "error");
    } catch {
      const copied = copyTextWithSelection(shareText);
      setShareState(copied ? "copied" : "error");
    }
  }

  function openTheater() {
    setIntroTheaterConsumed(true);
    setTheaterAutoClose(true);
    setTheaterOpen(true);
  }

  function closeTheater() {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (url.searchParams.has("theater")) {
        url.searchParams.delete("theater");
        window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
      }
    }

    setIntroTheaterConsumed(true);
    setTheaterAutoClose(false);
    setTheaterOpen(false);
  }

  return (
    <div className="noise-grid mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 py-6 sm:px-6">
      {theaterOpen ? (
        <PersonaTheater result={result} autoCloseMs={theaterAutoClose ? 6800 : undefined} onClose={closeTheater} />
      ) : null}

      <div className="flex items-center justify-between text-sm text-neutral-500">
        <Link href="/" className="hover:text-neutral-900">首页</Link>
        <Link href="/atlas" className="hover:text-neutral-900">人格图鉴</Link>
      </div>

      {isSharedView ? (
        <div className="mt-6 rounded-[28px] border border-[#d9f99d] bg-[#f2ffd8] px-5 py-4 text-base font-semibold text-neutral-800 shadow-sm">
          这是 TA 的贴纸人格结果。想看你自己的结果，可以从这里开始测。
        </div>
      ) : null}

      <section className="poster-frame glow-panel sticker-card relative mt-8 overflow-hidden rounded-[40px] p-6 sm:p-10">
        <div className="absolute left-4 top-4 rotate-[-8deg] rounded-full border border-black/10 bg-[#fff1a6] px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-neutral-950 shadow-lg sm:text-sm">
          {isSharedView ? "TA 的结果" : "测试结果"}
        </div>
        <div className="absolute right-4 top-6 rotate-[8deg] rounded-full border border-black/10 bg-[#ffd4ea] px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-neutral-950 shadow-lg sm:text-sm">
          贴纸人格卡
        </div>

        <div className="relative grid gap-8 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="mono-kicker text-xs font-semibold text-neutral-500">Sticker Persona Result</div>
            <h1 className="mt-4 text-5xl font-black leading-[0.92] text-neutral-950 sm:text-7xl">
              {title}
            </h1>
            <div className="mt-4 inline-flex rounded-full bg-[#e9f8d5] px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-[#2f7d48]">
              {chinlish}
            </div>
            <p className="mt-5 max-w-2xl text-lg font-medium text-neutral-700 sm:text-2xl">{subtitle}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="sticker-badge result-primary-badge text-sm font-semibold">
                核心倾向：{result.primaryTag}
              </div>
              <div className="sticker-badge result-hidden-badge text-sm font-semibold">
                贴纸瘾：{result.addictionLevel.name}
              </div>
            </div>
            <button
              type="button"
              aria-label="播放人格小剧场"
              onClick={openTheater}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-neutral-950 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5"
            >
              <span className="text-white">{theaterButtonText}</span>
              <span aria-hidden="true" className="text-white">
                ▶
              </span>
            </button>
          </div>
          <Image
            src={getPersonaImageSrc(result.persona)}
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
          <h2 className="text-2xl font-black text-neutral-950">四维画像</h2>
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
                        "linear-gradient(90deg, #41c7b9, #99f6e4)",
                        "linear-gradient(90deg, #111111, #4b4b4b)",
                        "linear-gradient(90deg, #f7c948, #ffe88a)",
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
            结果速览
          </div>
          <p className="mt-4 text-lg font-semibold leading-8 text-neutral-800">{result.persona.stereotype}</p>
          <div className="mt-5 rounded-[22px] border border-neutral-200 bg-[#fff8ef] p-4">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-400">适合场景</div>
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

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="glow-panel sticker-card rounded-[32px] p-6 sm:p-8">
          <h2 className="text-2xl font-black text-neutral-950">画风关键词</h2>
          <p className="mt-4 text-lg font-semibold leading-8 text-neutral-800">{styleKeywordText}</p>
        </div>
        <div className="glow-panel sticker-card rounded-[32px] p-6 sm:p-8">
          <h2 className="text-2xl font-black text-neutral-950">贴纸瘾指数</h2>
          <p className="mt-4 text-lg font-semibold leading-8 text-neutral-800">{result.addictionLevel.name}</p>
          <p className="mt-2 text-base font-medium leading-7 text-neutral-600">{result.addictionLevel.description}</p>
        </div>
      </section>

      {!isSharedView ? (
        <section className="glow-panel sticker-card mt-6 rounded-[32px] p-6 sm:p-8">
          <h2 className="text-2xl font-black text-neutral-950">MBTI 叠加解读</h2>
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
      ) : null}

      <section className="mt-6 flex flex-wrap items-center gap-3">
        {isSharedView ? (
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5"
          >
            <span className="text-white">我也测测</span>
            <span aria-hidden="true" className="text-white">
              →
            </span>
          </Link>
        ) : (
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5"
          >
            <span className="text-white">分享结果</span>
            <span aria-hidden="true" className="text-white">
              ↗
            </span>
          </button>
        )}
        <button
          type="button"
          aria-label="播放小剧场"
          onClick={openTheater}
          className="rounded-full border border-neutral-300 bg-white px-6 py-3 font-semibold text-neutral-900 transition hover:border-neutral-900"
        >
          {theaterButtonText}
        </button>
        {!isSharedView ? (
          <Link
            href="/quiz"
            className="rounded-full border border-neutral-300 bg-white px-6 py-3 font-semibold text-neutral-900 transition hover:border-neutral-900"
          >
            再测一次
          </Link>
        ) : null}
        <Link href="/atlas" className="rounded-full border border-neutral-300 px-6 py-3 font-semibold text-neutral-900">
          浏览图鉴
        </Link>
        {!isSharedView && shareState === "shared" ? (
          <span className="text-sm font-medium text-neutral-500">已打开系统分享</span>
        ) : null}
        {!isSharedView && shareState === "copied" ? (
          <span className="text-sm font-medium text-neutral-500">分享文案和链接已复制，可直接粘贴发送</span>
        ) : null}
        {!isSharedView && shareState === "error" ? (
          <span className="text-sm font-medium text-red-500">复制失败，请手动复制当前页面链接</span>
        ) : null}
      </section>
    </div>
  );
}
