import { mainQuestions, type DimensionKey, type MainQuestion } from "@/data/questions";

export const QUESTION_BANK_SIZE = 40;
export const MAIN_DRAW_COUNT = 30;
export const DIMENSION_TARGETS: Record<DimensionKey, number> = {
  X: 5,
  D: 5,
  G: 5,
  T: 5,
  Q: 5,
  R: 5,
};

export type DrawHistory = {
  drawCount: number;
  drawsById: Record<string, number>;
  lastSelectionIds: string[];
  lastOrderedIds: string[];
};

export type DrawMeta = {
  overlapWithPrevious: number;
  samePositionCount: number;
};

export type DrawResult = {
  questions: MainQuestion[];
  history: DrawHistory;
  meta: DrawMeta;
};

const RANDOM_UINT32_MAX = 0x100000000;

export function createEmptyDrawHistory(): DrawHistory {
  return {
    drawCount: 0,
    drawsById: {},
    lastSelectionIds: [],
    lastOrderedIds: [],
  };
}

function getCryptoApi(): Crypto {
  if (typeof globalThis.crypto === "undefined") {
    throw new Error("Crypto API is unavailable in this environment.");
  }
  return globalThis.crypto;
}

export function secureRandomInt(maxExclusive: number): number {
  if (!Number.isInteger(maxExclusive) || maxExclusive <= 0) {
    throw new Error(`Invalid maxExclusive: ${maxExclusive}`);
  }

  const cryptoApi = getCryptoApi();
  const buffer = new Uint32Array(1);
  const cutoff = RANDOM_UINT32_MAX - (RANDOM_UINT32_MAX % maxExclusive);

  while (true) {
    cryptoApi.getRandomValues(buffer);
    const value = buffer[0];
    if (value < cutoff) {
      return value % maxExclusive;
    }
  }
}

function secureRandomFloat(): number {
  return secureRandomInt(RANDOM_UINT32_MAX) / RANDOM_UINT32_MAX;
}

export function secureShuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = secureRandomInt(index + 1);
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

export function validateQuestionBank(questions: MainQuestion[]): void {
  if (questions.length !== QUESTION_BANK_SIZE) {
    throw new Error(`Question bank must contain ${QUESTION_BANK_SIZE} items. Received ${questions.length}.`);
  }

  for (const [dimension, target] of Object.entries(DIMENSION_TARGETS) as [DimensionKey, number][]) {
    const count = questions.filter((question) => question.dimension === dimension).length;
    if (count < target) {
      throw new Error(`Dimension ${dimension} requires at least ${target} questions. Received ${count}.`);
    }
  }
}

function getQuestionWeight(question: MainQuestion, history: DrawHistory, lastSelectionIds: Set<string>): number {
  const drawCount = history.drawsById[question.id] ?? 0;
  const fairnessWeight = 1 / (1 + drawCount);
  const recentPenalty = lastSelectionIds.has(question.id) ? 0.38 : 1;
  return fairnessWeight * recentPenalty;
}

function pickWeightedIndex(weights: number[]): number {
  const totalWeight = weights.reduce((sum, value) => sum + value, 0);
  if (totalWeight <= 0) {
    return secureRandomInt(weights.length);
  }

  const threshold = secureRandomFloat() * totalWeight;
  let cursor = 0;
  for (let index = 0; index < weights.length; index += 1) {
    cursor += weights[index];
    if (threshold < cursor) {
      return index;
    }
  }

  return weights.length - 1;
}

function sampleWithoutReplacement(
  pool: MainQuestion[],
  count: number,
  history: DrawHistory,
  lastSelectionIds: Set<string>,
): MainQuestion[] {
  const candidates = [...pool];
  const picked: MainQuestion[] = [];

  while (picked.length < count && candidates.length > 0) {
    const weights = candidates.map((question) => getQuestionWeight(question, history, lastSelectionIds));
    const pickIndex = pickWeightedIndex(weights);
    picked.push(candidates[pickIndex]);
    candidates.splice(pickIndex, 1);
  }

  if (picked.length !== count) {
    throw new Error(`Unable to draw ${count} unique questions from a pool of ${pool.length}.`);
  }

  return picked;
}

function buildCandidate(questions: MainQuestion[], history: DrawHistory): MainQuestion[] {
  const lastSelectionIds = new Set(history.lastSelectionIds);
  const byDimension = new Map<DimensionKey, MainQuestion[]>();

  for (const question of questions) {
    const bucket = byDimension.get(question.dimension) ?? [];
    bucket.push(question);
    byDimension.set(question.dimension, bucket);
  }

  const picked: MainQuestion[] = [];
  for (const [dimension, target] of Object.entries(DIMENSION_TARGETS) as [DimensionKey, number][]) {
    const pool = byDimension.get(dimension) ?? [];
    picked.push(...sampleWithoutReplacement(pool, target, history, lastSelectionIds));
  }

  return secureShuffle(picked);
}

function getCandidateMeta(candidate: MainQuestion[], history: DrawHistory): DrawMeta {
  const lastSelectionIds = new Set(history.lastSelectionIds);
  const overlapWithPrevious = candidate.reduce((count, question) => {
    return count + (lastSelectionIds.has(question.id) ? 1 : 0);
  }, 0);

  const samePositionCount = candidate.reduce((count, question, index) => {
    return count + (history.lastOrderedIds[index] === question.id ? 1 : 0);
  }, 0);

  return { overlapWithPrevious, samePositionCount };
}

function getCandidateScore(candidate: MainQuestion[], history: DrawHistory): number {
  const meta = getCandidateMeta(candidate, history);
  return meta.overlapWithPrevious * 10 + meta.samePositionCount * 3;
}

function recordHistory(history: DrawHistory, selectedQuestions: MainQuestion[]): DrawHistory {
  const nextCounts = { ...history.drawsById };
  for (const question of selectedQuestions) {
    nextCounts[question.id] = (nextCounts[question.id] ?? 0) + 1;
  }

  return {
    drawCount: history.drawCount + 1,
    drawsById: nextCounts,
    lastSelectionIds: selectedQuestions.map((question) => question.id).sort(),
    lastOrderedIds: selectedQuestions.map((question) => question.id),
  };
}

export function selectQuestions(
  questions: MainQuestion[] = mainQuestions,
  history: DrawHistory = createEmptyDrawHistory(),
): DrawResult {
  validateQuestionBank(questions);

  let bestCandidate: MainQuestion[] | null = null;
  let bestScore = Number.POSITIVE_INFINITY;

  for (let attempt = 0; attempt < 8; attempt += 1) {
    const candidate = buildCandidate(questions, history);
    const score = getCandidateScore(candidate, history);
    if (score < bestScore) {
      bestScore = score;
      bestCandidate = candidate;
    }
  }

  if (!bestCandidate) {
    throw new Error("Failed to generate a question set.");
  }

  return {
    questions: bestCandidate,
    history: recordHistory(history, bestCandidate),
    meta: getCandidateMeta(bestCandidate, history),
  };
}
