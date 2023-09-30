import { buttonVariants } from "@/components/ui/button";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import Link from "next/link";

export default function Page() {
  return (
    <DashboardLayout>
      <main className="flex flex-col max-w-md mx-auto text-center justify-center gap-5">
        <Link
          href="users/add"
          className={buttonVariants({
            variant: "outline",
          })}
        >
          Add users
        </Link>
      </main>
    </DashboardLayout>
  );
}
