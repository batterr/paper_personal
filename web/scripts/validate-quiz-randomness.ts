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
import { secureShuffle } from "../src/lib/question-selection";

function runValidation() {
  assert.ok(personalityQuestionGroups, "题库需要导出 personalityQuestionGroups");
  assert.ok(personalityDimensions, "题库需要导出 personalityDimensions");
  assert.ok(allQuizItems, "题库需要导出 allQuizItems");

  const personalityQuestions = Object.values(personalityQuestionGroups).flat();

  assert.equal(personalityQuestions.length, 20, "人格题必须正好 20 题");
  assert.equal(styleQuestions.length, 4, "画风题必须正好 4 题");
  assert.equal(addictionQuestions.length, 4, "沉迷浓度题必须正好 4 题");
  assert.equal(allQuizItems.length, 28, "总题量必须正好 28 题");
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

  assert.equal(getAddictionLevel(0).name, "还有得救", "沉迷 0 分等级不正确");
  assert.equal(getAddictionLevel(2).name, "施主，回头是岸", "沉迷 2 分等级不正确");
  assert.equal(getAddictionLevel(4).name, "40度高烧发烧友", "沉迷 4 分等级不正确");
  assert.equal(getAddictionLevel(6).name, "你将全职进入造景世界", "沉迷 6 分等级不正确");

  const result = buildResult({
    scores: { ...defaultScores, buy: 5, paste: 5, review: 5, keep: 5 },
    selectedKeywords: ["码货", "复古"],
    addictionTotal: 4,
  });
  assert.equal(result.persona.code, "1111", "满分人格应该命中 1111");
  assert.deepEqual(result.styleKeywords, ["码货", "复古"], "结果必须保留画风关键词");
  assert.equal(result.addictionLevel.name, "40度高烧发烧友", "结果必须保留沉迷等级");

  const orderSignatures = new Set<string>();
  const firstQuestionIds = new Set<string>();
  const simulationCount = 300;
  for (let round = 0; round < simulationCount; round += 1) {
    const shuffled = secureShuffle(allQuizItems);
    assert.equal(new Set(shuffled.map((item) => item.id)).size, allQuizItems.length, "洗牌后题目不应重复");
    orderSignatures.add(shuffled.map((item) => item.id).join(","));
    firstQuestionIds.add(shuffled[0]?.id ?? "");
  }

  assert.ok(orderSignatures.size > simulationCount * 0.95, "题目顺序随机性不足");
  assert.ok(firstQuestionIds.size >= 18, "首题分布不够随机");

  console.log("人格题:", personalityQuestions.length);
  console.log("画风题:", styleQuestions.length);
  console.log("沉迷题:", addictionQuestions.length);
  console.log("人格结果:", personas.length);
  console.log("题库结构验证通过");
}

runValidation();
