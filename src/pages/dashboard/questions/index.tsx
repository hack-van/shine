import AdminNavbar from "@/components/AdminNavbar";
import { buttonVariants } from "@/components/ui/button";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import Link from "next/link";

export default function Page() {
  return (
    <DashboardLayout>
      <main className="flex flex-col max-w-md mx-auto text-center justify-center gap-5">
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
