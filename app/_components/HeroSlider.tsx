"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

type Slide = { url: string; alt: string };

const FALLBACK_SLIDES: Slide[] = [
  { url: "https://oyanoyu.com/img/1719374915159.webp", alt: "会津芦ノ牧温泉 不動館 小谷の湯" },
  { url: "https://oyanoyu.com/img/1719375178665.webp", alt: "大川の渓谷美" },
  { url: "https://oyanoyu.com/img/1719375489979.webp", alt: "露天風呂からの眺望" },
];

const INTERVAL = 5000;
const FADE_DURATION = 1200;

export function HeroSlider({ slides }: { slides?: Slide[] }) {
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
    <>
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
    </>
  );
}
