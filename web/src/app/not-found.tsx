import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-start justify-center px-4 py-16 sm:px-6">
      <div className="rounded-[32px] border border-neutral-200 bg-white p-8 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.25em] text-neutral-400">404</div>
        <h1 className="mt-3 text-4xl font-black text-neutral-950">没有找到这个页面。</h1>
        <p className="mt-4 text-lg leading-8 text-neutral-600">可能链接已经失效，或者你访问的人格图鉴不存在。</p>
        <div className="mt-6 flex gap-3">
          <Link href="/" className="rounded-full bg-neutral-950 px-6 py-3 font-semibold text-white">回首页</Link>
          <Link href="/atlas" className="rounded-full border border-neutral-300 px-6 py-3 font-semibold text-neutral-900">浏览图鉴</Link>
        </div>
      </div>
    </main>
  );
}
