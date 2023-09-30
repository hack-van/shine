import { SparkleIcon } from "lucide-react";
import { buttonVariants } from "./ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 flex items-center justify-around border-b px-2 py-1">
      <Link
        href="/"
        className="font-xl inline-flex font-semibold tracking-tight"
      >
        <SparkleIcon className="mr-2" />
        Shine
      </Link>
      <Link
        href="/program"
        className={buttonVariants({
          variant: "outline",
        })}
      >
        Program
      </Link>
      <Link
        href="/survey"
        className={buttonVariants({
          variant: "outline",
        })}
      >
        Survey
      </Link>
      <Link
        href="/dashboard"
        className={buttonVariants({
          variant: "outline",
        })}
      >
        Dashboard
      </Link>
    </nav>
  );
}
