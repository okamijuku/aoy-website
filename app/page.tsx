import Image from "next/image";
import { Header } from "./_components/Header";
import { HeroSlider } from "./_components/HeroSlider";
import { FadeIn } from "./_components/FadeIn";
import {
  getNewsList,
  getTop,
  type News,
  type TopFaq,
  type TopFeature,
  type TopRoomsSection,
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
    <div className="mb-14 text-center">
      <p
        className={`mb-3 text-[10px] font-light tracking-[0.6em] ${
          light ? "text-[#8a7248]" : "text-[#6b4c2a]"
        }`}
      >
        {en}
      </p>
      <h2
        className={`text-2xl font-light tracking-[0.25em] ${
          light ? "text-white" : "text-[#1c1814]"
        }`}
      >
        {ja}
      </h2>
      <div
        className={`mx-auto mt-5 h-px w-12 ${
          light ? "bg-white/20" : "bg-[#cec4b4]"
        }`}
      />
    </div>
  );
}

/** microCMS のリッチテキスト（HTML）またはプレーンテキストを描画 */
function RichText({ html, className }: { html: string; className?: string }) {
  return (
    <div
      className={`[&_p]:mb-4 [&_p:last-child]:mb-0 ${className ?? ""}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function formatDate(s: string) {
  const d = new Date(s);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

// ─── 01. ファーストビュー ───────────────────────────────────────────────────

function FirstView({
  catchcopy,
  slides,
}: {
  catchcopy?: string;
  slides?: { url: string; alt: string }[];
}) {
  return (
    <section className="relative flex h-screen items-end overflow-hidden">
      <HeroSlider slides={slides} />
      <div className="absolute inset-0 bg-black/30" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-8 pb-24 md:pb-36">
        <p className="mb-8 text-[10px] font-light tracking-[0.5em] text-white/35">
          AIZU ASHINOMAKI ONSEN / FUDOKAN OYANOYU
        </p>
        <h1 className="mb-6 text-4xl font-light leading-[1.9] tracking-[0.12em] text-white md:text-5xl lg:text-6xl">
          {catchcopy ?? (
            <>
              露天風呂からの眺望は
              <br />
              まさに絶景。
            </>
          )}
        </h1>
        <p className="mb-10 text-sm font-light leading-loose tracking-[0.15em] text-white/55">
          大川の渓谷美に癒されて。
        </p>
        <div className="mb-10 flex flex-wrap items-center gap-3 text-[11px] font-light tracking-[0.3em] text-white/35">
          <span>源泉掛け流し100%</span>
          <span className="text-white/15">|</span>
          <span>全館和室</span>
          <span className="text-white/15">|</span>
          <span>会津の隠れ宿</span>
        </div>
        <a
          href="https://oyanoyu.com/reservation.html"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border border-white/40 px-9 py-3 text-xs font-light tracking-[0.3em] text-white transition-all hover:bg-white/10"
        >
          ご予約はこちら
        </a>
      </div>

      <div className="absolute bottom-8 right-8 z-10 flex flex-col items-center gap-3">
        <span
          className="text-[9px] font-light tracking-[0.4em] text-white/25"
          style={{ writingMode: "vertical-rl" }}
        >
          SCROLL
        </span>
        <div className="h-12 w-px bg-white/15" />
      </div>
    </section>
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
    <section id="onsen" className="bg-[#f7f4ee] py-24 md:py-36">
      <FadeIn className="mx-auto max-w-4xl px-6">
        <SectionTitle en="ONSEN" ja={heading ?? "温泉・浴場"} />
        {description ? (
          <RichText
            html={description}
            className="text-center text-sm font-light leading-[2.8] tracking-[0.08em] text-[#7a7068]"
          />
        ) : (
          <p className="text-center text-sm font-light leading-[2.8] tracking-[0.08em] text-[#7a7068]">
            会津芦ノ牧温泉の源泉を、加水・加温・循環なしの
            <br />
            源泉掛け流し100%でご提供しております。
            <br />
            大川の渓谷を望む露天風呂に浸かれば、
            <br />
            四季折々の自然が目の前に広がります。
          </p>
        )}
        <dl className="mt-14 grid grid-cols-1 gap-y-10 md:grid-cols-3 md:gap-x-8">
          {grid.map(({ term, desc }) => (
            <div key={term} className="border-t border-[#cec4b4] pt-6 text-center">
              <dt className="mb-3 text-xs font-light tracking-[0.3em] text-[#6b4c2a]">
                {term}
              </dt>
              <dd className="whitespace-pre-line text-sm font-light leading-relaxed tracking-wide text-[#7a7068]">
                {desc}
              </dd>
            </div>
          ))}
        </dl>
        <div className="relative mt-16 aspect-[16/9] overflow-hidden">
          <Image
            src={imageUrl ?? "https://oyanoyu.com/img/1719383739993.webp"}
            alt="大川の渓谷を望む露天風呂"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 896px"
          />
        </div>
      </FadeIn>
    </section>
  );
}

// ─── 03. 歴史 ──────────────────────────────────────────────────────────────

function HistorySection({
  heading,
  description,
}: {
  heading?: string;
  description?: string;
}) {
  return (
    <section id="history" className="bg-[#eeeae2] py-24 md:py-36">
      <FadeIn className="mx-auto max-w-3xl px-6">
        <SectionTitle en="HISTORY" ja={heading ?? "歴史"} />
        {description ? (
          <RichText
            html={description}
            className="space-y-8 text-sm font-light leading-[2.8] tracking-[0.08em] text-[#7a7068]"
          />
        ) : (
          <div className="space-y-8 text-sm font-light leading-[2.8] tracking-[0.08em] text-[#7a7068]">
            <p>
              会津芦ノ牧温泉は、会津若松市の南西、大川の峡谷に沿って湧く古湯です。
              その歴史は古く、約八百年前に開かれたとも伝わります。
              会津藩主の保護を受け、庶民と武士が共に癒しを求めた、由緒ある湯処です。
            </p>
            <p>
              不動館 小谷の湯は、その会津芦ノ牧温泉の最奥に位置する、ひっそりとした一軒宿。
              俗世の喧騒から離れ、渓谷の自然と温泉だけに向き合う、まさに「会津の隠れ宿」として知られています。
            </p>
            <p>
              長い年月を経ても変わらぬ湯の力と、代々受け継がれてきたもてなしの心。
              日常を忘れ、ただそこにある自然と向き合う時間を、どうぞお楽しみください。
            </p>
          </div>
        )}
      </FadeIn>
    </section>
  );
}

// ─── 04. お食事 ────────────────────────────────────────────────────────────

const DINING_MENU = [
  "こづゆ・にしんの山椒漬けなど、会津ならではの郷土料理",
  "地元食材を活かした季節の懐石料理",
  "地元の蔵元が醸す地酒（末廣・花春・会津中将など）",
  "素朴な温かさが心に染みる、会津の朝食",
];

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
    <section id="dining" className="bg-[#f7f4ee] py-24 md:py-36">
      <FadeIn className="mx-auto max-w-5xl px-6">
        <SectionTitle en="DINING" ja={heading ?? "お食事"} />
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={imageUrl ?? "https://oyanoyu.com/img/1719383007505.webp"}
              alt="会津の郷土料理"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            {description ? (
              <RichText
                html={description}
                className="mb-10 text-sm font-light leading-[2.8] tracking-[0.08em] text-[#7a7068]"
              />
            ) : (
              <p className="mb-10 text-sm font-light leading-[2.8] tracking-[0.08em] text-[#7a7068]">
                会津の里が育む恵みを、丁寧な手仕事で食卓へ。
                地元の旬の食材と、地元の蔵元が醸す地酒をお楽しみください。
                心を込めた一椀が、旅の記憶に寄り添います。
              </p>
            )}
            <ul className="space-y-5">
              {features && features.length > 0
                ? features.map((f, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="mt-[0.65em] h-px w-5 shrink-0 bg-[#6b4c2a]" />
                      <span>
                        <span className="block text-sm font-normal tracking-wide text-[#1c1814]">
                          {f.label}
                        </span>
                        {f.text && (
                          <span className="mt-1 block text-xs font-light leading-relaxed tracking-wide text-[#7a7068]">
                            {f.text}
                          </span>
                        )}
                      </span>
                    </li>
                  ))
                : DINING_MENU.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-4 text-sm font-light tracking-wide text-[#7a7068]"
                    >
                      <span className="mt-[0.65em] h-px w-5 shrink-0 bg-[#6b4c2a]" />
                      {item}
                    </li>
                  ))}
            </ul>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

// ─── 05. 客室 ──────────────────────────────────────────────────────────────

const ROOM_CARDS = [
  {
    name: "渓谷和室",
    desc: "大川の渓谷を望む落ち着いた和室。\n季節の移ろいを間近に感じながら、\nゆっくりとお過ごしいただけます。",
  },
  {
    name: "露天付き特別室",
    desc: "客室に露天風呂を設えた特別室。\n源泉掛け流しの温泉を\n24時間お楽しみいただけます。",
  },
];

function RoomsSection({ rooms }: { rooms?: TopRoomsSection }) {
  const roomList = rooms?.room ?? [];

  return (
    <section id="rooms" className="bg-[#eeeae2] py-24 md:py-36">
      <FadeIn className="mx-auto max-w-5xl px-6">
        <SectionTitle en="ROOMS" ja={rooms?.heading ?? "客室"} />
        {rooms?.description ? (
          <p className="mb-14 text-center text-sm font-light leading-[2.8] tracking-[0.08em] text-[#7a7068]">
            {rooms.description}
          </p>
        ) : (
          <p className="mb-14 text-center text-sm font-light leading-[2.8] tracking-[0.08em] text-[#7a7068]">
            全室、凛とした畳の和室。
            窓を開ければ、大川の渓谷が目の前に広がります。
          </p>
        )}
        {(rooms?.image ?? true) && (
          <div className="relative mb-14 aspect-[16/9] overflow-hidden">
            <Image
              src={rooms?.image?.url ?? "https://oyanoyu.com/img/1719383236514.webp"}
              alt="客室"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1024px"
            />
          </div>
        )}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {roomList.length > 0
            ? roomList.map((room, i) => (
                <div key={i} className="overflow-hidden bg-[#f7f4ee]">
                  {room.image && (
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={room.image.url}
                        alt={room.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}
                  <div className="p-7">
                    <h3 className="mb-3 text-sm font-light tracking-[0.3em] text-[#1c1814]">
                      {room.name}
                    </h3>
                    <p className="text-xs font-light leading-loose tracking-wide text-[#7a7068]">
                      {room.description}
                    </p>
                  </div>
                </div>
              ))
            : ROOM_CARDS.map(({ name, desc }) => (
                <div key={name} className="border border-[#cec4b4] bg-[#f7f4ee] p-6">
                  <h3 className="mb-3 text-sm font-light tracking-[0.3em] text-[#1c1814]">
                    {name}
                  </h3>
                  <p className="whitespace-pre-line text-xs font-light leading-loose tracking-wide text-[#7a7068]">
                    {desc}
                  </p>
                </div>
              ))}
        </div>
      </FadeIn>
    </section>
  );
}

// ─── 06. アクセス ──────────────────────────────────────────────────────────

const ACCESS_INFO = [
  { label: "住所", value: "〒969-5146 福島県会津若松市大戸町大字小谷字湯ノ平2498-2" },
  { label: "電話", value: "0242-92-2311（受付 AM8:00〜PM20:00）" },
  { label: "お車の場合", value: "磐越自動車道 会津若松ICより約40分" },
  { label: "電車の場合", value: "JR只見線 芦ノ牧温泉駅より送迎あり（要事前連絡）" },
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
    <section id="access" className="bg-[#f7f4ee] py-24 md:py-36">
      <FadeIn className="mx-auto max-w-3xl px-6">
        <SectionTitle en="ACCESS" ja={heading ?? "アクセス"} />
        {accessHtml ? (
          <RichText
            html={accessHtml}
            className="mb-12 text-sm font-light leading-[2.8] tracking-[0.08em] text-[#7a7068]"
          />
        ) : (
          <dl className="mb-12 space-y-0">
            {ACCESS_INFO.map(({ label, value }) => (
              <div
                key={label}
                className="flex flex-col gap-1 border-b border-[#e4ddd3] py-5 md:flex-row md:gap-12"
              >
                <dt className="w-28 shrink-0 text-xs font-light tracking-[0.2em] text-[#6b4c2a]">
                  {label}
                </dt>
                <dd className="text-sm font-light leading-relaxed tracking-wide text-[#7a7068]">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        )}
        {mapUrl && (
          <div className="mb-12 overflow-hidden">
            <iframe
              src={mapUrl}
              width="100%"
              height="450"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="border-0"
            />
          </div>
        )}
        <div className="text-center">
          <a
            href="https://maps.google.com/?q=会津芦ノ牧温泉+不動館+小谷の湯"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-[#1c1814] px-9 py-3 text-xs font-light tracking-[0.3em] text-[#1c1814] transition-all hover:bg-[#1c1814] hover:text-[#f7f4ee]"
          >
            Google Mapsで開く →
          </a>
        </div>
      </FadeIn>
    </section>
  );
}

// ─── 07. 周辺観光 ──────────────────────────────────────────────────────────

const FALLBACK_SPOTS = [
  { name: "芦ノ牧温泉駅", description: "猫の駅長で有名な会津鉄道の駅。レトロな駅舎と周辺の散策が楽しめます。", access: undefined },
  { name: "大川ライン遊覧", description: "大川の渓谷美を船上から楽しむ遊覧。四季折々の景色が眼前に広がります。", access: undefined },
  { name: "鶴ヶ城（若松城）", description: "会津若松市内に立つ名城。幕末の歴史と美しい天守閣が見どころ。", access: "車で約40分" },
  { name: "飯盛山・白虎隊の史跡", description: "幕末の悲劇「白虎隊」ゆかりの地。会津の歴史と武士道精神を感じられます。", access: undefined },
  { name: "七日町通り", description: "大正・昭和の面影を残す城下町の通り。古民家カフェや雑貨店が並びます。", access: undefined },
  { name: "会津の酒蔵", description: "末廣酒造・花春酒造など、会津の地酒を醸す蔵元を見学できます。", access: undefined },
];

function AroundSection({ sightseeing }: { sightseeing?: TopSightseeing[] }) {
  const spots = sightseeing && sightseeing.length > 0 ? sightseeing : FALLBACK_SPOTS;

  return (
    <section id="around" className="bg-[#eeeae2] py-24 md:py-36">
      <FadeIn className="mx-auto max-w-4xl px-6">
        <SectionTitle en="AROUND" ja="周辺観光" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {spots.map((spot) => (
            <div key={spot.name} className="bg-[#f7f4ee] p-7">
              <h3 className="mb-3 text-xs font-light tracking-[0.25em] text-[#1c1814]">
                {spot.name}
              </h3>
              <p className="text-xs font-light leading-loose tracking-wide text-[#7a7068]">
                {spot.description}
              </p>
              {spot.access && (
                <p className="mt-2 text-[11px] font-light tracking-wide text-[#9a8e82]">
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
    <section id="news" className="bg-[#f7f4ee] py-24 md:py-36">
      <FadeIn className="mx-auto max-w-3xl px-6">
        <SectionTitle en="NEWS" ja="新着情報" />
        {newsList.length === 0 ? (
          <p className="text-center text-sm font-light tracking-wider text-[#9a8e82]">
            現在お知らせはありません
          </p>
        ) : (
          <ul>
            {newsList.map((news, i) => (
              <li key={news.id}>
                {i === 0 && <div className="h-px bg-[#ddd5c8]" />}
                <a
                  href={`/news/${news.id}`}
                  className="group flex items-baseline gap-8 py-6"
                >
                  <time className="w-28 shrink-0 text-xs font-light tracking-widest text-[#9a8e82]">
                    {formatDate(news.publishedAt)}
                  </time>
                  <span className="text-sm font-light leading-relaxed tracking-wide text-[#1c1814] transition-colors group-hover:text-[#6b4c2a]">
                    {news.title}
                  </span>
                </a>
                <div className="h-px bg-[#ddd5c8]" />
              </li>
            ))}
          </ul>
        )}
        <div className="mt-10 text-right">
          <a
            href="/news"
            className="text-xs font-light tracking-[0.3em] text-[#9a8e82] transition-colors hover:text-[#6b4c2a]"
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
    answer: "チェックインは15:00〜、チェックアウトは11:00となっております。ご都合によりご相談も承りますので、お気軽にお問い合わせください。",
  },
  {
    fieldId: "faq-2",
    question: "送迎はありますか？",
    answer: "JR只見線 芦ノ牧温泉駅よりご送迎が可能です（要事前連絡）。詳細はお電話にてご確認ください。",
  },
  {
    fieldId: "faq-3",
    question: "食事のアレルギー対応はできますか？",
    answer: "アレルギーや食事制限がございましたら、ご予約時にお知らせください。可能な範囲で対応いたします。",
  },
  {
    fieldId: "faq-4",
    question: "お子様は宿泊できますか？",
    answer: "お子様のご宿泊も歓迎しております。年齢や人数に応じてご相談いたしますので、お気軽にお問い合わせください。",
  },
  {
    fieldId: "faq-5",
    question: "温泉はいつでも利用できますか？",
    answer: "浴場の営業時間は15:00〜23:00、翌5:00〜9:00となっております。露天付き特別室のお客様は24時間ご利用いただけます。",
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
    <section id="faq" className="bg-[#eeeae2] py-24 md:py-36">
      <FadeIn className="mx-auto max-w-3xl px-6">
        <SectionTitle en="FAQ" ja="よくある質問" />
        <div>
          {items.map(({ question, answer }, i) => (
            <details key={i} className="border-b border-[#cec4b4]">
              <summary className="flex cursor-pointer items-center justify-between py-5 text-sm font-light tracking-wide text-[#1c1814]">
                <span className="pr-6">{question}</span>
                <span className="faq-toggle shrink-0 text-xl font-light text-[#6b4c2a]">
                  ＋
                </span>
              </summary>
              <div className="pb-6 text-sm font-light leading-loose tracking-wide text-[#7a7068]">
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
    <section id="contact" className="bg-[#1a1612] py-24 md:py-36">
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
          className="inline-block border border-white/40 px-12 py-4 text-xs font-light tracking-[0.3em] text-white transition-all hover:bg-white hover:text-[#1a1612]"
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
    <footer className="border-t border-white/5 bg-[#1a1612] pb-10 pt-16">
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
              <a href="tel:0242922311" className="transition-colors hover:text-white/60">
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
            © {new Date().getFullYear()} 会津芦ノ牧温泉 不動館 小谷の湯. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default async function Home() {
  // top API と news API を並行取得
  const [topResult, newsResult] = await Promise.allSettled([
    getTop(),
    getNewsList(3),
  ]);

  const top = topResult.status === "fulfilled" ? topResult.value : null;
  const newsList =
    newsResult.status === "fulfilled" ? newsResult.value.contents : [];

  // firstview.images を HeroSlider 用に変換
  const heroSlides = top?.firstview?.images?.map((img) => ({
    url: img.url,
    alt: top.firstview.catchcopy ?? "会津芦ノ牧温泉 不動館 小谷の湯",
  }));

  return (
    <>
      <Header />
      <main>
        <FirstView
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
