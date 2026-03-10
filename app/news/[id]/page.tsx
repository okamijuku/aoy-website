import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getNewsDetail, getAllNewsIds } from "@/libs/microcms";
import { Header } from "@/app/_components/Header";

// ─── 静的パスの生成 ────────────────────────────────────────────────────────

export async function generateStaticParams() {
  try {
    const ids = await getAllNewsIds();
    return ids.map((id) => ({ id }));
  } catch {
    return [];
  }
}

// ─── メタデータ ────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  try {
    const { id } = await params;
    const news = await getNewsDetail(id);
    return {
      title: `${news.title} | 会津芦ノ牧温泉 不動館 小谷の湯`,
    };
  } catch {
    return { title: "お知らせ | 会津芦ノ牧温泉 不動館 小谷の湯" };
  }
}

// ─── ヘルパー ──────────────────────────────────────────────────────────────

function formatDate(s: string) {
  const d = new Date(s);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let news;
  try {
    news = await getNewsDetail(id);
  } catch {
    notFound();
  }

  return (
    <>
      <Header />

      {/* ページヘッダー */}
      <div className="bg-[#1a1612] pb-16 pt-32">
        <div className="mx-auto max-w-3xl px-6">
          <p className="mb-4 text-[10px] font-light tracking-[0.5em] text-white/35">
            NEWS / お知らせ
          </p>
          {news.category && (
            <span className="mb-5 inline-block border border-[#6b4c2a] px-3 py-1 text-[10px] font-light tracking-[0.2em] text-[#8a6848]">
              {news.category.name}
            </span>
          )}
          <h1 className="text-xl font-light leading-relaxed tracking-[0.12em] text-white md:text-2xl">
            {news.title}
          </h1>
          <time className="mt-5 block text-xs font-light tracking-widest text-white/35">
            {formatDate(news.publishedAt)}
          </time>
        </div>
      </div>

      {/* 記事本文 */}
      <main className="bg-[#f7f4ee] py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-4 h-px bg-[#ddd5c8]" />

          {news.content ? (
            <div
              className="prose-news mt-10"
              dangerouslySetInnerHTML={{ __html: news.content }}
            />
          ) : (
            <p className="mt-10 text-sm font-light leading-loose tracking-wide text-[#9a8e82]">
              本文がありません。
            </p>
          )}

          {/* 区切り線 */}
          <div className="mt-16 h-px bg-[#ddd5c8]" />

          {/* ナビゲーション */}
          <div className="mt-10 flex items-center justify-between">
            <a
              href="/#news"
              className="flex items-center gap-3 text-xs font-light tracking-[0.2em] text-[#9a8e82] transition-colors hover:text-[#6b4c2a]"
            >
              <span className="h-px w-8 bg-current" />
              お知らせ一覧へ
            </a>
            <a
              href="/"
              className="flex items-center gap-3 text-xs font-light tracking-[0.2em] text-[#9a8e82] transition-colors hover:text-[#6b4c2a]"
            >
              トップページへ
              <span className="h-px w-8 bg-current" />
            </a>
          </div>
        </div>
      </main>

      {/* フッター */}
      <footer className="border-t border-white/5 bg-[#1a1612] py-10 text-center">
        <p className="mb-1 text-[9px] font-light tracking-[0.3em] text-white/30">
          会津芦ノ牧温泉 不動館
        </p>
        <p className="mb-6 text-sm font-light tracking-[0.2em] text-white/60">
          小谷の湯
        </p>
        <p className="text-[10px] font-light tracking-[0.3em] text-white/20">
          © {new Date().getFullYear()} 会津芦ノ牧温泉 不動館 小谷の湯. All Rights Reserved.
        </p>
      </footer>
    </>
  );
}
