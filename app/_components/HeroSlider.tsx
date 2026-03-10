"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

type Slide = { url: string; alt: string };

const FALLBACK_SLIDES: Slide[] = [
  { url: "https://oyanoyu.com/img/1719374915159.webp", alt: "会津芦ノ牧温泉 不動館 小谷の湯" },
  { url: "https://oyanoyu.com/img/1719375178665.webp", alt: "大川の渓谷美" },
  { url: "https://oyanoyu.com/img/1719375489979.webp", alt: "露天風呂からの眺望" },
];

const INTERVAL = 4000;
const FADE_DURATION = 1200;

export function HeroSlider({
  slides,
  catchcopy,
}: {
  slides?: Slide[];
  catchcopy?: string;
}) {
  const active = slides && slides.length > 0 ? slides : FALLBACK_SLIDES;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (active.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % active.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, [active.length]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* ── スライド画像 ── */}
      {active.map((slide, i) => (
        <div
          key={slide.url}
          className="absolute inset-0"
          style={{
            opacity: i === current ? 1 : 0,
            transition: `opacity ${FADE_DURATION}ms ease-in-out`,
          }}
        >
          <Image
            src={slide.url}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* ── オーバーレイ ── */}
      <div className="absolute inset-0 bg-black/35" />

      {/* ── キャッチコピー（中央） ── */}
      <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
        <h1
          className="font-light text-white"
          style={{
            fontFamily: "var(--font-serif-jp), 'Hiragino Mincho ProN', serif",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            letterSpacing: "0.15em",
            lineHeight: 1.9,
            textShadow: "0 2px 20px rgba(0,0,0,0.3)",
          }}
        >
          {catchcopy ?? (
            <>
              露天風呂からの眺望は
              <br />
              まさに絶景。
            </>
          )}
        </h1>
      </div>

      {/* ── 施設名（左下） ── */}
      <div className="absolute bottom-10 left-8 z-10">
        <p
          className="text-white/50 font-light"
          style={{ fontSize: "0.65rem", letterSpacing: "0.35em" }}
        >
          会津芦ノ牧温泉 不動館 小谷の湯
        </p>
      </div>

      {/* ── ドットインジケーター（下部中央） ── */}
      {active.length > 1 && (
        <div className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {active.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`スライド ${i + 1}`}
              className="h-1.5 rounded-full transition-all duration-500"
              style={{
                width: i === current ? "2rem" : "0.375rem",
                backgroundColor:
                  i === current ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
