"use client";

import Link from "next/link";
import { useState } from "react";

import { MenuButton } from "@/components/buttons/MenuButton";

export default function Header() {
  const [isOpen, setOpen] = useState<boolean>(false);
 
  return (
  <header>
    <div className="z-50 absolute p-4 w-full flex items-center justify-between backdrop-blur shadow">
      <span className="text-lg">
        <Link href={"."}>あにまっぷ</Link>
      </span>
      <MenuButton isOpen={isOpen} setOpen={setOpen}  />
    </div>
    <nav className={`z-10 absolute w-full backdrop-blur-sm ${isOpen ? "scale-y-100 top-14" : "scale-y-0"}`}>
      <ul className="py-4 flex flex-col items-center justify-center space-y-4">
        <li>トップページ</li>
        <li>設定</li>
        <li>アカウント</li>
        <li>お問い合わせ</li>
        <li>web予約</li>
      </ul>
    </nav>
  </header>
  );
}
