"use client";

import Image from "next/image";
import { useRef } from "react";
import type { TopSightseeing } from "@/libs/microcms";

const FALLBACK_SPOTS: TopSightseeing[] = [
  {
    fieldId: "s1",
    name: "芦ノ牧温泉駅",
    description:
      "猫の駅長で有名な会津鉄道の駅。レトロな駅舎と周辺の散策が楽しめます。",
    access: undefined,
  },
  {
    fieldId: "s2",
    name: "大川ライン遊覧",
    description:
      "大川の渓谷美を船上から楽しむ遊覧。四季折々の景色が眼前に広がります。",
    access: undefined,
  },
  {
    fieldId: "s3",
    name: "鶴ヶ城（若松城）",
    description:
      "会津若松市内に立つ名城。幕末の歴史と美しい天守閣が見どころ。",
    access: "車で約40分",
  },
  {
    fieldId: "s4",
    name: "飯盛山・白虎隊の史跡",
    description:
      "幕末の悲劇「白虎隊」ゆかりの地。会津の歴史と武士道精神を感じられます。",
    access: undefined,
  },
  {
    fieldId: "s5",
    name: "七日町通り",
    description:
      "大正・昭和の面影を残す城下町の通り。古民家カフェや雑貨店が並びます。",
    access: undefined,
  },
  {
    fieldId: "s6",
    name: "会津の酒蔵",
    description:
      "末廣酒造・花春酒造など、会津の地酒を醸す蔵元を見学できます。",
    access: undefined,
  },
];

const CARD_WIDTH = 280;
const SCROLL_AMOUNT = CARD_WIDTH + 24; // カード幅 + gap

export function AroundCarousel({
  sightseeing,
}: {
  sightseeing?: TopSightseeing[];
}) {
  const spots =
    sightseeing && sightseeing.length > 0 ? sightseeing : FALLBACK_SPOTS;
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () =>
    scrollRef.current?.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
  const scrollRight = () =>
    scrollRef.current?.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });

  return (
    <div className="relative">
      {/* 左矢印 */}
      <button
        onClick={scrollLeft}
        aria-label="前へ"
        className="absolute -left-5 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#d4c9b8] bg-white text-[#8b6f47] shadow-sm transition-all hover:bg-[#8b6f47] hover:text-white md:-left-7"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M10 12L6 8l4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* スクロールコンテナ */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {spots.map((spot) => (
          <div
            key={spot.fieldId}
            className="shrink-0 overflow-hidden rounded-2xl bg-white shadow-md"
            style={{ width: `${CARD_WIDTH}px`, height: "360px" }}
          >
            {/* 画像エリア（200px） */}
            <div
              className="relative w-full overflow-hidden"
              style={{ height: "200px" }}
            >
              {spot.image ? (
                <Image
                  src={spot.image.url}
                  alt={spot.name}
                  fill
                  className="object-cover"
                  sizes="280px"
                />
              ) : (
                <div className="h-full w-full bg-[#e8e0d5]" />
              )}
            </div>

            {/* テキストエリア */}
            <div className="flex h-[160px] flex-col justify-start p-5">
              <h3
                className="mb-2 font-light tracking-[0.2em] text-[#1a1a1a]"
                style={{ fontSize: "1.0625rem" }}
              >
                {spot.name}
              </h3>
              <p
                className="font-light leading-relaxed tracking-wide text-[#666666] line-clamp-3"
                style={{ fontSize: "0.8125rem" }}
              >
                {spot.description}
              </p>
              {spot.access && (
                <p className="mt-auto text-[11px] font-light tracking-wide text-[#999999]">
                  {spot.access}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 右矢印 */}
      <button
        onClick={scrollRight}
        aria-label="次へ"
        className="absolute -right-5 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#d4c9b8] bg-white text-[#8b6f47] shadow-sm transition-all hover:bg-[#8b6f47] hover:text-white md:-right-7"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M6 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* スクロールバー非表示 */}
      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
