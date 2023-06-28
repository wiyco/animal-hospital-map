import Link from "next/link";

import { MenuButton } from "@/components//buttons/MenuButton";

export default function Header() {
  return (
    <header className="z-50 sticky top-0 p-4 w-full flex items-center justify-between shadow">
      <span className="text-lg">
        <Link href={"."}>あにまっぷ</Link>
      </span>
      <nav>
        <MenuButton />
      </nav>
    </header>
  );
}
