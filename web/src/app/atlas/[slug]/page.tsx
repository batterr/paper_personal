import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPersonaImageSrc, personas } from "@/data/personas";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const persona = personas.find((item) => item.slug === slug);

  return {
    title: persona ? `${persona.name} | 贴纸人格图鉴` : "人格不存在 | 贴纸人格图鉴",
    description: persona?.oneLiner ?? "这个人格不存在，可能你点进了一个还没编好的平行宇宙。",
  };
}

export default async function PersonaDetailPage({ params }: Props) {
  const { slug } = await params;
  const persona = personas.find((item) => item.slug === slug);

  if (!persona) {
    notFound();
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col px-4 py-6 sm:px-6">
      <div className="flex items-center justify-between text-sm text-neutral-500">
        <Link href="/atlas" className="hover:text-neutral-900">返回图鉴</Link>
        <Link href="/quiz" className="hover:text-neutral-900">开始测试</Link>
      </div>

      <section className="mt-8 rounded-[36px] border border-neutral-200 bg-white p-6 shadow-sm sm:p-10">
        <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <Image
            src={getPersonaImageSrc(persona)}
            alt={`${persona.name}人格插图`}
            width={520}
            height={360}
            priority
            className="w-full rounded-[28px] bg-white object-cover shadow-sm"
          />
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.25em] text-neutral-400">{persona.code}</div>
            <div className="mt-2 inline-flex rounded-full bg-[#e9f8d5] px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-[#2f7d48]">
              {persona.chinlish}
            </div>
            <h1 className="mt-3 text-4xl font-black text-neutral-950 sm:text-6xl">{persona.name}</h1>
            <p className="mt-4 text-lg leading-8 text-neutral-700 sm:text-2xl">{persona.oneLiner}</p>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-[28px] border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-neutral-950">三个典型症状</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {persona.traits.map((trait) => (
              <span key={trait} className="rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-700">
                {trait}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-neutral-950">朋友对你的刻板印象</h2>
          <p className="mt-4 text-base leading-7 text-neutral-700">{persona.stereotype}</p>
        </div>
      </section>

      <section className="mt-6 rounded-[28px] border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-black text-neutral-950">适合你发作的场景</h2>
        <p className="mt-4 text-base leading-8 text-neutral-700">{persona.scene}</p>
      </section>
    </main>
  );
}
