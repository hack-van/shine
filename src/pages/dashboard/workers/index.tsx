import AdminNavbar from "@/components/AdminNavbar";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <AdminNavbar />
      <main className="min-h-screen flex flex-col max-w-md mx-auto text-center justify-center gap-5">
        <h1>Dashboard - Workers</h1>
        <Link
          href="/dashboard/workers/add"
          className={buttonVariants({
            variant: "outline",
          })}
        >
          Add worker
        </Link>
      </main>
    </>
  );
}
