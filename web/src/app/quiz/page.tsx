import type { Metadata } from "next";
import { QuizClient } from "./quiz-client";

export const metadata: Metadata = {
  title: "开始测试 | 贴纸人格实验室",
  description: "30 道贴纸点评、收纳和造景题，测测你会被判成哪个冒犯外号。",
};

export default function QuizPage() {
  return <QuizClient />;
}
