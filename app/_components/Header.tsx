"use client";

import { useEffect, useState } from "react";

const NAV = [
  { href: "#onsen", label: "温泉" },
  { href: "#history", label: "歴史" },
  { href: "#dining", label: "食事" },
  { href: "#rooms", label: "客室" },
  { href: "#access", label: "アクセス" },
  { href: "#around", label: "周辺観光" },
  { href: "#news", label: "お知らせ" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        {/* ロゴ */}
        <a href="/" className="flex flex-col gap-0.5">
          <span
            className={`text-[9px] font-light tracking-[0.3em] transition-colors duration-500 ${
              scrolled ? "text-[#999999]" : "text-white/50"
            }`}
          >
            会津芦ノ牧温泉 不動館
          </span>
          <span
            className={`text-sm font-light tracking-[0.25em] transition-colors duration-500 ${
              scrolled ? "text-[#1a1a1a]" : "text-white"
            }`}
          >
            小谷の湯
          </span>
        </a>

        {/* ナビゲーション */}
        <nav className="hidden lg:block">
          <ul
            className={`flex items-center gap-7 text-[11px] font-light tracking-[0.2em] transition-colors duration-500 ${
              scrolled ? "text-[#666666]" : "text-white/70"
            }`}
          >
            {NAV.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className={`transition-colors ${
                    scrolled ? "hover:text-[#1a1a1a]" : "hover:text-white"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* 予約ボタン */}
        <a
          href="https://oyanoyu.com/reservation.html"
          target="_blank"
          rel="noopener noreferrer"
          className={`px-5 py-2 text-[11px] font-light tracking-[0.2em] transition-all ${
            scrolled
              ? "border border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white"
              : "border border-white/50 text-white hover:bg-white hover:text-[#1a1612]"
          }`}
        >
          ご予約
        </a>
      </div>
    </header>
  );
}
