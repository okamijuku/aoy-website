"use client";

import { useState } from "react";
import type { TopFeature } from "@/libs/microcms";

export function DiningCarousel({ features }: { features?: TopFeature[] }) {
  const [index, setIndex] = useState(0);

  if (!features || features.length === 0) {
    return (
      <p className="text-center text-sm font-light tracking-wider text-[#999999]">
        準備中
      </p>
    );
  }

  const total = features.length;
  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <div className="relative">
      {/* ── カルーセル本体 ── */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {features.map((feature, i) => (
            <div
              key={i}
              className="w-full shrink-0 px-3 md:w-1/2"
            >
              <div className="h-full rounded-lg bg-white px-8 py-8 shadow-sm">
                <p className="mb-4 text-xs font-light tracking-[0.25em] text-[#8b6f47]">
                  {feature.label}
                </p>
                <p className="whitespace-pre-line text-sm font-light leading-[2.4] tracking-[0.08em] text-[#666666]">
                  {feature.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 左矢印 ── */}
      <button
        onClick={prev}
        aria-label="前へ"
        className="absolute left-0 top-1/2 -translate-x-4 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-[#d4c9b8] bg-white text-[#8b6f47] shadow-sm transition-all hover:bg-[#8b6f47] hover:text-white md:-translate-x-6"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* ── 右矢印 ── */}
      <button
        onClick={next}
        aria-label="次へ"
        className="absolute right-0 top-1/2 translate-x-4 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-[#d4c9b8] bg-white text-[#8b6f47] shadow-sm transition-all hover:bg-[#8b6f47] hover:text-white md:translate-x-6"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* ── ドットインジケーター ── */}
      <div className="mt-8 flex justify-center gap-2">
        {features.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`カード ${i + 1}`}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: i === index ? "1.5rem" : "0.375rem",
              backgroundColor: i === index ? "#8b6f47" : "#d4c9b8",
            }}
          />
        ))}
      </div>
    </div>
  );
}
