import assert from "node:assert/strict";
import { mainQuestions } from "../src/data/questions";
import {
  createEmptyDrawHistory,
  DIMENSION_TARGETS,
  QUESTION_BANK_SIZE,
  selectQuestions,
} from "../src/lib/question-selection";

function groupByDimension() {
  return Object.fromEntries(
    Object.keys(DIMENSION_TARGETS).map((dimension) => [
      dimension,
      mainQuestions.filter((question) => question.dimension === dimension),
    ]),
  );
}

function runValidation() {
  assert.equal(mainQuestions.length, QUESTION_BANK_SIZE, "题库必须正好 40 题");

  const grouped = groupByDimension();
  for (const [dimension, target] of Object.entries(DIMENSION_TARGETS)) {
    assert.ok(grouped[dimension].length >= target, `${dimension} 维度题量不足`);
  }

  let history = createEmptyDrawHistory();
  const frequencies = new Map(mainQuestions.map((question) => [question.id, 0]));
  const orderSignatures = new Set<string>();
  const combinationSignatures = new Set<string>();
  const firstQuestionIds = new Set<string>();
  let previousIds: string[] = [];
  let overlapTotal = 0;
  const simulationCount = 2000;

  for (let round = 0; round < simulationCount; round += 1) {
    const selection = selectQuestions(mainQuestions, history);
    const ids = selection.questions.map((question) => question.id);
    const uniqueIds = new Set(ids);
    assert.equal(ids.length, 30, "单次抽题结果必须是 30 题");
    assert.equal(uniqueIds.size, 30, "单次抽题不允许重复题目");

    const dimensionCounts = selection.questions.reduce<Record<string, number>>((acc, question) => {
      acc[question.dimension] = (acc[question.dimension] ?? 0) + 1;
      return acc;
    }, {});

    for (const [dimension, target] of Object.entries(DIMENSION_TARGETS)) {
      assert.equal(dimensionCounts[dimension], target, `${dimension} 维度抽题数量不平衡`);
    }

    ids.forEach((id) => frequencies.set(id, (frequencies.get(id) ?? 0) + 1));
    orderSignatures.add(ids.join(","));
    combinationSignatures.add([...ids].sort().join(","));
    firstQuestionIds.add(ids[0]);

    if (previousIds.length > 0) {
      overlapTotal += ids.filter((id) => previousIds.includes(id)).length;
    }

    previousIds = ids;
    history = selection.history;
  }

  assert.ok(orderSignatures.size > simulationCount * 0.98, "题目顺序随机性不足");
  assert.ok(combinationSignatures.size > simulationCount * 0.9, "题目组合重复率过高");
  assert.ok(firstQuestionIds.size >= 20, "首题分布不够随机");

  const averageOverlap = overlapTotal / (simulationCount - 1);
  assert.ok(averageOverlap < 24.5, `连续抽选相似度过高: ${averageOverlap.toFixed(2)}`);

  for (const [dimension, questions] of Object.entries(grouped)) {
    const counts = questions.map((question) => frequencies.get(question.id) ?? 0);
    const average = counts.reduce((sum, value) => sum + value, 0) / counts.length;
    const spread = Math.max(...counts) - Math.min(...counts);
    assert.ok(
      spread / average < 0.18,
      `${dimension} 维度题目频次不够均衡: spread=${spread}, average=${average.toFixed(2)}`,
    );
  }

  console.log("题库总数:", mainQuestions.length);
  console.log("顺序签名数:", orderSignatures.size);
  console.log("组合签名数:", combinationSignatures.size);
  console.log("首题覆盖数:", firstQuestionIds.size);
  console.log("平均连续重合题数:", averageOverlap.toFixed(2));
  console.log("随机抽题验证通过");
}

runValidation();
