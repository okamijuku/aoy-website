import Image from "next/image";

type BandImage = { url: string };

const FALLBACK_IMAGES: BandImage[] = [
  { url: "https://oyanoyu.com/img/1719374915159.webp" },
  { url: "https://oyanoyu.com/img/1719375178665.webp" },
  { url: "https://oyanoyu.com/img/1719375489979.webp" },
  { url: "https://oyanoyu.com/img/1719383236514.webp" },
  { url: "https://oyanoyu.com/img/1719383007505.webp" },
];

const ITEM_WIDTH = 640; // px

export function ImageScrollBand({ images }: { images?: BandImage[] }) {
  const imgs = images && images.length > 0 ? images : FALLBACK_IMAGES;
  // 画像を2倍に複製してシームレスなループを実現
  const doubled = [...imgs, ...imgs];
  const duration = imgs.length * 5; // 1枚あたり5秒

  return (
    <div style={{ height: "400px", overflow: "hidden" }}>
      <div
        style={{
          display: "flex",
          width: `${doubled.length * ITEM_WIDTH}px`,
          animation: `scrollBand ${duration}s linear infinite`,
        }}
      >
        {doubled.map((img, i) => (
          <div
            key={i}
            style={{
              width: `${ITEM_WIDTH}px`,
              height: "400px",
              flexShrink: 0,
              position: "relative",
            }}
          >
            <Image
              src={img.url}
              alt=""
              fill
              className="object-cover"
              sizes={`${ITEM_WIDTH}px`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
