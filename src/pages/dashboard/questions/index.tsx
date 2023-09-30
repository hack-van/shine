import AdminNavbar from "@/components/AdminNavbar";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <AdminNavbar />
      <main>
        <h1>Dashboard - Questions</h1>
        <Link
          href="/dashboard/questions/add"
          className={buttonVariants({
            variant: "outline",
          })}
        >
          Add questions
        </Link>
      </main>
    </>
  );
}
