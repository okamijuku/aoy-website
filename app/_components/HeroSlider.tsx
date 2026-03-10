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

      {/* ── キャッチコピー + 施設名（中央） ── */}
      <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
        <div>
          <h1
            className="font-light text-white"
            style={{
              fontFamily: "var(--font-serif-jp), 'Hiragino Mincho ProN', serif",
              fontSize: "clamp(2rem, 6vw, 4rem)",
              letterSpacing: "0.15em",
              lineHeight: 1.3,
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
          {/* 施設名（キャッチコピー直下） */}
          <p
            className="font-light"
            style={{
              fontSize: "0.9375rem",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.85)",
              marginTop: "1.75rem",
            }}
          >
            会津芦ノ牧温泉 不動館 小谷の湯
          </p>
        </div>
      </div>

      {/* ── 右側縦書きテキスト ── */}
      <div className="absolute right-8 top-1/2 z-10 -translate-y-1/2">
        <p
          className="font-light"
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.3em",
            color: "rgba(255,255,255,0.5)",
            writingMode: "vertical-rl",
          }}
        >
          美しい渓谷に佇む
        </p>
      </div>

      {/* ── ラインインジケーター（NOIEスタイル・下部中央） ── */}
      {active.length > 1 && (
        <div className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3">
          {active.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`スライド ${i + 1}`}
              className="transition-all duration-500"
              style={{
                width: "2.5rem",
                height: "1px",
                backgroundColor:
                  i === current
                    ? "rgba(255,255,255,1)"
                    : "rgba(255,255,255,0.4)",
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
