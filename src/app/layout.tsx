import "./globals.css";

import Head from "next/head";

import Header from "@/components/layouts/Header";

export const metadata = {
  title: "あにまっぷ",
  description: "「あにまっぷ」は動物病院の位置を検索できるサービスです。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <Head>
        <link href="https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css" rel="stylesheet" />
      </Head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
