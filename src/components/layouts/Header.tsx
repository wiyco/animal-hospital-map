"use client";

import Link from "next/link";
import { useState } from "react";

import { MenuButton } from "@/components/buttons/MenuButton";

export default function Header() {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <header>
      <div className="p-3 w-full flex items-center justify-between backdrop-blur shadow">
        <span className="text-lg">
          <Link href={"/"}>あにまっぷ</Link>
        </span>
        <MenuButton isOpen={isOpen} setOpen={setOpen} />
      </div>
      <nav
        className={`min-w-[12rem] w-1/2 absolute top-[100%] right-0 backdrop-blur shadow ${
          isOpen ? "scale-y-100" : "scale-y-0"
        }`}
      >
        <ul className="my-8 flex flex-col items-center justify-center space-y-8">
          <li>
            <Link href={"/"}>Web予約</Link>
          </li>
          <li>
            <Link href={"/"}>お問い合わせ</Link>
          </li>
          <li>
            <Link href={"/"}>アカウント</Link>
          </li>
          <li>
            <Link href={"/"}>設定</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
