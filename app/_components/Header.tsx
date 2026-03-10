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

const logoImageUrl = process.env.NEXT_PUBLIC_LOGO_IMAGE_URL;

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
        {/* ロゴ：環境変数に画像URLがあれば<img>、なければテキスト */}
        <a href="/" className="flex flex-col gap-0.5">
          {logoImageUrl ? (
            <img
              src={logoImageUrl}
              alt="小谷の湯"
              className="h-10 w-auto"
            />
          ) : (
            <>
              <span
                className={`text-[0.6875rem] font-light tracking-[0.3em] transition-colors duration-500 ${
                  scrolled ? "text-[#999999]" : "text-white/50"
                }`}
              >
                会津芦ノ牧温泉 不動館
              </span>
              <span
                className={`text-base font-light tracking-[0.25em] transition-colors duration-500 ${
                  scrolled ? "text-[#1a1a1a]" : "text-white"
                }`}
              >
                小谷の湯
              </span>
            </>
          )}
        </a>

        {/* ナビゲーション */}
        <nav className="hidden lg:block">
          <ul
            className={`flex items-center gap-7 font-light transition-colors duration-500 ${
              scrolled ? "text-[#666666]" : "text-white/70"
            }`}
            style={{ fontSize: "0.9375rem", letterSpacing: "0.05em" }}
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
          className={`font-light transition-all ${
            scrolled
              ? "border border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white"
              : "border border-white/50 text-white hover:bg-white hover:text-[#1a1612]"
          }`}
          style={{ fontSize: "0.8125rem", letterSpacing: "0.05em", padding: "0.5rem 1.25rem" }}
        >
          ご予約
        </a>
      </div>
    </header>
  );
}
