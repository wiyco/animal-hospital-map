import Link from "next/link";

export default function Header() {
  return (
    <header className="z-50 sticky top-0 p-4 w-full flex items-center justify-between shadow">
      <span className="text-lg">
        <Link href={"."}>あにまっぷ</Link>
      </span>
      <nav>
        <ul className="flex items-center space-x-3">
          <li>A</li>
          <li>B</li>
        </ul>
      </nav>
    </header>
  );
}
