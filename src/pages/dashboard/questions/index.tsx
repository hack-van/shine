import AdminNavbar from "@/components/AdminNavbar";
import { buttonVariants } from "@/components/ui/button";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import Link from "next/link";

export default function Page() {
  return (
    <DashboardLayout>
      <main className="m-10 flex max-w-md flex-col items-start gap-5">
        <Link
          href="questions/add"
          className={buttonVariants({
            variant: "outline",
          })}
        >
          Add questions
        </Link>
      </main>
    </DashboardLayout>
  );
}
