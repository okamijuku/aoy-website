import Image from "next/image";
import type { Metadata } from "next";
import { getAllNews, type News } from "@/libs/microcms";
import { Header } from "@/app/_components/Header";

// ─── メタデータ ────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "お知らせ一覧 | 会津芦ノ牧温泉 不動館 小谷の湯",
};

// ─── ヘルパー ──────────────────────────────────────────────────────────────

function formatDate(s: string) {
  const d = new Date(s);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

// ─── 記事カード ────────────────────────────────────────────────────────────

function NewsCard({ news }: { news: News }) {
  return (
    <a
      href={`/news/${news.id}`}
      className="group flex flex-col bg-white transition-shadow hover:shadow-sm"
    >
      {/* サムネイル */}
      <div className="relative aspect-[16/9] overflow-hidden bg-[#e8e3da]">
        {news.eyecatch ? (
          <Image
            src={news.eyecatch.url}
            alt={news.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-[10px] font-light tracking-[0.4em] text-[#b0a898]">
              NO IMAGE
            </span>
          </div>
        )}
      </div>

      {/* テキスト */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-3">
          {news.category && (
            <span className="border border-[#cec4b4] px-2 py-0.5 text-[9px] font-light tracking-[0.2em] text-[#6b4c2a]">
              {news.category.name}
            </span>
          )}
          <time className="text-[11px] font-light tracking-widest text-[#9a8e82]">
            {formatDate(news.publishedAt)}
          </time>
        </div>
        <p className="text-sm font-light leading-relaxed tracking-wide text-[#1c1814] transition-colors group-hover:text-[#6b4c2a]">
          {news.title}
        </p>
        <span className="mt-5 flex items-center gap-2 text-[11px] font-light tracking-[0.2em] text-[#9a8e82] transition-colors group-hover:text-[#6b4c2a]">
          詳細を見る
          <span className="h-px w-6 bg-current transition-all group-hover:w-10" />
        </span>
      </div>
    </a>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default async function NewsListPage() {
  let newsList: News[] = [];
  try {
    const res = await getAllNews();
    newsList = res.contents;
  } catch {
    // フォールバック：空配列のまま表示
  }

  return (
    <>
      <Header />

      {/* ページヘッダー */}
      <div className="bg-[#1a1612] pb-16 pt-32">
        <div className="mx-auto max-w-5xl px-6">
          <p className="mb-4 text-[10px] font-light tracking-[0.5em] text-white/35">
            NEWS
          </p>
          <h1 className="text-2xl font-light tracking-[0.25em] text-white">
            お知らせ
          </h1>
          <div className="mt-5 h-px w-12 bg-[#6b4c2a]" />
        </div>
      </div>

      {/* 記事一覧 */}
      <main className="bg-[#f7f4ee] py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          {newsList.length === 0 ? (
            <p className="py-20 text-center text-sm font-light tracking-wider text-[#9a8e82]">
              現在お知らせはありません
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {newsList.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>
          )}

          {/* 区切り・戻るリンク */}
          <div className="mt-16 border-t border-[#ddd5c8] pt-10">
            <a
              href="/"
              className="flex items-center gap-3 text-xs font-light tracking-[0.2em] text-[#9a8e82] transition-colors hover:text-[#6b4c2a]"
            >
              <span className="h-px w-8 bg-current" />
              トップページへ戻る
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
