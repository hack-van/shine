import AdminNavbar from "@/components/AdminNavbar";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <AdminNavbar />
      <main className="min-h-screen flex flex-col max-w-md mx-auto text-center justify-center gap-5">
        <h1>Dashboard - Questions</h1>
        <Link
          href="/dashboard/questions/add"
          className={buttonVariants({
            variant: "outline",
          })}
        >
          Add question
        </Link>
      </main>
    </>
  );
}
