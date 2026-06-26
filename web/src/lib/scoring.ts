import { hiddenPersonaProfiles, personas } from "@/data/personas";
import {
  dimensionLabels,
  personalityDimensions,
  type PersonalityDimensionKey,
} from "@/data/questions";

export type FullScoreMap = Record<PersonalityDimensionKey, number>;

export type AddictionLevel = {
  name: string;
  description: string;
};

export type QuizResult = {
  scores: FullScoreMap;
  percentages: FullScoreMap;
  persona: (typeof personas)[number];
  hiddenPersona: (typeof hiddenPersonaProfiles)[number] | null;
  shareTitle: string;
  primaryTag: string;
  styleKeywords: string[];
  addictionTotal: number;
  addictionLevel: AddictionLevel;
};

export type BuildResultInput = {
  scores: FullScoreMap;
  selectedKeywords: Iterable<string>;
  addictionTotal: number;
};

export const defaultScores: FullScoreMap = {
  buy: 0,
  paste: 0,
  review: 0,
  keep: 0,
};

export function getPersonaCode(scores: FullScoreMap): string {
  return [
    scores.buy >= 3 ? "1" : "0",
    scores.paste >= 3 ? "1" : "0",
    scores.review >= 3 ? "1" : "0",
    scores.keep >= 3 ? "1" : "0",
  ].join("");
}

export function getPersona(scores: FullScoreMap) {
  const code = getPersonaCode(scores);
  return personas.find((persona) => persona.code === code) ?? personas.find((persona) => persona.code === "0000") ?? personas[0];
}

export function toPercentages(scores: FullScoreMap): FullScoreMap {
  return {
    buy: Math.round((scores.buy / 5) * 100),
    paste: Math.round((scores.paste / 5) * 100),
    review: Math.round((scores.review / 5) * 100),
    keep: Math.round((scores.keep / 5) * 100),
  };
}

export function getAddictionLevel(total: number): AddictionLevel {
  if (total <= 1) {
    return {
      name: "还有得救",
      description: "你还在休闲玩家区，贴纸暂时只是生活里的轻量甜点。",
    };
  }

  if (total <= 3) {
    return {
      name: "施主，回头是岸",
      description: "已经有点上头，但还没完全把生活让位给造景贴纸。",
    };
  }

  if (total <= 5) {
    return {
      name: "40度高烧发烧友",
      description: "你的贴纸热度已经接近发烧，看到新图会明显心跳加速。",
    };
  }

  return {
    name: "你将全职进入造景世界",
    description: "现实只是补给站，造景贴纸才是你的主线任务。",
  };
}

export function buildResult(input: BuildResultInput): QuizResult {
  const persona = getPersona(input.scores);
  const percentages = toPercentages(input.scores);
  const topDimension =
    personalityDimensions
      .map((dimension) => dimension.key)
      .sort((left, right) => percentages[right] - percentages[left])[0] ?? "buy";

  const styleKeywords = [...new Set(input.selectedKeywords)];

  return {
    scores: input.scores,
    percentages,
    persona,
    hiddenPersona: null,
    shareTitle: persona.posterTitle,
    primaryTag: dimensionLabels[topDimension],
    styleKeywords,
    addictionTotal: input.addictionTotal,
    addictionLevel: getAddictionLevel(input.addictionTotal),
  };
}

export function getMbtiComment(mbti: string, personaName: string): string {
  if (!mbti) return "";

  const traits: string[] = [];
  if (mbti.startsWith("E")) traits.push("你更容易把贴纸体验分享给别人看");
  if (mbti.startsWith("I")) traits.push("你更习惯在安静状态里慢慢完成自己的贴纸页");
  if (mbti.includes("N")) traits.push("你会更偏爱脑洞和氛围延伸");
  if (mbti.includes("S")) traits.push("你会把喜好落到具体使用场景里");
  if (mbti.includes("F")) traits.push("情绪投射会更明显");
  if (mbti.includes("T")) traits.push("你会把判断表达得更利落");
  if (mbti.endsWith("J")) traits.push("你的贴纸过程更有编排和秩序");
  if (mbti.endsWith("P")) traits.push("你的贴纸灵感更随性，也更突然");

  return `${mbti} × ${personaName}：${traits.slice(0, 2).join("，")}。`;
}
