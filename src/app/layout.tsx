import "./globals.css";

import Header from "@/components/layouts/Header";

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
