import { hiddenPersonaProfiles, personas } from "@/data/personas";
import {
  dimensionLabels,
  hiddenPersonaRules,
  hiddenQuestions,
  type DimensionKey,
  type HiddenQuestion,
  type QuizOption,
  type ScoreMap,
} from "@/data/questions";

export type FullScoreMap = Record<DimensionKey, number>;

export type QuizResult = {
  scores: FullScoreMap;
  percentages: FullScoreMap;
  persona: (typeof personas)[number];
  hiddenPersona: (typeof hiddenPersonaProfiles)[number] | null;
  shareTitle: string;
  primaryTag: string;
};

export const defaultScores: FullScoreMap = {
  X: 0,
  D: 0,
  G: 0,
  T: 0,
  Q: 0,
  R: 0,
};

export function addScores(base: FullScoreMap, delta: ScoreMap): FullScoreMap {
  return {
    X: base.X + (delta.X ?? 0),
    D: base.D + (delta.D ?? 0),
    G: base.G + (delta.G ?? 0),
    T: base.T + (delta.T ?? 0),
    Q: base.Q + (delta.Q ?? 0),
    R: base.R + (delta.R ?? 0),
  };
}

export function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function evaluateCondition(condition: string, scores: FullScoreMap): boolean {
  const expression = condition.replace(/([A-Z])/g, 'scores.$1');
  const safeEval = new Function('scores', `return (${expression});`);
  return Boolean(safeEval(scores));
}

export function pickHiddenQuestion(scores: FullScoreMap): HiddenQuestion | null {
  const directHiddenMatch = getTriggeredHiddenPersonaIds(scores);
  if (directHiddenMatch.length > 0) {
    return hiddenQuestions.find((question) => question.id === "H4") ?? null;
  }

  return (
    hiddenQuestions.find(
      (question) => question.id !== "H4" && evaluateCondition(question.trigger, scores),
    ) ?? null
  );
}

export function getTriggeredHiddenPersonaIds(scores: FullScoreMap): string[] {
  return hiddenPersonaRules
    .filter((rule) => evaluateCondition(rule.condition, scores))
    .map((rule) => rule.id);
}

export function resolveHiddenPersonaFromOption(
  option: QuizOption,
  scores: FullScoreMap,
): (typeof hiddenPersonaProfiles)[number] | null {
  const candidates = getTriggeredHiddenPersonaIds(scores);
  const mapping: Record<string, string | null> = {
    A: "hidden-judgement",
    B: "hidden-hamster",
    C: "hidden-midnight",
    D: null,
  };
  const selected = mapping[option.key];
  if (!selected || !candidates.includes(selected)) {
    return null;
  }
  return hiddenPersonaProfiles.find((item) => item.slug === selected) ?? null;
}

function pickMaxKey(
  scores: FullScoreMap,
  candidates: DimensionKey[],
  tiePriority: DimensionKey[],
): DimensionKey {
  const maxValue = Math.max(...candidates.map((key) => scores[key]));
  const maxKeys = candidates.filter((key) => scores[key] === maxValue);
  return tiePriority.find((key) => maxKeys.includes(key)) ?? maxKeys[0];
}

export function getPersonaCode(scores: FullScoreMap): string {
  const axisAKey = pickMaxKey(scores, ["T", "G", "R"], ["G", "R", "T"]);
  const axisBKey = pickMaxKey(scores, ["D", "Q", "X"], ["X", "D", "Q"]);

  const axisA = axisAKey === "T" ? "A1" : axisAKey === "G" ? "A2" : "A3";
  const axisB = axisBKey === "D" ? "B1" : axisBKey === "Q" ? "B2" : "B3";
  const axisC = scores.Q <= 5 ? "C1" : scores.Q <= 10 ? "C2" : "C3";

  return `${axisA}-${axisB}-${axisC}`;
}

export function getPersona(scores: FullScoreMap) {
  const code = getPersonaCode(scores);
  return personas.find((persona) => persona.code === code) ?? personas[0];
}

export function toPercentages(scores: FullScoreMap): FullScoreMap {
  return {
    X: Math.round((scores.X / 15) * 100),
    D: Math.round((scores.D / 15) * 100),
    G: Math.round((scores.G / 15) * 100),
    T: Math.round((scores.T / 15) * 100),
    Q: Math.round((scores.Q / 15) * 100),
    R: Math.round((scores.R / 15) * 100),
  };
}

export function buildResult(
  scores: FullScoreMap,
  hiddenPersona: (typeof hiddenPersonaProfiles)[number] | null,
): QuizResult {
  const persona = getPersona(scores);
  const percentages = toPercentages(scores);
  const topDimension = Object.entries(percentages).sort((a, b) => b[1] - a[1])[0]?.[0] as DimensionKey;
  const primaryTag = dimensionLabels[topDimension];

  return {
    scores,
    percentages,
    persona,
    hiddenPersona,
    shareTitle: hiddenPersona ? hiddenPersona.posterTitle : persona.posterTitle,
    primaryTag,
  };
}

export function getMbtiComment(mbti: string, personaName: string): string {
  if (!mbti) return "";

  const traits: string[] = [];
  if (mbti.startsWith("E")) traits.push("你会把这份节目效果外放给别人看");
  if (mbti.startsWith("I")) traits.push("你会在安静状态下偷偷把戏做满");
  if (mbti.includes("N")) traits.push("你会更偏爱脑洞和怪味延伸");
  if (mbti.includes("S")) traits.push("你会把离谱感落到具体使用场景里");
  if (mbti.includes("F")) traits.push("情绪投射会比嘴硬更明显");
  if (mbti.includes("T")) traits.push("你会把损和判断包装得更利落");
  if (mbti.endsWith("J")) traits.push("连发疯都带一点编排和秩序");
  if (mbti.endsWith("P")) traits.push("你的节目效果更随缘，也更突然");

  return `${mbti} × ${personaName}：${traits.slice(0, 2).join('，')}。`;
}
