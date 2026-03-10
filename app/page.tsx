import Image from "next/image";
import { Header } from "./_components/Header";
import { HeroSlider } from "./_components/HeroSlider";
import { FadeIn } from "./_components/FadeIn";
import { DiningCarousel } from "./_components/DiningCarousel";
import { RoomsSection } from "./_components/RoomsSection";
import { AroundCarousel } from "./_components/AroundCarousel";
import { ImageScrollBand } from "./_components/ImageScrollBand";
import {
  getNewsList,
  getTop,
  type News,
  type TopFaq,
  type TopFeature,
  type TopSightseeing,
} from "@/libs/microcms";

// ─── ヘルパー ──────────────────────────────────────────────────────────────

function SectionTitle({
  en,
  ja,
  light = false,
}: {
  en: string;
  ja: string;
  light?: boolean;
}) {
  return (
    <div className={`section-heading${light ? " section-heading-light" : ""}`}>
      <p className="en-label">{en}</p>
      <h2 className="ja-heading">{ja}</h2>
    </div>
  );
}

function RichText({
  html,
  className,
  style,
}: {
  html: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`[&_p]:mb-4 [&_p:last-child]:mb-0 [&_table]:w-full [&_td]:py-3 [&_td]:pr-6 [&_td]:leading-relaxed ${className ?? ""}`}
      style={style}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function formatDate(s: string) {
  const d = new Date(s);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

// 画像ヒーローに重ねるタイトルオーバーレイ
function ImageOverlayTitle({
  en,
  ja,
  align = "bottom-left",
}: {
  en: string;
  ja: string;
  align?: "center" | "bottom-left";
}) {
  const titleStyle: React.CSSProperties = {
    fontSize: "var(--text-2xl)",
    fontWeight: 400,
    color: "white",
    letterSpacing: "0.15em",
    lineHeight: 1.3,
  };
  const labelStyle: React.CSSProperties = {
    fontSize: "var(--text-xs)",
    letterSpacing: "0.25em",
    color: "var(--color-accent-light)",
    fontWeight: 300,
    marginBottom: "0.75rem",
    textTransform: "uppercase",
    display: "block",
  };

  if (align === "bottom-left") {
    return (
      <div
        className="absolute inset-x-0 bottom-0"
        style={{ padding: "0 var(--container-padding) var(--space-lg)" }}
      >
        <span style={labelStyle}>{en}</span>
        <h2 style={titleStyle}>{ja}</h2>
      </div>
    );
  }
  return (
    <div className="absolute inset-0 flex items-center justify-center text-center">
      <div>
        <span style={labelStyle}>{en}</span>
        <h2 style={titleStyle}>{ja}</h2>
      </div>
    </div>
  );
}

// ─── 02. 温泉・浴場 ────────────────────────────────────────────────────────

const ONSEN_FEATURES = [
  { term: "源泉掛け流し", desc: "加水・加温・循環なし\n100%天然温泉" },
  { term: "露天風呂", desc: "大川の渓谷美を\n一望できる絶景露天" },
  { term: "泉質", desc: "ナトリウム—塩化物・\n炭酸水素塩温泉" },
];

function OnsenSection({
  heading,
  description,
  imageUrl,
  features,
}: {
  heading?: string;
  description?: string;
  imageUrl?: string;
  features?: TopFeature[];
}) {
  const grid =
    features && features.length > 0
      ? features.map((f) => ({ term: f.label, desc: f.text }))
      : ONSEN_FEATURES;

  return (
    <section id="onsen">
      {/* フル幅ヒーロー画像 + 左下タイトル + グラデーションフェード */}
      <div className="relative overflow-hidden" style={{ height: "580px" }}>
        <Image
          src={imageUrl ?? "https://oyanoyu.com/img/1719383739993.webp"}
          alt="大川の渓谷を望む露天風呂"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 60%, var(--color-bg) 100%)",
          }}
        />
        <ImageOverlayTitle en="HOT SPRING" ja={heading ?? "温泉・浴場"} />
      </div>

      {/* 説明文 + 特徴グリッド */}
      <div
        className="section"
        style={{
          background: "var(--color-bg)",
          paddingTop: "var(--space-md)",
        }}
      >
        <FadeIn className="container">
          {description ? (
            <RichText
              html={description}
              className="text-center font-light leading-loose"
              style={{ color: "var(--color-text-muted)" } as React.CSSProperties}
            />
          ) : (
            <p
              className="text-center font-light leading-loose"
              style={{ color: "var(--color-text-muted)" }}
            >
              会津芦ノ牧温泉の源泉を、加水・加温・循環なしの
              <br />
              源泉掛け流し100%でご提供しております。
              <br />
              大川の渓谷を望む露天風呂に浸かれば、
              <br />
              四季折々の自然が目の前に広がります。
            </p>
          )}

          <dl
            className="grid grid-cols-1 gap-y-12 md:grid-cols-3 md:gap-x-12"
            style={{ marginTop: "var(--space-lg)" }}
          >
            {grid.map(({ term, desc }) => (
              <div key={term} className="text-center">
                {/* 罫線＋ドット装飾 */}
                <div
                  className="mx-auto flex items-center justify-center gap-3"
                  style={{ marginBottom: "var(--space-sm)" }}
                >
                  <div
                    className="h-px w-10"
                    style={{ background: "var(--color-border)" }}
                  />
                  <div
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: "var(--color-accent-light)" }}
                  />
                  <div
                    className="h-px w-10"
                    style={{ background: "var(--color-border)" }}
                  />
                </div>
                <dt
                  className="font-light tracking-[0.25em]"
                  style={{
                    fontSize: "var(--text-base)",
                    color: "var(--color-text)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {term}
                </dt>
                <dd
                  className="whitespace-pre-line font-light leading-relaxed tracking-wide"
                  style={{
                    fontSize: "var(--text-sm)",
                    color: "var(--color-text-muted)",
                  }}
                >
                  {desc}
                </dd>
              </div>
            ))}
          </dl>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── 03. 歴史 ──────────────────────────────────────────────────────────────

const HISTORY_FALLBACK = [
  "会津芦ノ牧温泉は、会津若松市の南西、大川の峡谷に沿って湧く古湯です。その歴史は古く、約八百年前に開かれたとも伝わります。会津藩主の保護を受け、庶民と武士が共に癒しを求めた、由緒ある湯処です。",
  "不動館 小谷の湯は、その会津芦ノ牧温泉の最奥に位置する、ひっそりとした一軒宿。俗世の喧騒から離れ、渓谷の自然と温泉だけに向き合う、まさに「会津の隠れ宿」として知られています。",
  "長い年月を経ても変わらぬ湯の力と、代々受け継がれてきたもてなしの心。日常を忘れ、ただそこにある自然と向き合う時間を、どうぞお楽しみください。",
];

function HistorySection({
  heading,
  description,
  imageUrl,
}: {
  heading?: string;
  description?: string;
  imageUrl?: string;
}) {
  const paragraphs = description
    ? description.split(/\n\n+/).filter(Boolean)
    : HISTORY_FALLBACK;

  return (
    <section
      id="history"
      className="section"
      style={{ background: "var(--color-bg-warm)" }}
    >
      <FadeIn className="container">
        <SectionTitle en="HISTORY" ja={heading ?? "歴史"} />
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-16">
          {/* 画像 */}
          {imageUrl && (
            <div className="w-full md:w-1/2">
              <div
                className="relative overflow-hidden"
                style={{ minHeight: "480px" }}
              >
                <Image
                  src={imageUrl}
                  alt={heading ?? "歴史"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          )}
          {/* テキスト */}
          <div
            className={`w-full ${imageUrl ? "md:w-1/2" : ""}`}
            style={{ paddingBlock: "var(--space-md)" }}
          >
            {paragraphs.map((para, i) => (
              <p
                key={i}
                className="font-light leading-loose tracking-[0.08em]"
                style={{
                  color: "#444444",
                  marginBottom: "var(--space-sm)",
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

// ─── 04. お食事 ────────────────────────────────────────────────────────────

function DiningSection({
  heading,
  description,
  imageUrl,
  features,
}: {
  heading?: string;
  description?: string;
  imageUrl?: string;
  features?: TopFeature[];
}) {
  return (
    <section id="dining">
      {/* フル幅ヒーロー画像 + 左下ラベルオーバーレイ + グラデーション */}
      <div className="relative overflow-hidden" style={{ height: "580px" }}>
        <Image
          src={imageUrl ?? "https://oyanoyu.com/img/1719383007505.webp"}
          alt="会津の郷土料理"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 60%, var(--color-bg) 100%)",
          }}
        />
        <ImageOverlayTitle en="DINING" ja={heading ?? "お食事"} />
      </div>

      {/* 説明文 + カルーセル */}
      <div
        className="section"
        style={{
          background: "var(--color-bg)",
          paddingTop: "var(--space-md)",
        }}
      >
        <FadeIn className="container">
          {description ? (
            <RichText
              html={description}
              className="mb-12 text-center font-light leading-loose"
              style={{ color: "var(--color-text-muted)" } as React.CSSProperties}
            />
          ) : (
            <p
              className="mb-12 text-center font-light leading-loose"
              style={{ color: "var(--color-text-muted)" }}
            >
              会津の里が育む恵みを、丁寧な手仕事で食卓へ。
              <br />
              地元の旬の食材と、地元の蔵元が醸す地酒をお楽しみください。
            </p>
          )}
          <div className="px-8 md:px-10">
            <DiningCarousel features={features} />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── 05. 客室 ──────────────────────────────────────────────────────────────
// RoomsSection は _components/RoomsSection.tsx（'use client'）に分離済み

// ─── 06. アクセス ──────────────────────────────────────────────────────────

const ACCESS_INFO = [
  {
    label: "住所",
    value: "〒969-5146 福島県会津若松市大戸町大字小谷字湯ノ平2498-2",
  },
  { label: "電話", value: "0242-92-2311（受付 AM8:00〜PM20:00）" },
  { label: "お車の場合", value: "磐越自動車道 会津若松ICより約40分" },
  {
    label: "電車の場合",
    value: "JR只見線 芦ノ牧温泉駅より送迎あり（要事前連絡）",
  },
];

function AccessSection({
  heading,
  accessHtml,
  mapUrl,
}: {
  heading?: string;
  accessHtml?: string;
  mapUrl?: string;
}) {
  return (
    <section
      id="access"
      className="section"
      style={{ background: "var(--color-bg)" }}
    >
      <FadeIn className="container">
        <SectionTitle en="ACCESS" ja={heading ?? "アクセス"} />
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-start">
          {/* 左：アクセス情報 */}
          <div>
            {accessHtml ? (
              <RichText
                html={accessHtml}
                className="mb-8 [&_td:first-child]:w-28 [&_td:first-child]:tracking-[0.2em] [&_tr]:border-b"
                style={
                  {
                    color: "var(--color-text-muted)",
                    "--tw-border-opacity": 1,
                  } as React.CSSProperties
                }
              />
            ) : (
              <dl style={{ marginBottom: "var(--space-md)" }}>
                {ACCESS_INFO.map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex flex-col gap-1 border-b py-5 md:flex-row md:gap-12"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <dt
                      className="w-28 shrink-0 font-light tracking-[0.2em]"
                      style={{
                        fontSize: "var(--text-xs)",
                        color: "var(--color-accent)",
                      }}
                    >
                      {label}
                    </dt>
                    <dd
                      className="font-light leading-relaxed tracking-wide"
                      style={{
                        fontSize: "var(--text-sm)",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
            <a
              href="https://maps.google.com/?q=会津芦ノ牧温泉+不動館+小谷の湯"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border font-light tracking-[0.3em] transition-all hover:opacity-70"
              style={{
                fontSize: "var(--text-xs)",
                color: "var(--color-text)",
                borderColor: "var(--color-text)",
                padding: "0.75rem 2rem",
              }}
            >
              Google Mapsで開く →
            </a>
          </div>

          {/* 右：地図 */}
          <div className="h-[420px] overflow-hidden">
            {mapUrl ? (
              <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
              />
            ) : (
              <div
                className="flex h-full items-center justify-center"
                style={{ background: "var(--color-border)" }}
              >
                <p
                  className="font-light tracking-wide"
                  style={{
                    fontSize: "var(--text-sm)",
                    color: "var(--color-text-muted)",
                  }}
                >
                  地図データなし
                </p>
              </div>
            )}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

// ─── 07. 周辺観光 ──────────────────────────────────────────────────────────

function AroundSection({ sightseeing }: { sightseeing?: TopSightseeing[] }) {
  return (
    <section
      id="around"
      className="section"
      style={{ background: "var(--color-bg-warm)" }}
    >
      <FadeIn className="container">
        <SectionTitle en="SIGHTSEEING" ja="周辺観光" />
        <div className="px-8 md:px-10">
          <AroundCarousel sightseeing={sightseeing} />
        </div>
      </FadeIn>
    </section>
  );
}

// ─── 08. 新着情報 ──────────────────────────────────────────────────────────

function NewsSection({ newsList }: { newsList: News[] }) {
  return (
    <section
      id="news"
      className="section"
      style={{ background: "var(--color-bg)" }}
    >
      <FadeIn className="container-narrow">
        <SectionTitle en="NEWS" ja="新着情報" />
        {newsList.length === 0 ? (
          <p
            className="text-center font-light tracking-wider"
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--color-text-muted)",
            }}
          >
            現在お知らせはありません
          </p>
        ) : (
          <ul>
            {newsList.map((news, i) => (
              <li key={news.id}>
                {i === 0 && (
                  <div
                    className="h-px"
                    style={{ background: "var(--color-border)" }}
                  />
                )}
                <a
                  href={`/news/${news.id}`}
                  className="group flex items-baseline gap-8 py-6"
                >
                  <time
                    className="w-28 shrink-0 font-light tracking-widest"
                    style={{
                      fontSize: "var(--text-xs)",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    {formatDate(news.publishedAt)}
                  </time>
                  <span
                    className="font-light leading-relaxed tracking-wide transition-colors"
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "var(--color-text)",
                    }}
                  >
                    {news.title}
                  </span>
                </a>
                <div
                  className="h-px"
                  style={{ background: "var(--color-border)" }}
                />
              </li>
            ))}
          </ul>
        )}
        <div
          className="text-right"
          style={{ marginTop: "var(--space-md)" }}
        >
          <a
            href="/news"
            className="font-light tracking-[0.3em] transition-colors hover:opacity-70"
            style={{
              fontSize: "var(--text-xs)",
              color: "var(--color-text-muted)",
            }}
          >
            一覧を見る →
          </a>
        </div>
      </FadeIn>
    </section>
  );
}

// ─── 09. よくある質問 ─────────────────────────────────────────────────────

const FALLBACK_FAQ: TopFaq[] = [
  {
    fieldId: "faq-1",
    question: "チェックイン・チェックアウトの時間は？",
    answer:
      "チェックインは15:00〜、チェックアウトは11:00となっております。ご都合によりご相談も承りますので、お気軽にお問い合わせください。",
  },
  {
    fieldId: "faq-2",
    question: "送迎はありますか？",
    answer:
      "JR只見線 芦ノ牧温泉駅よりご送迎が可能です（要事前連絡）。詳細はお電話にてご確認ください。",
  },
  {
    fieldId: "faq-3",
    question: "食事のアレルギー対応はできますか？",
    answer:
      "アレルギーや食事制限がございましたら、ご予約時にお知らせください。可能な範囲で対応いたします。",
  },
  {
    fieldId: "faq-4",
    question: "お子様は宿泊できますか？",
    answer:
      "お子様のご宿泊も歓迎しております。年齢や人数に応じてご相談いたしますので、お気軽にお問い合わせください。",
  },
  {
    fieldId: "faq-5",
    question: "温泉はいつでも利用できますか？",
    answer:
      "浴場の営業時間は15:00〜23:00、翌5:00〜9:00となっております。露天付き特別室のお客様は24時間ご利用いただけます。",
  },
  {
    fieldId: "faq-6",
    question: "館内は禁煙ですか？",
    answer: "館内は全館禁煙となっております。所定の喫煙場所をご利用ください。",
  },
];

function FaqSection({ faq }: { faq?: TopFaq[] }) {
  const items = faq && faq.length > 0 ? faq : FALLBACK_FAQ;

  return (
    <section
      id="faq"
      className="section"
      style={{ background: "var(--color-bg-dark)" }}
    >
      <FadeIn className="container-narrow">
        <SectionTitle en="FAQ" ja="よくある質問" light />
        <div>
          {items.map(({ question, answer }, i) => (
            <details
              key={i}
              className="border-b"
              style={{ borderColor: "rgba(255,255,255,0.1)" }}
            >
              <summary
                className="flex cursor-pointer items-center justify-between py-5 font-light tracking-wide"
                style={{
                  fontSize: "var(--text-sm)",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                <span className="pr-6">{question}</span>
                <span
                  className="faq-toggle shrink-0 text-xl font-light"
                  style={{ color: "var(--color-accent-light)" }}
                >
                  ＋
                </span>
              </summary>
              <div
                className="pb-6 font-light leading-loose tracking-wide"
                style={{
                  fontSize: "var(--text-sm)",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {answer}
              </div>
            </details>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

// ─── 10. お問い合わせ ─────────────────────────────────────────────────────

function ContactSection({
  heading,
  description,
}: {
  heading?: string;
  description?: string;
}) {
  return (
    <section
      id="contact"
      className="section"
      style={{ background: "var(--color-bg-dark)" }}
    >
      <div className="container-narrow text-center">
        <SectionTitle en="CONTACT" ja={heading ?? "お問い合わせ"} light />
        {description ? (
          <RichText
            html={description}
            className="mb-10 font-light leading-loose tracking-[0.1em]"
            style={{ color: "rgba(255,255,255,0.55)" } as React.CSSProperties}
          />
        ) : (
          <p
            className="mb-10 font-light leading-loose tracking-[0.1em]"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            ご予約・お問い合わせはお電話または予約フォームにて承っております。
          </p>
        )}
        <a
          href="tel:0242922311"
          className="mb-3 block font-light tracking-[0.15em] text-white transition-opacity hover:opacity-70"
          style={{ fontSize: "var(--text-2xl)" }}
        >
          0242-92-2311
        </a>
        <p
          className="font-light tracking-[0.2em]"
          style={{
            fontSize: "var(--text-xs)",
            color: "rgba(255,255,255,0.35)",
            marginBottom: "var(--space-lg)",
          }}
        >
          受付時間 AM8:00〜PM20:00
        </p>
        <a
          href="https://oyanoyu.com/reservation.html"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border font-light tracking-[0.3em] text-white transition-all hover:bg-white"
          style={{
            fontSize: "var(--text-xs)",
            borderColor: "rgba(255,255,255,0.4)",
            padding: "1rem 3rem",
          }}
        >
          オンライン予約
        </a>
      </div>
    </section>
  );
}

// ─── 11. フッター ──────────────────────────────────────────────────────────

function Footer() {
  const footerNav = [
    { href: "#onsen", label: "温泉・浴場" },
    { href: "#around", label: "周辺観光" },
    { href: "#history", label: "歴史" },
    { href: "#news", label: "新着情報" },
    { href: "#dining", label: "お食事" },
    { href: "#faq", label: "よくある質問" },
    { href: "#rooms", label: "客室" },
    { href: "#contact", label: "お問い合わせ" },
    { href: "#access", label: "アクセス" },
  ];

  return (
    <footer
      className="border-t"
      style={{
        background: "var(--color-bg-dark)",
        borderColor: "rgba(255,255,255,0.05)",
        paddingBlock: "var(--space-lg) var(--space-md)",
      }}
    >
      <div className="container">
        <div
          className="flex flex-col gap-10 md:flex-row md:justify-between"
          style={{ marginBottom: "var(--space-md)" }}
        >
          {/* ロゴ・住所 */}
          <div>
            <p
              className="font-light tracking-[0.3em]"
              style={{
                fontSize: "var(--text-xs)",
                color: "rgba(255,255,255,0.35)",
                marginBottom: "0.25rem",
              }}
            >
              会津芦ノ牧温泉 不動館
            </p>
            <p
              className="font-light tracking-[0.2em] text-white"
              style={{
                fontSize: "var(--text-base)",
                marginBottom: "var(--space-sm)",
              }}
            >
              小谷の湯
            </p>
            <address
              className="not-italic font-light leading-relaxed tracking-wide"
              style={{
                fontSize: "var(--text-xs)",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              〒969-5146 福島県会津若松市
              <br />
              大戸町大字小谷字湯ノ平2498-2
              <br />
              <a
                href="tel:0242922311"
                className="transition-colors hover:opacity-60"
              >
                TEL: 0242-92-2311
              </a>
            </address>
          </div>

          {/* ナビ */}
          <nav>
            <ul
              className="grid grid-cols-2 gap-y-3 font-light tracking-[0.2em]"
              style={{
                gap: "0.75rem 3.5rem",
                fontSize: "var(--text-xs)",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              {footerNav.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="transition-colors hover:text-white"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* SNS */}
          <div>
            <p
              className="font-light tracking-[0.4em]"
              style={{
                fontSize: "var(--text-xs)",
                color: "rgba(255,255,255,0.25)",
                marginBottom: "var(--space-sm)",
              }}
            >
              FOLLOW US
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.instagram.com/fudokan_oyanoyu/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-light tracking-[0.2em] transition-colors hover:text-white"
                style={{
                  fontSize: "var(--text-xs)",
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                Instagram
              </a>
              <a
                href="https://twitter.com/fudoukanoyanoyu"
                target="_blank"
                rel="noopener noreferrer"
                className="font-light tracking-[0.2em] transition-colors hover:text-white"
                style={{
                  fontSize: "var(--text-xs)",
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                X (Twitter)
              </a>
            </div>
          </div>
        </div>

        <div
          className="border-t pt-8 text-center"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}
        >
          <p
            className="font-light tracking-[0.3em]"
            style={{
              fontSize: "var(--text-xs)",
              color: "rgba(255,255,255,0.2)",
            }}
          >
            © {new Date().getFullYear()} 会津芦ノ牧温泉 不動館 小谷の湯. All
            Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default async function Home() {
  const [topResult, newsResult] = await Promise.allSettled([
    getTop(),
    getNewsList(3),
  ]);

  const top = topResult.status === "fulfilled" ? topResult.value : null;
  const newsList =
    newsResult.status === "fulfilled" ? newsResult.value.contents : [];

  const heroSlides = top?.firstview?.images?.map((img) => ({
    url: img.url,
    alt: top.firstview.catchcopy ?? "会津芦ノ牧温泉 不動館 小谷の湯",
  }));

  return (
    <>
      <Header />
      <main>
        <HeroSlider
          catchcopy={top?.firstview?.catchcopy}
          slides={heroSlides}
        />
        <OnsenSection
          heading={top?.hotspring?.heading}
          description={top?.hotspring?.description}
          imageUrl={top?.hotspring?.image?.url}
          features={top?.hotspring?.features}
        />
        <HistorySection
          heading={top?.history?.heading}
          description={top?.history?.history}
          imageUrl={top?.history?.image?.url}
        />
        <DiningSection
          heading={top?.food?.heading}
          description={top?.food?.description}
          imageUrl={top?.food?.image?.url}
          features={top?.food?.features}
        />
        <ImageScrollBand images={top?.firstview?.images} />
        <RoomsSection rooms={top?.rooms ?? undefined} />
        <AccessSection
          heading={top?.access?.heading}
          accessHtml={top?.access?.access}
          mapUrl={top?.access?.map_url}
        />
        <AroundSection sightseeing={top?.sightseeing} />
        <NewsSection newsList={newsList} />
        <FaqSection faq={top?.faq} />
        <ContactSection
          heading={top?.contact?.heading ?? undefined}
          description={top?.contact?.description ?? undefined}
        />
      </main>
      <Footer />
    </>
  );
}
