import type { Metadata } from "next";
import { ResultClient } from "./result-client";

export const metadata: Metadata = {
  title: "测试结果 | 贴纸人格实验室",
  description: "查看你的贴纸人格结果、四维画像、画风关键词和适合保存分享的结果卡。",
};

export default function ResultPage() {
  return <ResultClient />;
}
