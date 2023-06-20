import "./globals.css";

import xhr2 from "xhr2/lib/xhr2";

import Header from "@/components/layouts/Header";

/**
 * @summary
 * mapbox-gl-directions.js (6810:0)
 * var request = new XMLHttpRequest();
 * https://github.com/mapbox/mapbox-gl-directions/issues/289
 */
global.XMLHttpRequest = xhr2;

export const metadata = {
  title: "あにまっぷ",
  description: "「あにまっぷ」は動物病院の位置を検索できるサービスです。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
