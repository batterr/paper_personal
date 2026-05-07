import type { Metadata } from "next";
import { ResultClient } from "./result-client";

export const metadata: Metadata = {
  title: "测试结果 | 贴纸人格实验室",
  description: "看你在贴纸世界里到底是哪种显眼包，并且顺手给自己导出一张适合发群的结果卡。",
};

export default function ResultPage() {
  return <ResultClient />;
}
