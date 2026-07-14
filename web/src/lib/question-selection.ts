import {
  addictionQuestions,
  personalityDimensions,
  personalityQuestionGroups,
  styleQuestions,
  type QuizItem,
} from "@/data/questions";

const RANDOM_UINT32_MAX = 0x100000000;
export const PERSONALITY_QUESTIONS_PER_DIMENSION = 4;
export const STYLE_QUESTIONS_PER_QUIZ = 2;
export const ADDICTION_QUESTIONS_PER_QUIZ = 2;
export const QUIZ_TOTAL_QUESTION_COUNT =
  personalityDimensions.length * PERSONALITY_QUESTIONS_PER_DIMENSION +
  STYLE_QUESTIONS_PER_QUIZ +
  ADDICTION_QUESTIONS_PER_QUIZ;

function getCryptoApi(): Crypto | null {
  if (typeof globalThis.crypto === "undefined" || typeof globalThis.crypto.getRandomValues !== "function") {
    return null;
  }
  return globalThis.crypto;
}

export function secureRandomInt(maxExclusive: number): number {
  if (!Number.isInteger(maxExclusive) || maxExclusive <= 0) {
    throw new Error(`Invalid maxExclusive: ${maxExclusive}`);
  }

  const cryptoApi = getCryptoApi();
  if (!cryptoApi) {
    return Math.floor(Math.random() * maxExclusive);
  }

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

export function secureShuffle<T>(items: readonly T[]): T[] {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = secureRandomInt(index + 1);
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function takeShuffled<T>(items: readonly T[], count: number): T[] {
  return secureShuffle(items).slice(0, count);
}

export function buildQuizItems(): QuizItem[] {
  const personalityItems = personalityDimensions.flatMap((dimension) =>
    takeShuffled(personalityQuestionGroups[dimension.key], PERSONALITY_QUESTIONS_PER_DIMENSION),
  );
  const styleItems = takeShuffled(styleQuestions, STYLE_QUESTIONS_PER_QUIZ);
  const addictionItems = takeShuffled(addictionQuestions, ADDICTION_QUESTIONS_PER_QUIZ);

  return secureShuffle([...personalityItems, ...styleItems, ...addictionItems]);
}
