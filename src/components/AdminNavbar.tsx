import Image from "next/image";
import Link from "next/link";
import Logo from "public/logo.png";

export default function AdminNavbar() {
  return (
    <nav className="sticky top-0 flex items-center justify-between border-b p-2">
      <Link
        href="/dashboard"
        className="font-xl inline-flex font-semibold tracking-tight"
      >
        <Image
          src={Logo}
          alt="Youth Unlimited Logo"

          width={200}
        ></Image>
      </Link>
    </nav>
  );
}
