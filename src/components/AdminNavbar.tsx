import { SparkleIcon } from "lucide-react";
import Link from "next/link";

export default function AdminNavbar() {
  return (
    <nav className="sticky top-0 flex items-center justify-between border-b p-2">
      <Link
        href="/dashboard"
        className="font-xl inline-flex font-semibold tracking-tight"
      >
        <SparkleIcon className="mr-2" />
        Shine
      </Link>
  
    </nav>
  );
}
