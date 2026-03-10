import type { Metadata } from "next";
import { Noto_Serif_JP } from "next/font/google";
import "./globals.css";

const notoSerifJP = Noto_Serif_JP({
  weight: ["300", "400", "600"],
  subsets: ["latin"],
  variable: "--font-noto-serif-jp",
  display: "swap",
});

export const metadata: Metadata = {
  title: "会津芦ノ牧温泉 不動館 小谷の湯",
  description:
    "露天風呂からの眺望はまさに絶景。大川の渓谷美に癒されて。源泉掛け流し100%・全館和室・会津の隠れ宿。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSerifJP.variable} antialiased`}>{children}</body>
    </html>
  );
}
