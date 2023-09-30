import { SparkleIcon } from "lucide-react";
import { buttonVariants } from "./ui/button";
import Link from "next/link";

export default function AdminNavbar() {
  return (
    <nav className="sticky top-0 flex items-center justify-between border-b px-2 py-1">
      <Link
        href="/"
        className="font-xl inline-flex font-semibold tracking-tight"
      >
        <SparkleIcon className="mr-2" />
        Shine
      </Link>
      <div className="flex justify-between sm:gap-1 gap-3">
      <Link
        href="/dashboard/programs"
        className={buttonVariants({
          variant: "outline",
        })}
      >
        Programs
      </Link>
      <Link
        href="/dashboard/questions"
        className={buttonVariants({
          variant: "outline",
        })}
      >
        Questions
      </Link>
      <Link
        href="/dashboard/workers"
        className={buttonVariants({
          variant: "outline",
        })}
      >
        Workers
      </Link>
      </div>
    </nav>
  );
}
