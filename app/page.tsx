import Image from "next/image";
import { Header } from "./_components/Header";
import { HeroSlider } from "./_components/HeroSlider";
import { FadeIn } from "./_components/FadeIn";
import { DiningCarousel } from "./_components/DiningCarousel";
import { RoomsSection } from "./_components/RoomsSection";
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

function RichText({ html, className }: { html: string; className?: string }) {
  return (
    <div
      className={`[&_p]:mb-4 [&_p:last-child]:mb-0 [&_table]:w-full [&_td]:py-3 [&_td]:pr-6 [&_td]:text-sm [&_td]:font-light [&_td]:leading-relaxed [&_td]:tracking-wide ${className ?? ""}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function formatDate(s: string) {
  const d = new Date(s);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

// 画像の上にタイトルをオーバーレイするヘルパー
function ImageOverlayTitle({
  en,
  ja,
  align = "center",
}: {
  en: string;
  ja: string;
  align?: "center" | "bottom-left";
}) {
  if (align === "bottom-left") {
    return (
      <div className="absolute inset-x-0 bottom-0 px-10 pb-14 md:px-16">
        <p
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.25em",
            color: "#c9a97a",
            fontWeight: 300,
            marginBottom: "0.75rem",
            textTransform: "uppercase",
          }}
        >
          {en}
        </p>
        <h2
          style={{
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            fontWeight: 400,
            color: "white",
            letterSpacing: "0.15em",
          }}
        >
          {ja}
        </h2>
      </div>
    );
  }
  return (
    <div className="absolute inset-0 flex items-center justify-center text-center">
      <div>
        <p
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.25em",
            color: "#c9a97a",
            fontWeight: 300,
            marginBottom: "0.75rem",
            textTransform: "uppercase",
          }}
        >
          {en}
        </p>
        <h2
          style={{
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            fontWeight: 400,
            color: "white",
            letterSpacing: "0.15em",
          }}
        >
          {ja}
        </h2>
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
      {/* フル幅ヒーロー画像 + オーバーレイタイトル */}
      <div className="relative overflow-hidden" style={{ height: "580px" }}>
        <Image
          src={imageUrl ?? "https://oyanoyu.com/img/1719383739993.webp"}
          alt="大川の渓谷を望む露天風呂"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/45" />
        <ImageOverlayTitle en="HOT SPRING" ja={heading ?? "温泉・浴場"} />
      </div>

      {/* 説明文 + 特徴グリッド */}
      <div className="bg-[#faf8f5] py-[80px] md:py-[100px]">
        <FadeIn className="mx-auto max-w-4xl px-6">
          {description ? (
            <RichText
              html={description}
              className="text-center text-sm font-light leading-[2.8] tracking-[0.08em] text-[#666666]"
            />
          ) : (
            <p className="text-center text-sm font-light leading-[2.8] tracking-[0.08em] text-[#666666]">
              会津芦ノ牧温泉の源泉を、加水・加温・循環なしの
              <br />
              源泉掛け流し100%でご提供しております。
              <br />
              大川の渓谷を望む露天風呂に浸かれば、
              <br />
              四季折々の自然が目の前に広がります。
            </p>
          )}
          <dl className="mt-16 grid grid-cols-1 gap-y-10 md:grid-cols-3 md:gap-x-10">
            {grid.map(({ term, desc }) => (
              <div
                key={term}
                className="border-t border-[#d4c9b8] pt-6 text-center"
              >
                <dt className="mb-3 text-xs font-light tracking-[0.3em] text-[#8b6f47]">
                  {term}
                </dt>
                <dd className="whitespace-pre-line text-sm font-light leading-relaxed tracking-wide text-[#666666]">
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
    <section id="history" className="bg-[#f5f0e8] py-[80px] md:py-[100px]">
      <FadeIn className="mx-auto max-w-5xl px-6">
        <SectionTitle en="HISTORY" ja={heading ?? "歴史"} />
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-16">
          {/* 画像 */}
          {imageUrl && (
            <div className="w-full md:w-1/2">
              <div className="relative aspect-[4/3] overflow-hidden">
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
          <div className={`w-full py-2 ${imageUrl ? "md:w-1/2" : ""}`}>
            {paragraphs.map((para, i) => (
              <p
                key={i}
                className="mb-6 last:mb-0 text-base font-light leading-[2.0] tracking-[0.08em] text-[#444444]"
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
      {/* フル幅ヒーロー画像 + 左下ラベルオーバーレイ */}
      <div className="relative overflow-hidden" style={{ height: "580px" }}>
        <Image
          src={imageUrl ?? "https://oyanoyu.com/img/1719383007505.webp"}
          alt="会津の郷土料理"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        <ImageOverlayTitle
          en="DINING"
          ja={heading ?? "お食事"}
          align="bottom-left"
        />
      </div>

      {/* 説明文 + カルーセル */}
      <div className="bg-[#faf8f5] py-[80px] md:py-[100px]">
        <FadeIn className="mx-auto max-w-5xl px-6">
          {description ? (
            <RichText
              html={description}
              className="mb-12 text-center text-sm font-light leading-[2.8] tracking-[0.08em] text-[#666666]"
            />
          ) : (
            <p className="mb-12 text-center text-sm font-light leading-[2.8] tracking-[0.08em] text-[#666666]">
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
    <section id="access" className="bg-[#faf8f5] py-[80px] md:py-[100px]">
      <FadeIn className="mx-auto max-w-6xl px-6">
        <SectionTitle en="ACCESS" ja={heading ?? "アクセス"} />
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-start">
          {/* 左：アクセス情報 */}
          <div>
            {accessHtml ? (
              <RichText
                html={accessHtml}
                className="mb-8 text-[#666666] [&_td:first-child]:w-28 [&_td:first-child]:text-xs [&_td:first-child]:tracking-[0.2em] [&_td:first-child]:text-[#8b6f47] [&_tr]:border-b [&_tr]:border-[#ddd4c4]"
              />
            ) : (
              <dl className="mb-8 space-y-0">
                {ACCESS_INFO.map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex flex-col gap-1 border-b border-[#ddd4c4] py-5 md:flex-row md:gap-12"
                  >
                    <dt className="w-28 shrink-0 text-xs font-light tracking-[0.2em] text-[#8b6f47]">
                      {label}
                    </dt>
                    <dd className="text-sm font-light leading-relaxed tracking-wide text-[#666666]">
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
              className="inline-block border border-[#1a1a1a] px-9 py-3 text-xs font-light tracking-[0.3em] text-[#1a1a1a] transition-all hover:bg-[#1a1a1a] hover:text-[#faf8f5]"
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
              <div className="flex h-full items-center justify-center bg-[#e8e0d4]">
                <p className="text-sm font-light tracking-wide text-[#999999]">
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

const FALLBACK_SPOTS = [
  {
    name: "芦ノ牧温泉駅",
    description:
      "猫の駅長で有名な会津鉄道の駅。レトロな駅舎と周辺の散策が楽しめます。",
    access: undefined,
  },
  {
    name: "大川ライン遊覧",
    description:
      "大川の渓谷美を船上から楽しむ遊覧。四季折々の景色が眼前に広がります。",
    access: undefined,
  },
  {
    name: "鶴ヶ城（若松城）",
    description:
      "会津若松市内に立つ名城。幕末の歴史と美しい天守閣が見どころ。",
    access: "車で約40分",
  },
  {
    name: "飯盛山・白虎隊の史跡",
    description:
      "幕末の悲劇「白虎隊」ゆかりの地。会津の歴史と武士道精神を感じられます。",
    access: undefined,
  },
  {
    name: "七日町通り",
    description:
      "大正・昭和の面影を残す城下町の通り。古民家カフェや雑貨店が並びます。",
    access: undefined,
  },
  {
    name: "会津の酒蔵",
    description:
      "末廣酒造・花春酒造など、会津の地酒を醸す蔵元を見学できます。",
    access: undefined,
  },
];

function AroundSection({ sightseeing }: { sightseeing?: TopSightseeing[] }) {
  const spots =
    sightseeing && sightseeing.length > 0 ? sightseeing : FALLBACK_SPOTS;

  return (
    <section id="around" className="bg-[#f5f0e8] py-[80px] md:py-[100px]">
      <FadeIn className="mx-auto max-w-5xl px-6">
        <SectionTitle en="SIGHTSEEING" ja="周辺観光" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {spots.map((spot) => (
            <div key={spot.name} className="bg-white p-8">
              <h3 className="mb-3 text-xs font-light tracking-[0.3em] text-[#1a1a1a]">
                {spot.name}
              </h3>
              <p className="text-sm font-light leading-loose tracking-wide text-[#666666]">
                {spot.description}
              </p>
              {spot.access && (
                <p className="mt-3 text-[11px] font-light tracking-wide text-[#999999]">
                  {spot.access}
                </p>
              )}
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

// ─── 08. 新着情報 ──────────────────────────────────────────────────────────

function NewsSection({ newsList }: { newsList: News[] }) {
  return (
    <section id="news" className="bg-[#faf8f5] py-[80px] md:py-[100px]">
      <FadeIn className="mx-auto max-w-3xl px-6">
        <SectionTitle en="NEWS" ja="新着情報" />
        {newsList.length === 0 ? (
          <p className="text-center text-sm font-light tracking-wider text-[#999999]">
            現在お知らせはありません
          </p>
        ) : (
          <ul>
            {newsList.map((news, i) => (
              <li key={news.id}>
                {i === 0 && <div className="h-px bg-[#d4c9b8]" />}
                <a
                  href={`/news/${news.id}`}
                  className="group flex items-baseline gap-8 py-6"
                >
                  <time className="w-28 shrink-0 text-xs font-light tracking-widest text-[#999999]">
                    {formatDate(news.publishedAt)}
                  </time>
                  <span className="text-sm font-light leading-relaxed tracking-wide text-[#1a1a1a] transition-colors group-hover:text-[#8b6f47]">
                    {news.title}
                  </span>
                </a>
                <div className="h-px bg-[#d4c9b8]" />
              </li>
            ))}
          </ul>
        )}
        <div className="mt-10 text-right">
          <a
            href="/news"
            className="text-xs font-light tracking-[0.3em] text-[#999999] transition-colors hover:text-[#8b6f47]"
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
    <section id="faq" className="bg-[#2a2420] py-[80px] md:py-[100px]">
      <FadeIn className="mx-auto max-w-3xl px-6">
        <SectionTitle en="FAQ" ja="よくある質問" light />
        <div>
          {items.map(({ question, answer }, i) => (
            <details key={i} className="border-b border-white/10">
              <summary className="flex cursor-pointer items-center justify-between py-5 text-sm font-light tracking-wide text-white/80">
                <span className="pr-6">{question}</span>
                <span className="faq-toggle shrink-0 text-xl font-light text-[#c9a97a]">
                  ＋
                </span>
              </summary>
              <div className="pb-6 text-sm font-light leading-loose tracking-wide text-white/50">
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
    <section id="contact" className="bg-[#1a1a1a] py-[80px] md:py-[100px]">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <SectionTitle en="CONTACT" ja={heading ?? "お問い合わせ"} light />
        {description ? (
          <RichText
            html={description}
            className="mb-10 text-sm font-light leading-loose tracking-[0.1em] text-white/55"
          />
        ) : (
          <p className="mb-10 text-sm font-light leading-loose tracking-[0.1em] text-white/55">
            ご予約・お問い合わせはお電話または予約フォームにて承っております。
          </p>
        )}
        <a
          href="tel:0242922311"
          className="mb-3 block text-4xl font-light tracking-[0.15em] text-white transition-opacity hover:opacity-70"
        >
          0242-92-2311
        </a>
        <p className="mb-14 text-xs font-light tracking-[0.2em] text-white/35">
          受付時間 AM8:00〜PM20:00
        </p>
        <a
          href="https://oyanoyu.com/reservation.html"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border border-white/40 px-12 py-4 text-xs font-light tracking-[0.3em] text-white transition-all hover:bg-white hover:text-[#1a1a1a]"
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
    <footer className="border-t border-white/5 bg-[#1a1a1a] pb-10 pt-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex flex-col gap-10 md:flex-row md:justify-between">
          <div>
            <p className="mb-1 text-[9px] font-light tracking-[0.3em] text-white/35">
              会津芦ノ牧温泉 不動館
            </p>
            <p className="mb-5 text-base font-light tracking-[0.2em] text-white">
              小谷の湯
            </p>
            <address className="not-italic text-xs font-light leading-relaxed tracking-wide text-white/35">
              〒969-5146 福島県会津若松市
              <br />
              大戸町大字小谷字湯ノ平2498-2
              <br />
              <a
                href="tel:0242922311"
                className="transition-colors hover:text-white/60"
              >
                TEL: 0242-92-2311
              </a>
            </address>
          </div>
          <nav>
            <ul className="grid grid-cols-2 gap-x-14 gap-y-3 text-xs font-light tracking-[0.2em] text-white/45">
              {footerNav.map(({ href, label }) => (
                <li key={href}>
                  <a href={href} className="transition-colors hover:text-white">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="mb-5 text-[10px] font-light tracking-[0.4em] text-white/25">
              FOLLOW US
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.instagram.com/fudokan_oyanoyu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-light tracking-[0.2em] text-white/45 transition-colors hover:text-white"
              >
                Instagram
              </a>
              <a
                href="https://twitter.com/fudoukanoyanoyu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-light tracking-[0.2em] text-white/45 transition-colors hover:text-white"
              >
                X (Twitter)
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 text-center">
          <p className="text-[10px] font-light tracking-[0.3em] text-white/20">
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
