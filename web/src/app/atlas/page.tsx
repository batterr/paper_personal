import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPersonaImageSrc, hiddenPersonaProfiles, personas } from "@/data/personas";

export const metadata: Metadata = {
  title: "人格图鉴 | 贴纸人格实验室",
  description: "浏览 27 型贴纸人格、对应的中式英语外号，以及它们在造景、点评和收纳里的典型表现。",
};

export default function AtlasPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-6 sm:px-6">
      <div className="flex items-center justify-between text-sm text-neutral-500">
        <Link href="/" className="hover:text-neutral-900">首页</Link>
        <Link href="/quiz" className="hover:text-neutral-900">开始测试</Link>
      </div>

      <section className="mt-8 rounded-[36px] border border-neutral-200 bg-white p-6 shadow-sm sm:p-10">
        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">全部人格图鉴</div>
        <h1 className="mt-4 text-4xl font-black text-neutral-950 sm:text-6xl">27 型贴纸人格</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-neutral-700">
          每种人格都对应一种贴纸使用习惯：你怎么挑图、怎么评价、怎么收纳、又会把一页造景推到什么程度。
          每个结果都配有中式英语谐音，方便保存和分享。
        </p>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {personas.map((persona) => (
          <Link
            key={persona.slug}
            href={`/atlas/${persona.slug}`}
            className="overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <Image
              src={getPersonaImageSrc(persona)}
              alt={`${persona.name}人格插图`}
              width={520}
              height={360}
              className="aspect-[13/9] w-full border-b border-neutral-100 object-cover"
            />
            <div className="p-6">
              <div className="text-sm font-semibold uppercase tracking-[0.25em] text-neutral-400">{persona.code}</div>
              <div className="mt-2 text-xs font-black uppercase tracking-[0.18em] text-[#2f7d48]">{persona.chinlish}</div>
              <h2 className="mt-3 text-2xl font-black text-neutral-950">{persona.name}</h2>
              <p className="mt-3 text-base leading-7 text-neutral-600">{persona.oneLiner}</p>
            </div>
          </Link>
        ))}
      </section>

      {hiddenPersonaProfiles.length > 0 ? (
        <section className="mt-10 rounded-[36px] border border-dashed border-neutral-300 bg-[#fffdf8] p-6 sm:p-10">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">隐藏人格类型</div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {hiddenPersonaProfiles.map((persona) => (
              <div key={persona.slug} className="rounded-[24px] border border-neutral-200 bg-white p-5 shadow-sm">
                <div className="text-xs font-black uppercase tracking-[0.18em] text-[#2f7d48]">{persona.chinlish}</div>
                <h3 className="mt-2 text-2xl font-black text-neutral-950">{persona.name}</h3>
                <p className="mt-3 text-base leading-7 text-neutral-600">{persona.oneLiner}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
