export const miniProgramEntryContextKey = "sticker-persona-entry-context";

export type MiniProgramEntryContext = {
  from: string;
  nickname: string;
};

type MiniProgramResultPayload = {
  persona: { code: string; slug: string; name: string };
  primaryTag: string;
  styleKeywords: string[];
  addictionTotal: number;
};

type WechatMiniProgramBridge = {
  navigateTo: (options: { url: string }) => void;
  postMessage?: (options: { data: unknown }) => void;
};

declare global {
  interface Window {
    __wxjs_environment?: string;
    wx?: {
      miniProgram?: WechatMiniProgramBridge;
    };
  }
}

const emptyContext: MiniProgramEntryContext = {
  from: "",
  nickname: "",
};

function sanitizeText(value: string | null, maxLength = 40) {
  return (value || "").trim().slice(0, maxLength);
}

function readSessionContext(): MiniProgramEntryContext {
  if (typeof window === "undefined") return emptyContext;

  try {
    const raw = window.sessionStorage.getItem(miniProgramEntryContextKey);
    if (!raw) return emptyContext;
    const parsed = JSON.parse(raw) as Partial<MiniProgramEntryContext>;
    return {
      from: sanitizeText(parsed.from || "", 24),
      nickname: sanitizeText(parsed.nickname || "", 24),
    };
  } catch {
    return emptyContext;
  }
}

function writeSessionContext(context: MiniProgramEntryContext) {
  if (typeof window === "undefined") return;

  try {
    window.sessionStorage.setItem(miniProgramEntryContextKey, JSON.stringify(context));
  } catch {
    // Session storage is optional in some embedded browsers.
  }
}

export function persistMiniProgramEntryContext(searchParams: URLSearchParams): MiniProgramEntryContext {
  const from = sanitizeText(searchParams.get("from"), 24).toLowerCase();
  const nickname = sanitizeText(searchParams.get("nickname"), 24);
  const current = readSessionContext();

  if (from === "miniprogram" || nickname) {
    const next = {
      from: from || current.from || "miniprogram",
      nickname: nickname || current.nickname,
    };
    writeSessionContext(next);
    return next;
  }

  return current;
}

export function readMiniProgramEntryContext(): MiniProgramEntryContext {
  return readSessionContext();
}

function isMiniProgramRuntime() {
  if (typeof window === "undefined") return false;
  if (window.__wxjs_environment === "miniprogram") return true;
  const userAgent = window.navigator?.userAgent?.toLowerCase() || "";
  return userAgent.includes("miniprogram");
}

export function shouldShowMiniProgramReturn(): boolean {
  const context = readMiniProgramEntryContext();
  return context.from === "miniprogram" || isMiniProgramRuntime();
}

export function returnPersonaResultToMiniProgram(result: MiniProgramResultPayload): boolean {
  if (typeof window === "undefined") return false;

  const miniProgram = window.wx?.miniProgram;
  if (!miniProgram?.navigateTo) return false;

  const payload = {
    personaCode: result.persona.code,
    personaSlug: result.persona.slug,
    personaName: result.persona.name,
    primaryTag: result.primaryTag,
    keywords: result.styleKeywords.slice(0, 8).join(","),
    addictionTotal: result.addictionTotal,
  };

  const query = new URLSearchParams();
  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    query.set(key, String(value));
  });

  const url = `/pages/persona/result/index?${query.toString()}`;
  miniProgram.postMessage?.({
    data: {
      type: "sticker-persona-result",
      payload,
    },
  });
  miniProgram.navigateTo({ url });
  return true;
}

export {};
