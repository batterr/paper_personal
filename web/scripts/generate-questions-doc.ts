import {
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
} from "docx";
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  addictionQuestions,
  personalityDimensions,
  personalityQuestionGroups,
  styleQuestions,
} from "../src/data/questions";
import {
  ADDICTION_QUESTIONS_PER_QUIZ,
  PERSONALITY_QUESTIONS_PER_DIMENSION,
  QUIZ_TOTAL_QUESTION_COUNT,
  STYLE_QUESTIONS_PER_QUIZ,
} from "../src/lib/question-selection";

function buildParagraphs() {
  const paragraphs: Paragraph[] = [];
  const personalityQuestions = Object.values(personalityQuestionGroups).flat();

  paragraphs.push(
    new Paragraph({
      heading: HeadingLevel.TITLE,
      children: [new TextRun("贴纸人格题库清单")],
    }),
  );

  paragraphs.push(
    new Paragraph({
      children: [
        new TextRun({
          text: `人格题：${personalityQuestions.length} 题`,
          break: 1,
        }),
        new TextRun({
          text: `画风题：${styleQuestions.length} 题`,
          break: 1,
        }),
        new TextRun({
          text: `沉迷浓度题：${addictionQuestions.length} 题`,
          break: 1,
        }),
        new TextRun({
          text: `单次测试：${QUIZ_TOTAL_QUESTION_COUNT} 题（每维度 ${PERSONALITY_QUESTIONS_PER_DIMENSION} 题，画风 ${STYLE_QUESTIONS_PER_QUIZ} 题，沉迷 ${ADDICTION_QUESTIONS_PER_QUIZ} 题）`,
          break: 1,
        }),
      ],
    }),
  );

  paragraphs.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      children: [new TextRun("人格题")],
    }),
  );

  for (const dimension of personalityDimensions) {
    paragraphs.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [
          new TextRun(`${dimension.label} · ${dimension.lowLabel} / ${dimension.highLabel}`),
        ],
      }),
    );

    for (const question of personalityQuestionGroups[dimension.key]) {
      paragraphs.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_3,
          children: [new TextRun(`${question.id} · ${question.title}`)],
        }),
      );

      for (const option of question.options) {
        paragraphs.push(
          new Paragraph({
            children: [
              new TextRun(`${option.key}. ${option.label}`),
              new TextRun({
                text: `（+${option.score}）`,
                color: "888888",
              }),
            ],
          }),
        );
      }
    }
  }

  paragraphs.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      children: [new TextRun("画风题")],
    }),
  );

  for (const question of styleQuestions) {
    paragraphs.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun(`${question.id} · ${question.title}`)],
      }),
    );

    for (const [index, option] of question.options.entries()) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun(`${index + 1}. ${option}`),
            new TextRun({
              text: `（${question.keywordMapping[index]?.join("、") ?? ""}）`,
              color: "888888",
            }),
          ],
        }),
      );
    }
  }

  paragraphs.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      children: [new TextRun("沉迷浓度题")],
    }),
  );

  for (const question of addictionQuestions) {
    paragraphs.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun(`${question.id} · ${question.title}`)],
      }),
    );

    for (const [index, option] of question.options.entries()) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun(`${index + 1}. ${option}`),
            new TextRun({
              text: `（+${question.scores[index] ?? 0}）`,
              color: "888888",
            }),
          ],
        }),
      );
    }
  }

  return paragraphs;
}

function main() {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: buildParagraphs(),
      },
    ],
  });

  const outputPath = join(
    process.cwd(),
    "..",
    "贴纸人格题库清单.docx",
  );

  Packer.toBuffer(doc).then((buffer) => {
    writeFileSync(outputPath, buffer);
    console.log(`Word 文件已生成：${outputPath}`);
  });
}

main();
