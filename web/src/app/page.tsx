import Link from "next/link";
import Image from "next/image";
import { getPersonaImageSrc, personas } from "@/data/personas";
import { ImmersiveParticleField, PersonaShowcase } from "./home-immersive";

const featured = personas.slice(0, 6);
const showcasePersonas = featured.map((persona) => ({
  slug: persona.slug,
  name: persona.name,
  chinlish: persona.chinlish,
  oneLiner: persona.oneLiner,
  imageSrc: getPersonaImageSrc(persona),
}));

export default function Home() {
  const pills = ["人格昵称", "中式英语", "造景偏好", "收纳习惯"];

  return (
    <main className="immersive-home noise-grid relative isolate mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-6 sm:px-6">
      <ImmersiveParticleField />
      <header className="relative z-10 flex items-center justify-between py-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">Sticker Persona Studio</div>
          <div className="text-xl font-black text-neutral-950">贴纸人格实验室</div>
        </div>
        <Link href="/atlas" className="text-sm font-medium text-neutral-700 hover:text-neutral-950">
          人格图鉴
        </Link>
      </header>

      <section className="home-hero poster-frame glow-panel sticker-card relative z-10 mt-8 overflow-hidden rounded-[44px] p-6 sm:p-10 lg:p-14">
        <div className="absolute -left-3 top-6 rotate-[-10deg] rounded-full border border-black/10 bg-[#fff2a8] px-4 py-2 text-sm font-black text-neutral-950 shadow-lg">
          轻松测试
        </div>
        <div className="absolute right-2 top-8 rotate-[8deg] rounded-full border border-black/10 bg-[#ffd1e0] px-4 py-2 text-sm font-black text-neutral-950 shadow-lg">
          中式英语外号
        </div>
        <div className="absolute -bottom-3 right-6 rotate-[-8deg] rounded-full border border-black/10 bg-[#d8f36a] px-4 py-2 text-sm font-black text-neutral-950 shadow-lg">
          贴纸习惯画像
        </div>

        <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="max-w-4xl">
            <div className="mono-kicker text-xs font-semibold text-neutral-500">30 题 / 约 5 分钟 / 贴纸习惯测试</div>
            <h1 className="home-hero-title mt-6 max-w-4xl text-5xl font-black leading-[0.95] text-neutral-950 sm:text-7xl lg:text-[5.4rem]">
              <span className="block">贴纸人格测试</span>
              <span className="block">你是哪种人格</span>
            </h1>
            <div className="mt-5 flex flex-wrap gap-2">
              {pills.map((item) => (
                <span key={item} className="rounded-full border border-black/8 bg-white/80 px-3 py-1 text-sm font-medium text-neutral-700">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5"
              >
                <span className="text-white">开始测试</span>
                <span aria-hidden="true" className="text-white">
                  →
                </span>
              </Link>
              <Link href="/atlas" className="rounded-full border border-neutral-300 bg-white/80 px-6 py-3 text-base font-semibold text-neutral-900 transition hover:bg-white">
                先逛人格图鉴
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <PersonaShowcase personas={showcasePersonas} />
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-8 grid gap-4 md:grid-cols-3">
        {[
          ["贴纸造景", "看你的搭配偏好"],
          ["收纳画像", "看你的库存习惯"],
          ["结果卡片", "适合保存和分享"],
        ].map(([title, body]) => (
          <div key={title} className="glow-panel sticker-card rounded-[28px] p-6">
            <h2 className="text-xl font-black text-neutral-950">{title}</h2>
            <p className="mt-3 text-base font-medium text-neutral-600">{body}</p>
          </div>
        ))}
      </section>

      <section className="relative z-10 mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-black text-neutral-950">热门贴纸人格</h2>
          <Link href="/atlas" className="text-sm font-medium text-neutral-700 hover:text-neutral-950">
            查看 27 型图鉴
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((persona) => (
            <Link
              key={persona.slug}
              href={`/atlas/${persona.slug}`}
              className="glow-panel sticker-card overflow-hidden rounded-[28px] transition hover:-translate-y-1 hover:rotate-[1deg] hover:shadow-lg"
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
                <h3 className="mt-3 text-2xl font-black text-neutral-950">{persona.name}</h3>
                <p className="mt-3 text-base font-medium text-neutral-600">{persona.oneLiner}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
