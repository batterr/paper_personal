import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { personas } from "../src/data/personas";
import {
  addictionQuestions,
  allQuizItems,
  personalityDimensions,
  personalityQuestionGroups,
  styleQuestions,
} from "../src/data/questions";
import { buildResult, defaultScores, getAddictionLevel, getPersonaCode } from "../src/lib/scoring";
import {
  ADDICTION_QUESTIONS_PER_QUIZ,
  buildQuizItems,
  PERSONALITY_QUESTIONS_PER_DIMENSION,
  QUIZ_TOTAL_QUESTION_COUNT,
  STYLE_QUESTIONS_PER_QUIZ,
} from "../src/lib/question-selection";

function runValidation() {
  assert.ok(personalityQuestionGroups, "题库需要导出 personalityQuestionGroups");
  assert.ok(personalityDimensions, "题库需要导出 personalityDimensions");
  assert.ok(allQuizItems, "题库需要导出 allQuizItems");

  const personalityQuestions = Object.values(personalityQuestionGroups).flat();

  assert.equal(personalityQuestions.length, 20, "人格题必须正好 20 题");
  assert.equal(styleQuestions.length, 4, "画风题必须正好 4 题");
  assert.equal(addictionQuestions.length, 4, "沉迷浓度题必须正好 4 题");
  assert.equal(allQuizItems.length, 28, "总题量必须正好 28 题");
  assert.equal(QUIZ_TOTAL_QUESTION_COUNT, 20, "单次测试必须正好 20 题");
  assert.equal(personas.length, 16, "人格结果必须正好 16 个");

  for (const dimension of personalityDimensions) {
    const questions = personalityQuestionGroups[dimension.key];
    assert.equal(questions.length, 5, `${dimension.key} 维度必须正好 5 题`);
    for (const question of questions) {
      assert.equal(question.options.length, 2, `${question.id} 必须是二选一人格题`);
      assert.ok(
        question.options.every((option) => option.score === 0 || option.score === 1),
        `${question.id} 的人格分值必须是 0 或 1`,
      );
    }
  }

  for (const question of styleQuestions) {
    assert.ok(question.options.length >= 2, `${question.id} 至少需要 2 个画风选项`);
    assert.equal(question.options.length, question.keywordMapping.length, `${question.id} 画风映射数量不匹配`);
    assert.ok(
      question.keywordMapping.every((keywords) => keywords.length > 0),
      `${question.id} 每个画风选项都必须映射至少一个关键词`,
    );
  }

  for (const question of addictionQuestions) {
    assert.equal(question.options.length, question.scores.length, `${question.id} 沉迷分值数量不匹配`);
  }

  const expectedCodes = new Set(
    Array.from({ length: 16 }, (_, value) => value.toString(2).padStart(4, "0")),
  );
  const personaCodes = new Set(personas.map((persona) => persona.code));
  assert.deepEqual(personaCodes, expectedCodes, "16 个人格 code 必须完整覆盖 0000-1111");

  for (const persona of personas) {
    const imagePath = join(process.cwd(), "public", "personas", `${persona.slug}.svg`);
    assert.ok(existsSync(imagePath), `${persona.name} 缺少对应人格图片：${imagePath}`);
  }

  for (const buy of [0, 3]) {
    for (const paste of [0, 3]) {
      for (const review of [0, 3]) {
        for (const keep of [0, 3]) {
          const code = getPersonaCode({ buy, paste, review, keep });
          assert.ok(expectedCodes.has(code), `人格 code ${code} 不在映射表内`);
        }
      }
    }
  }

  const fourQuestionMaximums = { buy: 4, paste: 4, review: 4, keep: 4 };
  assert.equal(
    getPersonaCode({ buy: 2, paste: 2, review: 2, keep: 2 }, fourQuestionMaximums),
    "1111",
    "4 题制维度需要按实际题量判断人格 code",
  );

  assert.equal(getAddictionLevel(0).name, "还有得救", "沉迷 0 分等级不正确");
  assert.equal(getAddictionLevel(2).name, "施主，回头是岸", "沉迷 2 分等级不正确");
  assert.equal(getAddictionLevel(4).name, "40度高烧发烧友", "沉迷 4 分等级不正确");
  assert.equal(getAddictionLevel(6).name, "你将全职进入造景世界", "沉迷 6 分等级不正确");

  const result = buildResult({
    scores: { ...defaultScores, buy: 4, paste: 4, review: 4, keep: 4 },
    scoreMaximums: fourQuestionMaximums,
    selectedKeywords: ["码货", "复古"],
    addictionTotal: 4,
  });
  assert.equal(result.persona.code, "1111", "满分人格应该命中 1111");
  assert.equal(result.percentages.buy, 100, "4 题制满分维度应该显示 100%");
  assert.deepEqual(result.styleKeywords, ["码货", "复古"], "结果必须保留画风关键词");
  assert.equal(result.addictionLevel.name, "40度高烧发烧友", "结果必须保留沉迷等级");

  const orderSignatures = new Set<string>();
  const firstQuestionIds = new Set<string>();
  const selectedQuestionIds = new Set<string>();
  const simulationCount = 300;
  for (let round = 0; round < simulationCount; round += 1) {
    const quizItems = buildQuizItems();
    assert.equal(quizItems.length, QUIZ_TOTAL_QUESTION_COUNT, "单次测试题量必须正好 20 题");
    assert.equal(new Set(quizItems.map((item) => item.id)).size, quizItems.length, "抽题后题目不应重复");

    const selectedPersonalityQuestions = quizItems.filter((item) => item.type === "personality");
    const selectedStyleQuestions = quizItems.filter((item) => item.type === "style");
    const selectedAddictionQuestions = quizItems.filter((item) => item.type === "addiction");

    assert.equal(selectedPersonalityQuestions.length, personalityDimensions.length * PERSONALITY_QUESTIONS_PER_DIMENSION);
    assert.equal(selectedStyleQuestions.length, STYLE_QUESTIONS_PER_QUIZ);
    assert.equal(selectedAddictionQuestions.length, ADDICTION_QUESTIONS_PER_QUIZ);

    for (const dimension of personalityDimensions) {
      assert.equal(
        selectedPersonalityQuestions.filter((item) => item.dimension === dimension.key).length,
        PERSONALITY_QUESTIONS_PER_DIMENSION,
        `${dimension.key} 维度单次测试必须抽 ${PERSONALITY_QUESTIONS_PER_DIMENSION} 题`,
      );
    }

    quizItems.forEach((item) => selectedQuestionIds.add(item.id));
    orderSignatures.add(quizItems.map((item) => item.id).join(","));
    firstQuestionIds.add(quizItems[0]?.id ?? "");
  }

  assert.ok(orderSignatures.size > simulationCount * 0.95, "题目顺序随机性不足");
  assert.ok(firstQuestionIds.size >= 14, "首题分布不够随机");
  assert.equal(selectedQuestionIds.size, allQuizItems.length, "长期抽题应该覆盖完整题库");

  console.log("单次测试题:", QUIZ_TOTAL_QUESTION_COUNT);
  console.log("人格题:", personalityQuestions.length);
  console.log("画风题:", styleQuestions.length);
  console.log("沉迷题:", addictionQuestions.length);
  console.log("人格结果:", personas.length);
  console.log("题库结构验证通过");
}

runValidation();
