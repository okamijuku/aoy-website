"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import type { TopRoomsSection, TopRoom } from "@/libs/microcms";

// ─── モーダル ────────────────────────────────────────────────────────────────

function RoomModal({
  room,
  onClose,
}: {
  room: TopRoom;
  onClose: () => void;
}) {
  // ESC キーで閉じる
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    // モーダル表示中はスクロールを止める
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ animation: "fadeIn 0.25s ease-out" }}
    >
      {/* 背景オーバーレイ */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* モーダル本体 */}
      <div
        className="relative z-10 w-full max-w-[700px] overflow-hidden rounded-xl bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label={room.name}
      >
        {/* 閉じるボタン */}
        <button
          onClick={onClose}
          aria-label="閉じる"
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white transition-colors hover:bg-black/50"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M12 4L4 12M4 4l8 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* 画像 */}
        {room.image && (
          <div className="relative w-full" style={{ height: "380px" }}>
            <Image
              src={room.image.url}
              alt={room.name}
              fill
              className="object-cover"
              sizes="700px"
            />
          </div>
        )}

        {/* テキスト */}
        <div className="px-8 py-7">
          <h3 className="mb-4 text-lg font-light tracking-[0.25em] text-[#1a1a1a]">
            {room.name}
          </h3>
          <p className="text-sm font-light leading-[2.4] tracking-[0.08em] text-[#666666]">
            {room.description}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

// ─── RoomsSection ────────────────────────────────────────────────────────────

const FALLBACK_IMAGE = "https://oyanoyu.com/img/1719383236514.webp";

export function RoomsSection({ rooms }: { rooms?: TopRoomsSection }) {
  const [selected, setSelected] = useState<TopRoom | null>(null);
  const close = useCallback(() => setSelected(null), []);

  const roomList = rooms?.room ?? [];

  return (
    <section id="rooms" className="bg-[#f0ece5] py-[60px] md:py-[80px]">
      <div className="mx-auto max-w-5xl px-6">
        {/* 見出し */}
        <div className="section-heading">
          <p className="en-label">ROOMS</p>
          <h2 className="ja-heading">{rooms?.heading ?? "客室"}</h2>
        </div>

        {/* 説明文 */}
        <p className="mb-14 text-center text-sm font-light leading-[2.8] tracking-[0.08em] text-[#666666]">
          {rooms?.description ?? "全室、凛とした畳の和室。窓を開ければ、大川の渓谷が目の前に広がります。"}
        </p>

        {/* セクションメイン画像 */}
        <div className="relative mb-14 aspect-[16/9] overflow-hidden">
          <Image
            src={rooms?.image?.url ?? FALLBACK_IMAGE}
            alt="客室"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1024px"
          />
        </div>

        {/* 客室カードグリッド */}
        {roomList.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {roomList.map((room, i) => (
              <button
                key={i}
                onClick={() => setSelected(room)}
                className="group w-full overflow-hidden bg-[#faf8f5] text-left transition-shadow hover:shadow-md"
              >
                {room.image && (
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={room.image.url}
                      alt={room.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                )}
                <div className="p-7">
                  <h3 className="mb-2 text-sm font-light tracking-[0.3em] text-[#1a1a1a]">
                    {room.name}
                  </h3>
                  <p className="text-xs font-light leading-loose tracking-wide text-[#666666]">
                    {room.description}
                  </p>
                  <p className="mt-4 text-[10px] font-light tracking-[0.3em] text-[#8b6f47]">
                    詳細を見る →
                  </p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-center text-sm font-light tracking-wider text-[#999999]">
            準備中
          </p>
        )}
      </div>

      {/* モーダル */}
      {selected && <RoomModal room={selected} onClose={close} />}
    </section>
  );
}
